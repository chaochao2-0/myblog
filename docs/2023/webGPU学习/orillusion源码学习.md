# orillusion源码
好了，刚去看完three.js中场景(scene)、相机(camera)、渲染器(WebGLRenderer)的相关源码。three.js渲染器中的源码根本看不懂，来看看orillusion的，看看会不会易懂一些。

### Engine3D
源码路径src\Engine3D.ts，先看第一步：
```ts
await Engine3D.init();
```
这里 Engine3D 类的init方法是个static修饰的方法，所以方法是用类直接调用，而不需要对 Engine3D 类进行实例化再进行方法调用。
init方法可以传递一些配置属性，然后我们来看init方法的实现：
```ts
// webGPUContext ：会根据init属性来进行canvas的一些公共样式配置、查看浏览器是否支持webgpu、请求webgpu适配器、获取webgpu设备对象、获取canvas中webgpu的上下文并进行了一些配置。 具体 webGPUContext 的源码路径： src\gfx\graphics\webGpu\Context3D.ts
await webGPUContext.init(descriptor.canvasConfig);

// 因为获取webgpu适配器和设备对象的操作是异步的，所以init方法用了async/await处理
```

接着往下看：
```ts
// 这里进行了各种顶点着色器、片元着色器的代码注册
ShaderLib.init();

// 注意看src\assets\shader\ShaderLib.ts的着色器注册(register)和获取(getShader)方法，熟悉的策略模式解决if else问题
public static register(keyName: string, code: string) {
    if (!ShaderLib[keyName.toLowerCase()]) {
        ShaderLib[keyName.toLowerCase()] = code;
    }
}

public static getShader(keyName: string): string {
    if (ShaderLib[keyName.toLowerCase()]) {
        return ShaderLib[keyName.toLowerCase()];
    }
    return ShaderLib[keyName.toLowerCase()];
}
```

接着往下看：
```ts
// 这个方法创建了group的uuid、初始化了一些矩阵、在gpu上创建了一个缓冲区；
// TODO:这里对webgpu还不是太熟悉，看不了太细，只知道初始化了矩阵和缓冲区，具体矩阵和缓冲区的作用看不清楚
GlobalBindGroup.init();

// 这里面很多的池数据解构都是用的Map解构，Map中再套Map，这里是不是可以像Vue那样使用WeakMap、Map、Set解构来优化？？？
```

继续：
```ts
// 这里为canvas注册和绑定各种交互事件
this.inputSystem = new InputSystem();
this.inputSystem.initCanvas(webGPUContext.canvas);
// 到这里 Engine3D 的init方法就看完了，总的来说init方法进行了各种各样的数据初始化和一些webgpu的使用准备工作，比如：判断是否支持webgpu、请求webgpu适配器、获取设备对象、创建gpu缓冲区等，但还没有设计到webgpu关键的渲染管线部分。
```

### Scene3D
源码路径：src\core\Scene3D.ts，刚看到源码就感觉到了熟悉的味道，没错 Scene3D 继承自 Object3D,有three.js的源码味道了。
哦不，我想简单了：three.js中的 Object3D 继承自 EventDispatcher ，这个类封装的是事件的监听处理，包含四个函数：addEventListener（添加事件监听）、hasEventListener（判断事件监听是否已经存在）、removeEventListener（移除事件监听）、dispatchEvent（事件监听调度）。
而 orillusion 中的 Object3D 继承自 Entity，而 Entity 继承自 CEventDispatcher,CEventDispatcher类封装的事件处理。
那我做个推断：orillusion在three的源码基础上做了更好的封装！毕竟three的源码一个文件动不动就上千行，太臃肿了。

在 Scene3D 的构造函数中，默认就添加了一个skyObject到场景中，这又是做什么的？跳过跳过！
```ts
// src\core\entities\Object3D.ts
this.skyObject = new Object3D();
this.addChild(this.skyObject);
```

### Camera3D
源码路径：src\core\Camera3D.ts，相机有什么好看的，各种矩阵初始化，跳过跳过！

