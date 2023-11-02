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