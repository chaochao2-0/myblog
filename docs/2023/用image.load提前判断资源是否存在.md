# 用image.load提前判断资源是否存在
cad的批注数据不一定所有图纸都有，只有批注数据存在时才能请求回来comment.json数据。而如果没有批注数据，控制台就会报一大片请求失败的错误。
问题：如何提前判断资源文件是否存在？如果确定存在才发起资源请求，不存在就不去请求，避免控制台报错

```ts
let img = new Image()
img.src = url
img.onload = function () {
    console.log('资源存在')
}
img.onerror = function () {
    console.log('资源不存在')
}
```
使用img.onload方法确实让报错提示温和了很多，但是还是会在控制台报错：
```
comment.json:1     GET https://api.ourbim.com:8181/CADFile/20230818102838961/comment.json 404 (Not Found)
```
在不想新增接口来判断图纸是否有批注的情况下，只能先采用这种方法让报错提示尽可能温和一点了。
不行！使用img.onload方法去测试json数据，即使json数据存在，也会走img.onerror方法提示资源不存在，只能去新增批注是否存在的判断接口了。



因为ourbim官网部署了https，而https发不出http请求，只能通过nginx代理去请求过去，但sdk的封装请求不可能使用代理的字段去封装。如果对应的请求地址调整为https，那后面的每次修改都要进行修改