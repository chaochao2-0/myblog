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