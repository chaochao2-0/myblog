# cad优化

- dxf-parse: 从def数据中解析最原始的数据出来，然后交给shape-parse层
- shape-parse层拿到原始数据后，将数据区分为: models(普通数据)、insert(insrt、dimension数据) ，同时会将所有的线性类型数据全部转为线段数据，它是一个中间层数据处理
- draw-three 中会先对所有的普通数据合模，然后将insert中的数据进行合模绘制。在具体的合模中还需要根据layer来划分数据合模

```ts
// 在合模的方法中，进行绘制前，先使用 three 的 BufferGeometry先进行insert数据的旋转、缩放等处理，处理成positions后，再统一合模
let mergeGeometry = new THREE.BufferGeometry()

if (index === 8) {
    mergeGeometry.scale(800, 800, 0)
    mergeGeometry.translate(1109201.66822111, -336678.1819667714, 0)
    console.log('第283行被执行', mergeGeometry)
    console.log('第283行被执行', mergeGeometry.attributes.position)
}

// 因为要全图纸统一进行绘制，精度只能全图纸统一进行处理了
```


```ts
const { scale, rotation, position } = groupData
if (scale) {
    let scaleX, scaleY
    if (scale.x) scaleX = scale.x
    if (scale.y) scaleY = scale.y
    if (scale.z && scale.z === -1) scaleX = -scaleX
    geometry.scale(scaleX, scaleY, 0)
}
if (rotation) {
    if (scale.z && scale.z === -1) {
        geometry.rotateZ(-(rotation * Math.PI) / 180)
    } else {
        geometry.rotateZ((rotation * Math.PI) / 180)
    }
}
if (position) {
    geometry.translate(position.x, position.y, 0)
}
```
计算边界的逻辑也可以放到 draw-three 中进行绘制

包围盒自己实现不了，我无法得到线段什么时候需要闭合，什么时候转弯的时候内圈的线段要比外圈要小
换一种思路：用粗线的线宽来实现这种包围盒效果

### 文字优化
为了让文字可以很好的进行各种旋转，一直在用 troika-three-text 在处理Mtext类型的数据，然后这个库绘制文字使用的是纹理绘制，会有很大的性能开销。而three.js官方使用的 FontLoader 加载json字体文件则使用的是文字数据生成geometry来进行绘制。理论上，我们可以制作自己的font字体文件，来满足cad的各种文字需求，并可以通过 geometry 通过合模操作来进行性能优化

？？？突然发现字体转为json的facetype.js竟然是一个开源的js库，那岂不是还可以更进一步，能根据用户图片中的具体文字内容来生成最简洁的font字体文件
不可行，字体文件必须引入所有文字，因为批注功能需要输入，这就必须有所有文字可供批注添加

### 后面的优化方向
- 使用webworker开多线程进行数据处理的优化、还可以使用wasm方案
- 对图纸进行分层加载，避免大图纸加载时间过长
- 手绘线的平滑优化，关于批注的移动可以参考three中的 webgl_geometry_spline_editor 案例
- 碰撞案例：webgl_mirror
- 文字破碎的案例：webgl_modifier_tessellation
- 一个页面中渲染多个three内容： webgl_multiple_elements
- 多视角渲染的案例：webgl_multiple_views
- 飞鸟案例：鸟会根据鼠标位置进行驱散： webgl_gpgpu_birds

### svg的提取尝试
如果可以将正常图片转化为svg格式图片，然后将svg用three.js中的svgloader来加载出来并进行一些数据优化处理，这样就可以通过图片来实现一些thre场景中的数据加载，比如我想在three中绘制一个雾山五行的角色，那我只需要一张图片，然后转为svg，再进行一些处理就可以实现吗？
https://convertio.co/zh/ 这个网站可以将图片转为svg，但是颜色等信息会丢失
有没有一些很好的方法能够将普通图片转化为svg，并且还能保证图片不失真？
html2canvas支持将页面保存为svg图片？

目前使用文心一言和通义千问都无法直接生成svg格式的图片，先实现通过svg来提取图片中的内容

