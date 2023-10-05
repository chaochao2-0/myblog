# swift和flutter的区别

- 跨平台性肯定是`flutter`更好
- 如果项目只在`Android`生态或`ios`生态内运行，选择平台原生的开发框架就是更具可行性的选择。毕竟不管是Flutter还是RN，都只能提供绘制UI的功能。想要调用手机系统的其他功能如：定位、电池信息等都只能通过系统级的SDk

以上是别人的博客里面的一些信息。总结一下就是：swift性能、一些底层的功能支持会更好一些，但是它做不了跨平台。如果一款app不需要一些系统底层的能力，只是简单的UI功能，那flutter良好的跨平台支持是更好的选择。


## Swift Package Manager使用
Swift Package Manager是Apple为了弥补当前ios开发中缺少官方组件库管理工具的产物。相较于其他组件管理控件，他的定义文件更加轻松易懂，只需将源码放入相应的文件夹内，Xcode就会自动生成工程文件，并生成编译目标产物所需要的相关配置。同时，SPM与Cocoapods相互兼容，可以在特性上提供互补。
https://mp.weixin.qq.com/s/s2GZ13PVdVa5t-SABArtdA

字节跳动APM-ios团队外部技术分享汇总：
https://bytedance.feishu.cn/docx/doxcnJubfgNEyrslVRjG7iW913e

## 使用阿里图标库
Swift中如何使用阿里图标库：https://juejin.cn/post/7254107670012543013#comment

## Cocoapods如何发布公有库
https://juejin.cn/post/7257333598469439546

这位老哥用swift刷了很多的算法题：https://juejin.cn/user/2661268541946365/posts

SwiftUI的基础文章：https://juejin.cn/user/325111172054350/posts