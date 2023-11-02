# flutter入门学习

## 环境安装
 - windows和linux操作系统，只能搭建Android开发环境
 - 如果需要同时搭建Android和IOS开发环境，请选择MacOS

关于运行项目一直卡在`Running Gradle task 'assembleDebug'...`的解决方法：
https://juejin.cn/post/7243357900940378170?searchId=20230805001356ABCFDE5794FDC33C280B
第二次挂了梯子然后就没有卡住，虽然还是比较慢。


 ```ts
 maven { url 'https://maven.aliyun.com/repository/central/' }
 maven { url 'https://maven.aliyun.com/repository/public/' }
 maven { url 'https://maven.aliyun.com/repository/google/' }
 maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
 ```
## flutter的包管理工具pub
Dart提供了包管理工具`Pub`，用来管理代码和资源。与`Android`中的`JCenter/Maven`、ios中的`CocoaPods`、前端中的`npm`库类似。对应的依赖管理文件是`pubspace.yaml`
https://pub-web.flutter-io.cn/

## mac mini环境配置
1. 下载Android Studio
官网下载：https://developer.android.com/studio?hl=zh-cn, 下载的时候要关闭代理
选择`Mac with Apple chip`版本
2. 安装好`Android Studio`后，打开，在`Plugins`中安装`flutter`插件
3. 下载`flutter sdk`: https://docs.flutter.dev/get-started/install/macos, 选择`Apple Silicon`版本下载
4. 将下载好的`flutter sdk`解压缩，用`Android Studio`新建一个flutter项目，导入刚才下载好的`flutter sdk`即可创建和运行项目

## vscode如何配置环境
1. 安装`flutter`插件
2. `command + shift + p`调出输命令框，输入`flutter`,随后选择新建项目运行即可
3. 设备选择`chrome`，然后`debugging`调试

## 如何用xcode运行flutter项目
```ts
// 用xcode打开项目
open -a Xcode ios/Runner.xcworkspace
// 用xcode打开项目，给项目选择一个team
// 但是运行却一直报错,而直接使用Android Studio打开却不会报错，可以正常真机调试
Command PhaseScriptExecution failed with a nonzero exit code
```

## mac mini 配置环境变量
```ts
// 打开环境变量配置文件
open ~/.bash_profile

// 添加flutter的安装路径到环境变量 Users/chaochao/Documents/flutter/flutter/bin是flutter安装路径
export PATH=/Users/chaochao/Documents/flutter/flutter/bin:$PATH
export PATH=/Users/chaochao/Documents/flutter/flutter/bin/cache/dart-sdk/bin:$PATH

export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

// 更新配置文件
source ~/.bash_profile

// 获取依赖
flutter packages get
// 依赖安装好以后如果是ios真机测试还需要用xcode打开项目下的ios项目，给项目分配一个开发team，不然打包不了
```

## fvm切换flutter版本
```dart
// 添加homebrew tap
brew tap leoafarias/fvm

// 安装 fvm
brew install fvm
// 查看fvm的版本
fvm --version
// 安装flutter版本
fvm install 3.10.0
// 查看安装列表
fvm list
// 切换flutter版本
fvm use 3.10.0
```
我安装的fvm并没有像博客中的那样有`.fvm`文件夹，安装过程等待了很久，效果却一点都不好，暂时放弃使用`fvm`工具
https://juejin.cn/post/6939712499465846798?searchId=20231101165324A5F32542D249556280AC







先确认flutter和dart是否能够做AR sdk的这个事情
如果能够做，sdk如何发包？如何维护？
flutter如何打包成各种版本的app，如何上架？


AR的画面是视频流还是像webgl一样，用ios的调用gpu的方法实现？
如果AR的画面是调用gpu实现的,flutter是否可以实现？

## Impeller
`Impeller`是`Flutter`团队自研的渲染引擎，它的最终目标是在`Flutter`中取代当前的渲染引擎`Skia`。
`Impeller`的出现是`Flutter`团队用以彻底解决`SkSL(Skia Shading Language)`引入的`Jank`问题所做的重要尝试。

背景：`SkSL`引入的卡顿问题：
`Skia`在第一次使用某个着色器时，需要动态生成对应的着色器代码并对其进行编译(着色器代码可以简单理解为一段跑在GPU上的代码)。这个过程可能会非常耗时，有时候会有几十甚至上百毫秒的一个耗时。

`Impeller shader`的离线编译：
与`Skia`不同的是，`Impeller`中的`shader`并不需要在运行时动态生成，而是提前写好，并通过离线编译的方式打到引擎之中的。

`Impeller`中的`shader`是使用`GLSL 4.60`写的。而我们知道`Metal`后端需要的`shader`语言是`MSL(Metal shading language)`,那么`Impeller`是如何做到将`GLSL4.60`转换成`MSL`的呢？
在引擎编译阶段，`ImpellerC`会借助`ShaderC`，将`GLSL`转换为`SPIR-V Assembly`。然后再借助`SPIR-V Cross`将`SPIR-V Assembly`反汇编为`SPIR-V IR`，并根据`SPIR-V IR`生成相应的`MSL`源码，最终将`MSL`编译链接得到`Metal Library`并将其打包到`engine`当中。
同时，`ImpellerC`中的`Refector`根据`SPIR-V IR`中的数据，根据不同的后端，生成对应的`c++`文件，用于绑定数据等。

## HappinessX
核心组成是`Flutter Plugin + AS`插件，它提供了一套基于`GetX`极致简洁高效的`Flutter`业务开发范式，以及针对混合工程的提效工具。配套的`AS`插件帮助建立开发规范和进一步提高开发效率。

Json2Dart
GetX使用和插件：https://juejin.cn/post/6924104248275763208?searchId=202310180953376667B7DB9CBFC16C956B

## Skia
在`chrome`浏览器中，`Skia`是`Blink`渲染引擎的一部分，`Blink`渲染引擎是`Google`开发的一种基于`WebKit`的渲染引擎，用于处理`HTML`、`CSS`和`JavaScript`的渲染。`Blink`渲染引擎使用`Skia`来处理所有的2D图形操作，以提高网页的渲染性能。

`chrome`显示一个页面，也是通过`CPU`和`GPU`共同处理显示出来的。而`WebGL`这样的技术让开发者可以直接自己操作`GPU`进行绘制。