
在一个最简单的three.js案例中，我们需要有场景(scene)、相机(camera)、渲染器(WebGLRenderer)。

### scene：
源码路径：src\scenes\Scene.js
发现scene类其实比较简单，它继承自Object3D类，接下来继续去看看Object3D，源码路径：src\core\Object3D.js；发现 Object3D 又继承自 EventDispatcher ，接着看：src\core\EventDispatcher.js。

EventDispatcher类封装了事件的监听处理，包含四个函数：addEventListener（添加事件监听）、hasEventListener（判断事件监听是否已经存在）、removeEventListener（移除事件监听）、dispatchEvent（事件监听调度）

在scene的add方法中，设置了scene的children和添加的Object3D的parent属性。

### camera
这里看的是透视相机 PerspectiveCamera ，源码路径：src\cameras\PerspectiveCamera.js，PerspectiveCamera 继承自 Camera ，src\cameras\Camera.js，发现Camera类也是继承自Object3D。在Camera的构造函数中，对各种矩阵进行了初始化操作，在 PerspectiveCamera 的构造函数中，调用了 updateProjectionMatrix方法，这个方法会根据透视相机构造参数进行矩阵更新。

### WebGLRenderer
源码路径：src\renderers\WebGLRenderer.js，妈的，一个构造函数两千多行，不想看了。在webGLRenderer的源码中看到了这一行，所以用three.js构建的canvas上，会有data-engine属性。
```js
if ( 'setAttribute' in canvas ) canvas.setAttribute( 'data-engine', `three.js r${REVISION}` )
```

在webGLRenderer的源码中还会做XR的相关处理，而 WebXRManager 这个类的构造函数又是八百多行，是一个比较复杂的类，这些逻辑对于cad来说其实是完全多余的。
```js
const xr = new WebXRManager( _this, _gl )
this.xr = xr
```

在webGLRenderer的源码中很多方法都是直接挂载到this上面，这就导致了很多方法根据不会被使用，却需要花费内存来创建。更好的方式可能是实现按需导入，这样打包的时候会就可以Tree-Shaking掉那些并没有用到的方法。

### WebGLRenderer的render方法
影响图纸加载卡顿的关系就是render方法的执行时间，在WebGLRenderer的源码src\renderers\WebGLRenderer.js中，render方法的代码并不算很多，只有一百多行。根本看不懂！
在src\renderers\WebGLRenderer.js的 WebGLRenderer 构造函数中调用了 initGLContext 方法，该方法中会 实例化  WebGLBufferRenderer和WebGLIndexedBufferRenderer，在这两个类中分别封装了gl.drawArrays和gl.drawElements这两个绘制方法！

我问chatgpt，它说：
render方法的目标是在WebGL上下文中呈现场景和相机，将3D对象渲染到屏幕上。该方法通常包含以下步骤：
 - 检查渲染器的参数、状态和场景数据的完整性以及各个变量的有效性。
 - 准备渲染前的工作，如清除缓冲区、设置渲染目标（如屏幕或纹理）、设置视口、设置渲染器的渲染状态等。
 - 更新相机的投影矩阵和视图矩阵，以便将场景中的对象正确地显示在相机的视野中。
 - 对场景中的每个可见对象进行循环迭代，并针对每个对象进行必要的计算和渲染操作。
 - 根据对象的材质、纹理、光照、阴影等属性，设置相应的WebGL着色器程序以实现物体的渲染。
 - 将物体的几何数据（顶点位置、法线、纹理坐标等）传递给绑定的着色器程序。
 - 执行WebGL绘制调用，将几何数据发送到GPU进行渲染。
 - 根据需要，执行后期处理操作，如应用后期特效、渲染到纹理等。
 - 恢复渲染状态和缓冲区，以备下一帧绘制。

cad中没有光照，也没有纹理、阴影、后期特效这些，甚至连旋转矩阵都用不上，cad只需要最基础的平移和缩放操作即可。

### Raycaster
来看一看three中的鼠标拾取

图形学中关于鼠标拾取有两种常见方案：
 - 射线法拾取
 - gpu拾取，gpu拾取是否就是缓冲区拾取，three中案例：webgl_interactive_cubes_gpu

 缓冲区拾取：https://juejin.cn/post/6988013072686252046?searchId=20230828182808DC2E896F0BF7B80CC6AE#heading-3
 three中使用的是射线法拾取：https://juejin.cn/post/7205025712170942525?searchId=2023082817240424C3C2D3FF19B302C296#comment