### 渲染流程
```ts
// 直接看最后的渲染流程
Engine3D.startRenderView(view)

// startRenderViews方法中调用 resume 方法， resume 方法中调用 requestAnimationFrame 去执行 render 方法
// render方法执行 updateFrame 方法，这里就是整个渲染的核心，也就明白了为什么 orillusion 官网说自己是 ECS组件式系统
// 看下面的源码：
let command = webGPUContext.device.createCommandEncoder();
for (const iterator of ComponentCollect.componentsComputeList) {
    let k = iterator[0];
    let v = iterator[1];
    for (const iterator2 of v) {
        let f = iterator2[0];
        let c = iterator2[1];
        if (f.enable) {
            c(k, command);
        };
    }
}
webGPUContext.device.queue.submit([command.finish()]);

// 这里上一步还在创建命令编码器、中间做了些组件式操作以后，下一步就直接执行命令编码器的finish方法，推送gpu指令到设备对象的命令队列queue中去执行绘制
// TODO:中间创建创建渲染通道对象、创建渲染管线的逻辑被隐藏在组件式操作中，而我还不知道 ECS组件式系统 ，得抓紧去学了
// TODO:orillusion使用了codepen来做代码编辑，后续可以尝试在自己的博客里面引入codepen
```

### ECS
ECS相比于传统的面向对象的编程模式来说显然是有性能上的巨大优势。当然，ECS也存在一些弊端，例如没有面向对象的编程模式只管，不利于后期的修改和维护。因此通常是将ECS应用于一些性能敏感的子系统（例如物理模拟子系统），而非整个引擎。
https://zhuanlan.zhihu.com/p/618971664
https://juejin.cn/post/7174214038765699108?searchId=20230822133528FB96F3BE853E5D5DDCD1


### 一些思考
看别人的框架代码，发现他们在类的使用上更注重public、private、static等关键词来修饰属性和方法；更多的使用getter和setter来改变属性的读取和赋值行为。

使用static静态方法来辅助完成单例设计模式：
```ts
class Person {
  private static _instance: Person
  private constructor () {}
  public static getInstance () {
    if (!this._instance) {
      this._instance = new Person()
    }
  }
}
const person1 = Person.getInstance() // 通过类来调用，而不是通过类的实例调用
const person2 = Person.getInstance()
console.log(person1 === person2) // true
```


对属性更名后的处理：
```ts
get autoUpdate() { // @deprecated, r144
	console.warn( 'THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144.' )
	return this.matrixWorldAutoUpdate
}
set autoUpdate( value ) { // @deprecated, r144
	console.warn( 'THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144.' )
	this.matrixWorldAutoUpdate = value
}
```

private修饰的属性和方法只能够在类的内部直接进行访问，即使子类继承自父类，也访问不了父类的private属性和方法
protected修饰的属性和方法只能够在父类或者子类内部访问
static修饰的属性和方法也叫静态属性和静态方法，只能通过类来进行访问，不能通过类的实例来进行访问

那public static和private static这中共同修饰下的属性和方法，它的访问权限是怎样的？？？

public static修饰的属性和方法可以在类内部和类外部访问，但只能通过类来访问，不能通过类的实例来进行访问
```ts
class MyClass {
    className: string = '高二三班'
    public static myVariable: number = 10
    public static myMethod(): void {
      console.log('This is a public static method.', this.myVariable)
    }
}

console.log(MyClass.myVariable) // 输出: 10
MyClass.myMethod() // 输出: This is a public static method. 10

const aa = new MyClass()
console.log(aa) // MyClass { className: '高二三班' }
```

private static修饰的属性和方法只能在类的内部进行访问
```ts
class MyClass {
    private static myVariable: number = 10
    public static myMethod(): void {
        this.myVariable = 22
        console.log('This is a public static method.', this.myVariable)
    }
}

MyClass.myMethod() // 输出: This is a public static method. 22
```
类中的方法如果想要访问static属性，方法也要用static修饰

private static和private修饰的区别是什么？
调用区别，static修饰的变量和方法用类调用
```ts
class aa {
    static number: number = 10
    static wakk() {
        console.log('第5行被执行', this.number)
        this.number = 22
    }
}
class bb extends aa {
    static kk() {
        console.log(this.number)
    }
}

aa.wakk() // 第5行被执行 10
bb.kk() // 22
```

根据事件的优先级进行排序
```ts
// 根据事件的优先级进行排序
this.listeners[type].sort(function (listener1: CEventListener, listenerCEventListener) {
    return listener2.priority - listener1.priority;
});
```

Map数据的迭代方法
```ts
for (const iterator of ComponentCollect.componentsComputeList) {
    let k = iterator[0];
    let v = iterator[1];
    for (const iterator2 of v) {
        let f = iterator2[0];
        let c = iterator2[1];
        if (f.enable) {
            c(k, command);
        };
    }
}
```


```ts
// implements: ComponentBase类实现自IComponent接口，需要重写实现接口中的所有属性和方法
export class ComponentBase implements IComponent
```
