# flutter项目学习

## 
7个Flutter开源项目让你成为更好的Flutter开发者
https://juejin.cn/post/7219234932735934524

## 键盘弹起页面布局上移问题
在`Scaffold`中加上`resizeToAvoidBottomInset: false`
```dart
Scaffold(
    resizeToAvoidBottomInset: false, // 禁止布局随着键盘上移动
    body: 
```

## Flutter打包问题
- 在`Android Studio`中用`Flutter build ios`打包，打包后会生成`build`文件夹
- 打开`Xcode`，选择`Window -> Devices and Simulators`打开设备管理器
- 在设备管理器选择设备，然后点击右侧的`+`按钮
- 在弹出的窗口中选择刚才打包生成的`build`文件夹下的`ios -> iphoneos -> Runner.app`即可安装到设备上