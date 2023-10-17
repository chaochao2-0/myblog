# dart学习
`dart`语句后面必须带`;`
可以在`flutter`项目中的`test`文件夹中编辑代码做测试。

## 基础数据类型
int double String bool

## $变量名 在字符串中插入变量值
```dart
// $变量名: 在字符串中插入变量值
int a = 1;
print('a的值是:$a');
```

```dart
// ${}来嵌入表达式
int a = 1;
print('a的值是:${a + 3}');
```

## 运算符
运算符
if else、switch、for、while、do while等流程控制语句的使用方法和js中基本一致

## 函数
```dart
// 函数名前是函数的返回值
void getName() {
  String name = '测试';
  print('名字:$name');
}
```
### 命名参数
`dart`中支持命名参数，可以通过参数的名称来传参，不需要在意入参的顺序。通过`{}`包裹命名的参数，其中`required`关键字表示该入参必须传入；另外，可以用`=`提供参数的默认值，使用者在调用时可以选填
```dart
void printData({
  required String name, // 必传参数不需要给默认值
  int age = 0 // 选填参数必须给默认值
}) {
  print('名字:$name; 年龄:$age');
}

printData(name: 'zhangsan', age: 18);
```
### 位置参数
方括号`[]`包围参数列表，位置参数可以给默认值，函数参数必须按照参数顺序传入。
它和普通函数列表的区别在于：在调用时，可以省略若干个参数，省略的参数使用默认值。
```dart
void printData([String name = 'lisi', int age = 0]) {
  print('名字:$name; 年龄:$age');
}

printData('zhangsan', 16);
```
## class类
- `class`中的成员属性必须给个默认值
- 构造函数的函数名和类名相同
- 在构造函数中，通过`this`对象进行赋值的操作，可以进行简化书写

```dart
class Human {
  String name = '';
  int age = 0;

  // Human(String name, int age) {
  //   this.name = name;
  //   this.age = age;
  // }
  Human(this.name, this.age);
}
```
### 继承
```dart
class Human {
  String name = '';
  int age = 0;
  Human(this.name, this.age);
}

class Student extends Human {
  final String school;
  // super.name: 在入参中为父类中的成员赋值
  Student(super.name, super.age, this.school);

  void info() {
    print('${name}, ${age}'); // 类的成员函数访问自身属性可以省略this
  }
}

Student stu = Student('zhangsan', 16, '湖南科技学院');
stu.info();
```

### 子类覆写父类方法
当子类中存在和父类同名的方法时，子类中的方法就会覆写父类中的方法。
在对象调用方法时，会优先使用子类方法，子类没有该方法时，才会触发父类方法。
一般子类覆写方法时，加`@override`注解进行示意。
```dart
class Human {
  String name = '';
  int age = 0;
  Human(this.name, this.age);

  void info() {
    print('${name}, ${age}');
  }
}

class Student extends Human {
  final String school;
  Student(super.name, super.age, this.school);

  @override
  void info() {
    super.info(); // 在子类中可以通过super调用父类中的方法
    print('${name}, ${age}, ${school}');
  }
}

Student stu = Student('zhangsan', 16, '湖南科技学院');
stu.info();
```

## 聚合类型
在日常生活中，有一类数据总是批量呈现的，这样的数据称为：聚合类型或容器类型。
在`dart`中，有三个最常用的聚合类型：列表`List`、映射`Map`和集合`Set`

## 列表List
列表类型中可以盛放若干个同类型的对象，并且允许重复。在声明列表对象时，其中盛放的对象类型放在`<>`中，称之为泛型。
```dart
// 定义int泛型的列表，列表中只能盛放整数数据
List<int> numList = [1, 2, 3, 4, 5];
// 可以通过索引获取列表中的数据
print(numList[0]);

// List中的常用方法:
List<int> numList = [1, 2, 3, 4, 5];
numList.add(6); // 在末尾添加一个元素  [1, 2, 3, 4, 5, 6]
numList.insert(1, 9); // 在指定索引处插入一个元素，比如这里在索引1处插入一个9  [1, 9, 2, 3, 4, 5, 6]
numList.remove(1); // 移除某个元素值，这里将1移除了  [9, 2, 3, 4, 5, 6]
numList.removeAt(1); // 移除指定索引处的元素  [9, 3, 4, 5, 6]
numList.removeLast(); // 移除最后元素  [9, 3, 4, 5]
print(numList);

// List遍历方法
// for循环遍历
for(int i = 0; i < numList.length; i++) {
    int value = numList[i];
    print("索引$i, 元素值$value");
}

// for in遍历:没有索引信息
for (int value in numList) {
    print("元素值:$value");
}
```

## 集合Set
`Set`类型可以盛放若干个同类型的对象，它最大的区别是：不允许重复。
```dart
Set<int> numSet = {1, 2, 3, 3};
print(numSet); // 自动合并重复元素：{1, 2, 3}

// 集合本身是没有索引概念的，所以无法通过索引来访问和修改元素，因为集合本身在数学上的概念就是无序的。
numSet.add(4); // 通过add方法添加元素: {1, 2, 3, 4}
numSet.remove(1); // 通过remove方法移除元素: {2, 3, 4}

// 集合最重要的特征是可以进行集合间的运算，这点List是无法做到的。
Set<int> a = {1, 9, 4};
Set<int> b = {1, 9, 3};
print(a.difference(b));   // 差集 {4}
print(a.union(b));        // 并集 {1, 9, 4, 3}
print(a.intersection(b)); // 交集 {1, 9}

// 遍历: 因为集合没有索引，索引只能使用for in遍历
for(int value in a){
    print("元素值:$value");
}
```

