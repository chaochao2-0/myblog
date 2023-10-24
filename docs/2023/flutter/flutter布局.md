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

例如，和`Row`相比你可能更喜欢`ListTile`，这是一个易于使用的`widget`，有属性可以设置头尾图标，最多可以显示3行文本；
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

## 通用布局widgets
widget分为两类：`widgets库`中的标准widgets和`Material库`中的widgets。任何app都可以使用`widget库`，但是`Material库`中的组件只能在Material app中使用。

标准widgets：
- Container: 向widget增加padding、margins、borders、background color或者其他的装饰
- GridView: 将widget展示为一个可滚动的网格

- ListView: 将widget展示为一个可滚动的列表
- Stack: 将widget覆盖在另一个的上面

Material widgets:
- Card: 将相关信息整理到一个🈶圆角和阴影的盒子中
- ListTile: 将最多三行的文本、可选的导语以及后面的图标组织在一行中


## Stack
可以使用`Stack`在基础widget上排列widget，widget可以完全或者部分覆盖基础widget。

- 用于覆盖另一个widget
- 子列表中的第一个widget是基础widget；后面的子项覆盖在基础widget的顶部
- Stack的内容是无法滚动的
- 你可以剪切掉超出渲染框的子项

```dart
Widget _buildStack() {
    return Stack(
      alignment: const Alignment(0.6, 0.6),
      children: [
        const CircleAvatar(
          backgroundImage: AssetImage('assets/images/bg.png'),
          radius: 100,
        ),
        Container(
          decoration: const BoxDecoration(
            color: Colors.black45,
          ),
          child: const Text(
            'Mia B',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ],
    );
}
```





```dart
// 为什么有的widget是当做变量定义
final mainImage = Expanded(
    child: Image.asset(
        'assets/images/bg.png',
        fit: BoxFit.contain, // cover、contain、fill
    )
);

// 而有的widget确实当做函数实现？？？
Widget _buildGrid() => GridView.extent(
    maxCrossAxisExtent: 150,
    padding: const EdgeInsets.all(4),
    mainAxisSpacing: 4,
    crossAxisSpacing: 4,
    children: _buildGridTileList(30)
);
// 用函数这里可以传参
List<Container> _buildGridTileList() => List.generate(
      count, (i) => Container(child: Image.asset('assets/images/bg.png')));
```




## StatelessWidget和StatefulWidget的区别
简单理解：
- 如果我们的`Widget`是`StatelessWidget`,那么当他的内容被创建出来之后，就不能再改变了。相反，`StatefulWidget`就可以。
- 无状态`Widget`，就是说一旦这个`Widget`创建完成，状态就不允许再变动。有状态`Widget`，就是说当前`Widget`创建完成之后，还可以对当前`Widget`做更改，可以通过`setState`函数来刷新当前`Widget`来达到有状态。
- `StatelessWidget`是一个不需要状态更改的`Widget`，它没有要管理的内部状态。`StatefulWidget`是可变状态的`Widget`。


声明周期理解：
在Flutter中，`StatelessWidget`是一种表示不可变部件的基类，它的状态在创建后不能改变，除非由父部件重新创建。因此，它没有像`StatefulWidget`那样的生命周期方法。`StatelessWidget`的构建是纯粹的，它接受一组参数并返回一个在给定参数下可视化的部件。

`StatelessWidget`的生命周期：
- `构建(Build)`：这是`StatelessWidget`的主要生命周期。每当需要重新构建部件时(通常是因为父部件的状态变化)，Flutter会调用`build`方法来生成新的部件树。

在Flutter中，`StatefulWidget`是一种可变的部件，它有一些特定的生命周期方法，用于管理部件的状态和响应不同阶段的变化。
`StatefulWidget`的生命周期：
- `createState`: 这是`StatefulWidget`的构造方法，它会创建一个与部件关联的`State`对象。此方法只会调用一次。
- `initState`: 在`State`对象被创建后，会立即调用`initState`方法。这是进行一次性初始化操作的好地方，比如订阅事件、初始化变量等。
- `build`: 这是必须实现的方法，用于构建部件的UI。在部件第一次创建、需要重建或者父部件更新时都会调用这个方法。
- `didChangeDependencies`: 在`build`方法之后立即调用。用于处理依赖关系的变化，比如获取来自`InheritedWidget`的数据，并进行相应的操作。
- `didUpdateWidget`: 当父部件重建时，会调用`didUpdateWidget`方法。在这里可以比较新旧部件的属性，执行一些相应的操作。
- `dispose`: 在`State`对象即将被销毁时调用。用于释放资源、取消订阅等清理操作。





unity3d对cloudXR的支持度更好

ARKit插件：  https://pub.dev/packages/arkit_plugin/versions
ARCore插件： https://pub.dev/packages/arcore_flutter_plugin/versions

## GetX
`GetX`是第三方的状态管理插件，不仅具有状态管理的功能，还具有路由管理、主题管理、国际化多语言管理、Obx局部更新、网络请求、数据验证等功能，相比其他状态管理插件`GetX`简单、功能强大并且高性能。
模块化机制，只会打包正在使用的相关功能