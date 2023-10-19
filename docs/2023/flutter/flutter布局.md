# flutter学习

## 布局
- `Widgets`是用于构建UI的类
- `Widgets`可以用于布局和展示UI元素
- 通过组合简单的`Widgets`来构建复杂的`widgets`

`Container`是一个widget，允许你自定义其子widget。如果要添加padding、margin、边框或背景颜色，你就可以用上Container了。

所有布局widgets都具有以下任一项：
- 一个child属性，如果它们只包含一个子项：例如Center和Container
- 一个children属性，如果它们包含多个子项：例如Row、Column、ListView和Stack

一个`Flutter app`本身就是一个`widget`，大多数`widgets`都有一个`build`方法，在`app`的`build`方法中实例化和返回一个`widget`会让它显示出来。


## 基于Material的应用
对于`Material app`，你可以使用`Scaffold widget`，它提供默认的`banner`背景颜色，还有用于添加抽屉、提示条和底部列表弹窗的`API`。你可以将`Center widget`直接添加到主页`body`的属性中。

```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Layout demo',
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Flutter layout demo'),
        ),
        body: const Center(
          child: Text('Hello World'),
        )
      )
    );
  }
}
```

## 非Material apps
对于非`Material app`，你可以将`Center widget`添加到`app`的`build`方法里：
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(color: Colors.purple),
      child: const Center(
        child: Text(
            'Hello World',
          textDirection: TextDirection.ltr,
          style: TextStyle(
            fontSize: 32,
            color: Colors.black87,
          )
        )
      )
    );
  }
}
```
默认情况下，非`Material app`不包含`AppBar`、标题和背景颜色。如果你希望在非`Material app`中使用这些功能，则必须自己构建它们。以上`app`将背景颜色更改为白色，将文本更改为深灰色来模拟一个`Material app`。

## 横向或纵向布局多个widgets
最常见的布局模式之一是垂直或水平`widgets`。你可以使用`Row widget`水平排列`widgets`，使用`Column widget`垂直排列`widgets`。

- `Row`和`Column`是两种最常用的布局模式
- `Row`和`Column`每个都有一个子`widgets`列表
- 一个子`widget`本身可以是`Row`、`Column`或其他复杂`widget`
- 可以指定`Row`或`Column`如何垂直和水平方向上对齐其子项
- 可以拉伸或限制特定的子`widgets`
- 可以指定子`widgets`如何占用`Row`或`Column`的可用空间

`Row`和`Column`是水平和垂直布局的基本原始`widgets`。这些基础`widgets`允许最大程度的自定义。`Flutter`还提供专门的、更高级别的`widgets`，可能可以直接满足需求。

例如，和`Row`相比你可能更喜欢`ListTitle`，这是一个易于使用的`widget`，有属性可以设置头尾图标，最多可以显示3行文本；
```dart
ListTile(title: Text('用户反馈'), trailing: Icon(Icons.feedback))
```
和Column相比你也可能更喜欢`ListView`，这是一种类似于列的布局，但如果内容太长导致可用空间不够容纳时会自动滚动。

## 对齐widgets
可以使用`mainAxisAlignment`和`crossAxisAlignment`属性控制行或列如何对齐其子项。
```dart
// 设置主轴对齐方式为: spaceEvenly 会将空余空间在每个图像之间、之前和之后均匀地划分
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Image.asset('images/pic1.jpg'),
    Image.asset('images/pic2.jpg'),
    Image.asset('images/pic3.jpg'),
  ],
);
```

## 调整widgets大小
当某个布局太大而超出屏幕时，受影响的边缘会出现黄色和黑色条纹图案。
可以使用`Expanded widget`调整widgets的大小以适合行或列。
```dart
Expanded(
    child: Image.asset('assets/images/bg.png')
)
```
如果你想要一个widget占用的空间是兄弟项的两倍。为了达到这个效果，可以使用`Expanded widget`的`flex`属性，这是一个用来确定widget的弹性系数的整数。默认的弹性系数为1。
```dart
Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Expanded(
        child: Image.asset('assets/images/bg.png'),
      ),
      Expanded(
        flex: 2,
        child: Image.asset('assets/images/bg.png'),
      ),
      Expanded(
        child: Image.asset('assets/images/bg.png'),
      ),
    ],
);
```

## 组合widgets
默认情况下，行或列沿其主轴会占用尽可能多的空间，但如果要将子项紧密结合在一起，请将其`mainAxisSize`设置为`MainAxisSize.min`。
```dart
Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      Icon(Icons.star, color: Colors.green[500]),
      const Icon(Icons.star, color: Colors.black),
      const Icon(Icons.star, color: Colors.black),
    ],
);
```

## 嵌套行和列
布局框架允许你根据需要在行和列内嵌套行和列。
















unity3d对cloudXR的支持度更好

ARKit插件：  https://pub.dev/packages/arkit_plugin/versions
ARCore插件： https://pub.dev/packages/arcore_flutter_plugin/versions

## GetX
`GetX`是第三方的状态管理插件，不仅具有状态管理的功能，还具有路由管理、主题管理、国际化多语言管理、Obx局部更新、网络请求、数据验证等功能，相比其他状态管理插件`GetX`简单、功能强大并且高性能。
模块化机制，只会打包正在使用的相关功能