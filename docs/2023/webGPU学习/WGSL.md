# 着色器语言WGSL
WGSL是在gpu上执行

 - 函数
```ts
// wgsl中的函数写法， ->后面是函数返回值类型
fn add(x: f32, y:f32) -> f32 {
    return x + y;
}
```
 - 向量
```ts
// 声明一个四维向量并赋值
var color:vec4<f32>;
// 这里用思维向量来表示颜色
color = vec4<f32>(1.0, 0.0, 0.0, 1.0);
```

```ts
// 三维向量
var position:vec3<f32>;
position = vec3<f32>(1.0, 2.0, 3.0);

// 四维向量表示齐次坐标
var position:vec4<f32>;
position = vec4<f32>(1.0, 2.0, 3.0, 1.0);

// 一个三维向量转化为四维向量
var position:vec3<f32>;
position = vec3<f32>(1.0, 2.0, 3.0);

var position2 = vec4<f32>(position, 1.0);
```

 - 矩阵
 ```ts
 // 2x2矩阵: mat2x2<f32>
 // 3x3矩阵: mat3x3<f32>
 // 4x4矩阵: mat4x4<f32>
 @vertex
 fn main(@location(0) pos:vec3<f32>) -> @builtin(position) vec4<f32> {
     var T1 = mat4x4<f32>(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.2, 0.1, 0.0, 1.0);
     var pos2 = vec4<f32>(pos, 1.0); // pos转齐次坐标
     return T1 * pos2;
 }
 ```

 - 结构体
WGSL结构体有点类似JavaScript中的类
```ts
struct pointLight {
    color: vec3<f32>, // 光源颜色
    intensity: f32 // 光源强度
};

var light1:pointLight;
light1.color = vec3<f32>(1.0, 0.0, 0.0);
light1.intensity = 0.6;
```

 - 注释
 // 单行注释
 /* */ 块级注释

 - WGSL语句结尾分号不能省略

