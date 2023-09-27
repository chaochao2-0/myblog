# UIKit开发

## 创建项目
 - 使用`Xcode`创建项目，选择`ios`和`app`开发
 - `Interface`选择`Storyboard`即`UIKit`
 - 然后项目就创建成功了
 - 打开`ViewController`编辑`viewDidLoad`函数，新增如下代码：
 ```swift
 // 修改打开的第一个页面的颜色
 view.backgroundColor = .systemRed
 ```
 这样，`app`首次打开的`ViewController`页面的背景颜色就被修改成了红色

## 项目结构
 —— test-demo
    —— AppDelegate
    —— SceneDelegate
    —— ViewController: 
    —— Main
    —— Assets
    —— LaunchScreen
    —— test_demo
    —— Info
    —— test_demo

## 基础组件的使用
`UILabel`组件的使用：
```swift
import UIKit

class ViewController: UIViewController {
    
    var myLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        // 修改打开的第一个页面的颜色
        view.backgroundColor = .systemRed
        
        // 创建实例
        myLabel = UILabel()
        myLabel.translatesAutoresizingMaskIntoConstraints = false
        myLabel.font = UIFont.systemFont(ofSize: 24) // 字号
        myLabel.text = "Hello World"
        myLabel.numberOfLines = 0
        myLabel.textAlignment = .left
        
        // 给UILabel设置点击事件
        myLabel.isUserInteractionEnabled = true
        // 这里有#selector，对应的userDidTapLabel方法要加上@objc，便于OC的代码调用能找到swift的方法
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(userDidTapLabel(tapGestureRecognizer:)))
        myLabel.addGestureRecognizer(tapGesture)
        
        // 添加到view中
        view.addSubview(myLabel)
        
        // 设置约束
        NSLayoutConstraint.activate([
            myLabel.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor),
            myLabel.trailingAnchor.constraint(equalTo: view.layoutMarginsGuide.trailingAnchor),
        ])
    }
    
    @objc func userDidTapLabel(tapGestureRecognizer _: UITapGestureRecognizer) {
        print("label clicked!")
    }
}
```


## 页面的布局
`view.layoutMarginsGuide`是在`ios`中用于指代视图的内边距区域的一个特殊属性。内边距区域是视图内容与视图边缘之间的空白区域。


```swift
/**
    `view.layoutMarginsGuide`包括以下四个属性：

    view.layoutMarginsGuide.leadingAnchor: 内边距区域的左侧边缘
    view.layoutMarginsGuide.trailingAnchor: 内边距区域的右侧边缘
    view.layoutMarginsGuide.topAnchor: 内边距区域的顶部边缘
    view.layoutMarginsGuide.bottomAnchor: 内边距区域的底部边缘

    这些属性可以用来创建约束，以确保视图的子视图与内边距之间保持一定的间距，从而避免内容紧贴到视图的边缘。
    通常情况下，内边距区域的大小可以通过视图的 layoutMargins 属性来设置，或者在 Interface Builder 中进行配置。开发者可以自定义这些内边距，以满足特定的界面设计需求。

    总之，view.layoutMarginsGuide是一个有助于创建视图布局约束并考虑内边距的便捷工具，以确保用户界面在不同设备和屏幕尺寸下都能正确呈现。
 */

// 设置约束
NSLayoutConstraint.activate([
    // myLabel的顶部和view.layoutMarginsGuide的顶部对齐
    myLabel.topAnchor.constraint(equalTo: view.layoutMarginsGuide.topAnchor),
    // myLabel的左侧和view.layoutMarginsGuide的左侧对齐
    myLabel.leadingAnchor.constraint(equalTo: view.layoutMarginsGuide.leadingAnchor),
    
    // 上下左右居中
    // submitButton的y轴中心和view.layoutMarginsGuide的y轴中心对齐
    submitButton.centerYAnchor.constraint(equalTo: view.layoutMarginsGuide.centerYAnchor),
    submitButton.centerXAnchor.constraint(equalTo: view.layoutMarginsGuide.centerXAnchor),
])
```
 
## 多个页面之间的跳转
```swift
// 跳转项目列表
let controller = ProjectController()
controller.modalPresentationStyle = .fullScreen
self.present(controller,animated: true)
```

## View Controller
`ios`中的`View Controller`，它负责用户界面的展示，有一些生命周期的回调函数，还和界面切换相关，一个`app`中可以有一个或多个`ViewController`。

每一个`ViewController`都有一个`single root view`，包含此`ViewController`的所有内容，在页面上的所有`View`都会被加入到以这个`root view`为根的树形结构中去。

`ViewController`有一个`view`属性，代表最后返回的页面
`ViewController`拥有所有的`View`，管理和这些`View`相关的交互，是离用户最近的第一层代码。


## 动态库和静态库
对于静态库而言，在编译链接的时候，会将静态库的所有文件都添加到目标app可执行文件中，并在程序运行之后，静态库与app可执行文件一起被加载到同一块代码区中。
对于动态库而言，在编译链接的时候，只会将动态库被引用的头文件添加到目标app可执行文件，区别于静态库，动态库是在程序运行的时候被添加另外一块内存区域。

相比于动态库的方案，使用静态库将花费更多的启动时间和内存消耗。还会增加可执行文件的大小。

- 对于静态库的后缀名是`.a`，从`libsqlite3.dylib`这里我们可以知道`.dylib`就是动态库的文件的后缀名。细心的朋友发现了，从`Xcode7`我们再导入系统提供的动态库的时候，不再有`.dylib`，取而代之的是`.tbd`。而`.tbd`其实是一个`YAML`文本文件，描述了需要链接的动态库的信息。主要目的是为了减少`app`的下载大小
- `a`是一个纯二进制文件，不能直接拿来使用，需要配合头文件、资源文件一起使用。在`ios`中是作为静态库的文件名后缀。
- 相比较与静态库和动态库，动态库在包体积、启动时间还有内存占比上都是很有优势的。
- 为了解决`.a`的文件不能直接用，还要配备`.h`和资源文件，苹果推出了一个叫做`.framework`的东西，而且还支持动态库。



服务端会用秋全的app.js判断视频流的请求对象是移动端、PC, 然后ue用来区分显示摇杆
app.js是否是根据设备UA来进行判断？AR的webView打开视频流是否改变了ipad的UA信息？