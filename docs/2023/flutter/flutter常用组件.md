# flutter常用组件

## Container
```dart
Container(
  decoration: const BoxDecoration(color: Colors.purple), // 设置背景颜色
  padding: const EdgeInsets.all(20),
  margin: const EdgeInsets.fromLTRB(10, 0, 10, 0),
  height: 600,
  child: // 子widget
)
// decoration中还可以设置border和borderRadius
decoration: BoxDecoration(
  border: Border.all(width: 10, color: Colors.black38),
  borderRadius: const BorderRadius.all(Radius.circular(8)),
),
// 设置背景图片
decoration: BoxDecoration(
    image: DecorationImage(image: AssetIm('assets/images/bg.png'))
)
```

## Scaffold
```dart
Scaffold(
    appBar: AppBar(
      title: Text(title),
    ),
    body: // 子widget
)
```

## Text
```dart
Text(
    '170 Reviews',
    textAlign: TextAlign.center,
    style: TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontFamily: 'Roboto',
      letterSpacing: 2,// 字间距
      fontSize: 20,
    )
)
```

## style封装
```dart
const descTextStyle = TextStyle(
      color: Colors.black,
      fontWeight: FontWeight.w800,
      fontFamily: 'Roboto',
      letterSpacing: 0.5,
      fontSize: 18,
      height: 2,
);

// 使用
style: descTextStyle,
```

## Expanded
```dart
Expanded(
    flex: 2, // 默认为1
    child: // 子widget
)
```

## Image
```dart
Image.asset(
    'assets/images/bg.png',
    fit: BoxFit.fill, // cover、contain、fill
)
```

## Icon
Icon组件的预览地址：https://fonts.google.com/icons
国内预览网站：https://www.fluttericon.cn/

```dart
Icon(Icons.kitchen, color: Colors.green[500]),
const Icon(Icons.star, color: Colors.black),
// 为什么下面的Icon使用需要加上const
```

## Row、Column
```dart
Row(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly, // 主轴排列方式
    crossAxisAlignment: CrossAxisAlignment.start, // 副轴排列方式
    // 默认情况下，行或列沿其主轴会占用尽可能多的空间，但如果要将子项紧密结合在一起，请将其`mainAxisSize`设置为`MainAxisSize.min`。
    mainAxisSize: MainAxisSize.min,
    children: [
        // 子widgets
    ],
),
// Column同理
```

## Center
```dart
Center(
    child: // 子widget
)
```

## SizeBox
```dart
SizedBox(
  width: 440,
  child: // 子wiget
),
```

## Card
```dart
Card(
    child: // 子widget
)
```

## DefaultTextStyle.merge
```dart
DefaultTextStyle.merge(
    style: descTextStyle, // 这里设置的style会影响child中所有的Text的样式
    child: // 子widget
)
```

## Padding
```dart
Padding(
    padding: EdgeInsets.all(20), // padding属性是必写的
    child: // 子widget
)
```

## Stack
```dart
Stack(
    alignment: const Alignment(0.6, 0.6),
    children: [
        // 子列表中的第一个widget是基础widget；后面的子项覆盖在基础widget的顶部
    ]
)
```

## CircleAvatar
```dart
CircleAvatar(
    backgroundImage: AssetImage('assets/images/bg.png'),
    radius: 100,
),
```

## ListTile
```dart
ListTile(
    title: const Text(
        '1625 Main Street',
        style: TextStyle(fontWeight: FontWeight.w500),
    ),
    subtitle: const Text('My City, CA 99984'),
    leading: Icon(
        Icons.restaurant_menu,
        color: Colors.blue[500],
    ),
),
```

## 输入框
Flutter提供了两个开箱即用的文本框组件： `TextField`和`TextFormField`。
```dart
final inputCom = const SizedBox(
    width: 300,
    child: TextField(
        decoration: InputDecoration(
            border: OutlineInputBorder(),
            hintText: 'Enter a search term'
        )
    )
);
```

## 按钮
```dart
ElevatedButton(
  onPressed: () async{
    print('点击事件响应');
  },
  child: const Text("获取缓存")
),
```

## tooltip
```dart
Tooltip(
    message: "我叫路飞，是要成为海贼王的男人。我叫路飞，是要成为海贼王的男人。我叫路飞，是要成为海贼王的男人。我叫路飞，是要成为海贼王的男人。我叫路飞，是要成为海贼王的男人。",
    height: 30,
    padding: EdgeInsets.all(20),
    margin: EdgeInsets.all(20),
    verticalOffset: 10, // 距离 child 中心点的竖直方向偏移量
    preferBelow: true, // 设置为 false 时，会展示在 child 上方
    excludeFromSemantics: false, // 是否使用语义标签
    waitDuration: Duration(seconds: 0), // 指针悬停多久后展示 Tooltip ，默认为 0
    showDuration: Duration(seconds: 1), // 展示时长，之后消失
    // 子控件
    child: Text(
      "路飞",
      textAlign: TextAlign.center,
    ),
);
```

## PopupMenuButton弹出菜单
```dart
import 'package:flutter/material.dart';

enum SampleItem { itemOne, itemTwo, itemThree }

void main() => runApp(const PopupMenuApp());

class PopupMenuApp extends StatelessWidget {
  const PopupMenuApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
          useMaterial3: true, colorSchemeSeed: const Color(0xff6750a4)),
      home: const PopupMenuExample(),
    );
  }
}

class PopupMenuExample extends StatefulWidget {
  const PopupMenuExample({super.key});

  @override
  State<PopupMenuExample> createState() => _PopupMenuExampleState();
}

class _PopupMenuExampleState extends State<PopupMenuExample> {
  SampleItem? selectedMenu;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('PopupMenuButton')),
      body: Center(
        child: PopupMenuButton<SampleItem>(
          initialValue: selectedMenu,
          // Callback that sets the selected popup menu item.
          onSelected: (SampleItem item) {
            setState(() {
              selectedMenu = item;
            });
          },
          itemBuilder: (BuildContext context) => <PopupMenuEntry<SampleItem>>[
            const PopupMenuItem<SampleItem>(
              value: SampleItem.itemOne,
              child: Text('Item 1'),
            ),
            const PopupMenuItem<SampleItem>(
              value: SampleItem.itemTwo,
              child: Text('Item 2'),
            ),
            const PopupMenuItem<SampleItem>(
              value: SampleItem.itemThree,
              child: Text('Item 3'),
            ),
          ],
          child: const Text('Hello World'),
        ),
      ),
    );
  }
}
```

## 进度条
Flutter内置进度条有三种类型，分别是：水平的`LinearProgressIndicator`、圆形的`CircularProgressIndicator`、刷新时`RefreshProgressIndicator`
```dart
LinearProgressIndicator(
  backgroundColor: Colors.yellow, // 背景颜色
  valueColor: AlwaysStoppedAnimation(Colors.pink), // 进度动画颜色
  value: 0.7, // 如果进度是确定的，那么可以设置进度百分比，0-1
),
```
进度条本身不能设置高度，但可以通过父容器设置高度来间接设置
```dart
SizedBox(
  height: 100,
  width: 200,
  child: LinearProgressIndicator(
    backgroundColor: Colors.red, // 背景颜色
    valueColor: AlwaysStoppedAnimation(Colors.black), // 进度动画颜色
    value: 0.9, // 如果进度是确定的，那么可以设置进度百分比，0-1
  )
)
```