### cad的内存泄漏问题
因为文字使用了线条来绘制，这样就造成了大量的线条数据，一张文字比较多的图纸，解析下来的数据量有1-2G，这是一个很恐怖的内容问题，导致图纸根据渲染不出来，直接报错：Uncaught (in promise) RangeError: Maximum call stack size exceeded。调用栈溢出，这样就必须要进行内存上的一个优化处理了。

堆栈溢出：在计算机科学中是指使用过多的存储器时导致调用堆栈产生的溢出。堆栈溢出的产生是由于过多的函数调用，导致使用的调用堆栈大小超过事先规划的大小，覆盖其他存储器内的资料，一般在递归中产生。堆栈溢出很可能由无限递归产生，但也可能仅仅是过多的堆栈层级。

由于文字转线条绘制的数据量比较大，大概一个数组的长度如果超过4千万，浏览器就会报错。

这次堆栈溢出的原因是：我用了多次数组结构出现了堆栈溢出，实际场景的代码比较复杂，后续尝试简单复现却并没有将问题复现出来。尝试复现的代码如下：
```ts
let position = []
for (let i = 0; i < 10000; i++) {
    let arr = [
        {
            index: 1,
            name: '123123'
        },
        {
            index: 2,
            name: 'adfsasf'
        }
    ]
    let aa = [...arr]
    let bb = [...aa]
    position.push(...bb)
}
console.log(position)
```


### 事件执行顺序优化
pointermove 事件会比 mousemove 事件先执行
首先，事件是可以注册多个的，你在这个地方注册一个 mousedown ，另一个地方再注册一个 mousedown 事件，两个事件的函数都会执行
```ts
// TODO:如果一个项目中同时存在各种事件同时需要触发执行，有有没有一个事件处理机制来统一规范的对触发事件进行控制？这个后续需要进一步学习
```



bimface的cad图纸加载图纸消耗的内存很少，但是却能够实现很多文字的拾取效果，这些应该是需要结合着色器的语法才能实现
必须要自己写着色器来进行代码优化，不然内存消耗太大会导致很多问题

### three中是如何绘制出line2的，它的底层原理是什么
在webgl中，绘制线条时，默认情况下线条宽度是1个像素，它的宽度是固定的。然而，Line2通过使用自定义着色器(shader)以及额外的技术，使得线条宽度可以在像素级别进行调整。
Line2的底层原理包括以下重要步骤：
1，自定义着色器： Line2使用自定义的着色器程序来渲染线条。着色器是一种运行在GPU上的小型程序，通过对顶点和片元进行操作来定义对象的外观。
2，顶点扩展： 线条的原始定义可能只包含线条的起点和终点，而宽线需要顶点的多个副本以形成线条的宽度。使用顶点扩展技术，线条的起点和终点会在GPU上复制多次，并附加一些额外的属性。
3，定点属性计算：在顶点扩展的基础上，每个顶点需要计算一些属性，例如顶点的位置、法线、纹理坐标等。这些属性将用于之后的绘制和着色过程。
4，连接线段：通过使用额外的定点属性，将相邻的定点连接起来形成线段。同时，根据线条宽度，调整定点位置以形成宽线的外观。
5，着色和渲染：基于给定的材质和光照模型，使用自定义着色器对线条进行着色，并最终将结果渲染到屏幕上。

总的来说，Line2通过使用顶点扩展、顶点属性计算、连接线段以及自定义着色器等技术，实现了绘制出宽线的功能。

### 图层数据收集过程中的数据数据污染问题
```ts
collectPositionBylayer[item.layer] = {
    positions: offsetPositionData,
    colors: ItemColors,
    pickColors: ItemPickColors
}
```
一开始我的图层position数据收集是这样写的，因为这里是直接将`offsetPositionData`赋值给`collectPositionBylayer[item.layer].positions`。导致本次循环的`offsetPositionData`临时变量不会被释放，这样后续相同图层的数据会push到`collectPositionBylayer[item.layer].positions`中，也就相当于修改了未释放的`offsetPositionData`的值，这样就影响到了其他收集到`offsetPositionData`变量的数据，造成了数据污染。

调整为如下收集即可解决：
```ts
collectPositionBylayer[item.layer] = {
    positions: [...offsetPositionData],
    colors: [...ItemColors],
    pickColors: [...ItemPickColors]
}
```

