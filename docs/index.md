### 缘起
一直有记笔记的习惯，最开始还在学校的时候还比较勤快，还发了几篇[csdn](https://blog.csdn.net/chaochao2_0?spm=1011.2415.3001.5343)，后来就一直用语雀。但是前段时间突然发现语雀竟然不允许我新建知识库了。果断弃之，当天下午就用`vitePress`搭建了一个自己的文档站点。

### 中文命名md文件
`vitePress`如果用中文进行md的文件命名，本地不会有什么影响，但是打包发布到线上就会找不到对应的文档。这里用[pinyin-pro](https://www.npmjs.com/package/pinyin-pro)做了一个打包优化，思路是：打包前，我会先用`node`将文档里的所有文件名替换成对应的拼音名，然后再打包，打包结束以后，再将文件名进行还原。这样我就可以用中文来命令md文件，方便我自己的维护。

`three`中的`mini-city`案例: [https://github.com/luosijie/threejs-examples](https://github.com/luosijie/threejs-examples)

