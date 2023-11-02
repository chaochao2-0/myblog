# Flutter中使用Metal


https://pub.dev/packages/ar_flutter_plugin
https://mp.weixin.qq.com/s?__biz=MjM5MDA2MTI1MA==&mid=2649127118&idx=1&sn=e7f385e9f9cb1b6b9245398d49896b78&chksm=be585f63892fd6758ccbf517fba2a5a93da38afb49418c34eac8209e9c93d3e47702ef12ac1f&scene=27



## 安装ARkit_plugin
https://pub.dev/packages/arkit_plugin
```dart
// 安装下面两个库
arkit_plugin: ^1.0.7
vector_math: ^2.1.4

// 运行时会提示相机权限不够，在ios/Runner/Info.plist中添加下面权限，再次运行即可
<key>NSCameraUsageDescription</key>
<string>cameraDesciption</string>

// ARkit_plugin插件的示例代码：
// https://github.com/olexale/arkit_flutter_plugin/blob/master/example/lib/hello_world.dart

```

使用`flutter build ios`打包可以成功，但是使用`Xcode`再次打包时却会有很多报错，这个报错如何解决？

执行flutter clean
运行Xcode->Product->Clean
删除ios/.symlinks文件夹
删除ios/Pods文件夹
删除ios/Podfile.lock
在ios文件夹下执行pod install
重新打包/编译


```dart
// 查看文件的权限
ls -@l 文件路径

// 给文件重新赋予权限
chmod -R 777 文件路径
```