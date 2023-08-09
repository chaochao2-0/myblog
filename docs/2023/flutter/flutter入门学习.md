# flutter入门学习

## 环境安装
 - windows和linux操作系统，只能搭建Android开发环境
 - 如果需要同时搭建Android和IOS开发环境，请选择MacOS


 https://juejin.cn/post/7243357900940378170?searchId=20230805001356ABCFDE5794FDC33C280B

 ```ts
 maven { url 'https://maven.aliyun.com/repository/central/' }
 maven { url 'https://maven.aliyun.com/repository/public/' }
 maven { url 'https://maven.aliyun.com/repository/google/' }
 maven { url 'https://maven.aliyun.com/repository/gradle-plugin/' }
 ```
```ts
// 允许不同git历史拉代码
git pull --allow-unrelated-histories origin main
// git分支更名
git branch -m master main
```

取消git代理解决github拉取代码443问题
https://blog.csdn.net/qq_37284798/article/details/127806254


如果git报错：fatal: unable to access 'https://github.com/chaochao2-0/flutter-demo.git/': OpenSSL SSL_read: Connection was reset, errno 10054
git config --global http.sslVerify "false"
git config --global https.sslVerify "false"

如果使用了梯子以后，github还是拉取或提交不了代码，去下面的网站查看github的网站ip
https://sites.ipaddress.com/www.github.com/
然后去C:\Windows\System32\drivers\etc路径下修改以管理员身份修改host文件，在底下新增一行:
140.82.112.3(查到的ip) github.com
 - 事实证明上面修改host文件的方法不行，还是要科学上网