### 用贝塞尔曲线来优化cad的手绘线批注
贝塞尔曲线根据控制点的数量分为：
- 一阶贝塞尔曲线（2个控制点）
- 二阶贝塞尔曲线（3个控制点）
- 三阶贝塞尔曲线（4个控制点）
- n阶贝塞尔曲线（n+1个控制点）

通过控制点是怎么绘制出贝塞尔曲线的呢？
这里以三阶贝塞尔曲线为例：四个控制点通过先后顺序进行连接，形成三条线段，通过一个参数t，其中 t ∈ [0, 1]，该参数的值等于线段上某一个点距离起点的长度除以线段长度。
接下来对每一条线段做同样的操作，得到三个控制点；
然后对三个控制点重复操作，得到两个控制点；
最后再用同样的方法可以得到最终的一个点，这个点就是贝塞尔曲线上的一个点。
通过控制t的值，由0增加至1，就绘制出了一条由起点至终点的贝塞尔曲线。

css动画中使用的贝塞尔曲线其实是三次贝塞尔曲线

three中有现成的贝塞尔曲线的方法封装: CubicBezierCurve3，除了贝塞尔曲线，three中还有 CatmullRomCurve3 可以用来绘制平滑曲线，它的实现原理是：Catmull-Rom算法

`cubic-bezier()`函数定义了一个三次贝塞尔曲线。三次贝塞尔曲线通过四个点：P0、P1、P2、P3来定义。P0和P3是曲线的起点和终点，在css中起点和终点都是固定的，P0是(0, 0)，表示起始时间或位置以及初始状态，P3是(1, 1)表示最终时间或位置以及最终状态。
```ts
// x1和y1定义了P1点的横纵坐标，x2和y2定义了P2点的横纵坐标。其中x1和x2的范围必须在[0, 1]区间内，否则这个曲线就是无效的
// css中如果声明了无效的三次贝塞尔曲线，那么整个属性的声明都会被无视
cubic-bezier(x1, y1, x2, y2)
```

使用three中的`CubicBezierCurve3`实现css中的动画效果的贝塞尔曲线绘制：
```ts
// const curve = new THREE.CubicBezierCurve3(
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(7.5, 75, 0),
//     new THREE.Vector3(87.5, 36, 0),
//     new THREE.Vector3(100, 100, 0)
// )

// css中的ease的贝塞尔曲线：cubic-bezier(0.25, 0.1, 0.25, 1.0)
// const curve = new THREE.CubicBezierCurve3(
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(25, 10, 0),
//     new THREE.Vector3(25, 100, 0),
//     new THREE.Vector3(100, 100, 0)
// )

// css中的ease-in的贝塞尔曲线：cubic-bezier(0.42, 0.0, 1.0, 1.0)
// const curve = new THREE.CubicBezierCurve3(
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(42, 0, 0),
//     new THREE.Vector3(100, 100, 0),
//     new THREE.Vector3(100, 100, 0)
// )

// css中的ease-out的贝塞尔曲线：cubic-bezier(0.0, 0.0, 0.58, 1.0)
// const curve = new THREE.CubicBezierCurve3(
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(58, 100, 0),
//     new THREE.Vector3(100, 100, 0)
// )

// css中的ease-in-out的贝塞尔曲线：cubic-bezier(0.42, 0.0, 0.58, 1.0)
const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(42, 0, 0),
    new THREE.Vector3(58, 100, 0),
    new THREE.Vector3(100, 100, 0)
)

const points = curve.getPoints(50)
const geometry = new THREE.BufferGeometry().setFromPoints(points)
const material = new THREE.LineBasicMaterial({ color: 0xff0000 })
const curveObject = new THREE.Line(geometry, material)
scene.add(curveObject)
```

在两点之间找两个控制点，用贝塞尔曲线再次将随机点连起来，这样就能得到一条平滑的曲线。比如P0和P3的需要连接的起始点和终点，P1和P2是需要添加的控制点。那么P1需要添加在P0右侧，并且与P0的y相同；P2需要添加在P3左侧，与P3的y相同。这样就能在P0和P3之间得到一条平滑的曲线