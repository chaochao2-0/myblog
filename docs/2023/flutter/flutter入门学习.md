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