## 映射Map
`Map`是维护若干个键值对的数据类型。
映射中的一个元素记录着两个对象，所以`Map`类型有两个泛型，分别表示`key`的类型和`value`的类型。
```dart
Map<int, String> numMap = {
    0: 'zero',
    1: 'one'
};

numMap[3] = 'three'; // 通过 [key] = value添加元素
numMap.remove(0); // remove方法根据key移除元素  {1: one, 3: three}

// forEach遍历
numMap.forEach((key, value) {
    print("key:$key, value:$value");
});
```

## 空安全
`dart`是一个空安全的语言，也就是说：你无法将一个非空类型对象的值设为`null`
如果希望对象可以赋值为`null`，需要在类型后加上`?`，表示可空
```dart
String? aa = null;
say(aa);

void say(String? word) {
  print('$word');
}
```

## 异步任务
`dart`中的`async/await`使用方法和`js`中基本一致：
```dart
import 'dart:io';

void main() async {
  // 文件读取
  var file = File('log.txt'); // 这个路径是以项目根路径计算的
  print("444");
  var content = await file.readAsString();
  print("${content}");
  print("123");

  // 文件写入
  var logFile = File('log.txt');
  var sink = logFile.openWrite();
  sink.write('FILE ACCESSED ${DateTime.now()}\n');
  await sink.flush();
  await sink.close();
}
```

# AR sdk学习了解
## NVIDIA CloudXR SDK
NVIDIA CloudXR SDK由服务器驱动程序、客户端SDK和示例客户端应用程序组成。
一端是越来越轻便的终端设备，一端是算力无穷的云，这就是CloudXR的精髓所在。

服务器驱动程序通过与`SteamVR`集成，对渲染的帧和系统音频进行编码，并将帧和声音发送给客户端进行解码和显示，从而将`OpenVR`应用程序中的音频和视频内容提供给客户端。服务器驱动程序还通过使用`SteamVR`接收来自客户端设备的运动和控制数据，`SteamVR`作为预构建包提供，并带有自己的安装程序。

cloudXR平台基于腾讯云的部署和应用：https://www.zhihu.com/zvideo/1365679354203189248


### ARKit
ARKit: ARKit提供的功能总体可以分为三个部分：运动跟踪、场景理解、渲染。
运动跟踪、场景理解上我们无需关注细节，在API层面`ARKit`中的`ARSession`给我们提供了打开摄像头去检测、跟踪当前环境(空间、平面、人脸、图片、物体)的能力。严格来讲`ARKit`并没有渲染的能力，AR的渲染需要依赖其他第三方渲染框架，如`3D SceneKit`、`2D SpriteKit`、`Metal`等。这得益于`ARKit`提供连续的摄像头图像流，可以方便的对接其他渲染。
ARKit官方文档:https://developer.apple.com/cn/documentation/arkit/
https://github.com/Wejua/Demos/tree/main/Demos/SubDemos/ARKitDemo


ARCore文档：https://developers.google.com/ar/develop?hl=zh-cn

### Metal
官网的开发文档：https://developer.apple.com/cn/metal/
用Metal绘制一个三角形:
https://juejin.cn/post/7215891370890952741?searchId=20231016171400C70564938D162C20BC4F


flutter中如何使用ARKit和ARCore来实现一个AR APP的开发

CloudXR部署：
- 安装`CloudXR Server`，`CloudXR-Setup.exe`，此软件可在`NVIDIA CloudXR`网站申请获得
- 构建`CloudXR PICO`客户端，生成`apk`过程。如果您已获得编译好的`apk`或`PICO`设备已安装过了可略过
- 从`github`下载并用`Android Studio`打开`CloudXR_Client_Demo Android`工程
- 在`Android Studio`中`Build Android`工程，生成`apk`安装包并安装到`PICO`
- 创建`CloudXRLanchOptions.txt`文件,文件内容为: -s <您的电脑的IP地址>
- 将`CloudXRLanchOptions.txt`文件拷贝到`PICO`硬盘根目录中
- 先在电脑上运行`SteamVR`然后在`PICO`上运行刚安装的`CloudXR`客户端软件：`nativexr_cloudxr_client_demo`
- `PICO`自动进入`SteamVR`界面，无线串流成功
- 打开`UE5`，创建一个`Collab Viewer`模板工程，构建一个`UE5 VR`应用程序并通过`CloudXR`无线串流到`PICO`
- 工程打开后启用`SteamVR`和`OpenXR Plugins`，然后按要求重启本地`UE5`项目
- 项目重启后可以看到`VR Preview`功能已开启，确认`PICO`还在刚才`SteamVR`的界面，已连接未待机的状态，点击`VR Preview`运行