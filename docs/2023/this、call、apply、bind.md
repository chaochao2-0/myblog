# this、call、apply、bind

## 默认执行时
```js
function fn() {
    console.log(this) // window
}
function fn1() {
    "use strict"
    console.log(this) // undefined
}
fn()
fn1()
```

## 隐式执行时
改变函数的执行上下文
```js
var person = {
    fullName: 'xiaoming',
    say() {
        console.log(`my name is ${this.fullName}`)
    }
}
var say = person.say
person.say() // my name is xiaoming
say() // my name is undefined
```

函数传参
```js
var person = {
    fullName: 'xiaoming',
    say() {
        console.log(`my name is ${this.fullName}`)
    }
}
function handleFn(cb) {
    cb()
}
handleFn(person.say) // my name is undefined
```

定时器传参
```js
var person = {
    fullName: 'xiaoming',
    say() {
        console.log(`my name is ${this.fullName}`)
    }
}
setTimeout(person.say, 1000) // my name is undefined
```

arguments类数组
```js
var length = 1
function fn() {
    console.log(this.length)
}
const person = {
    length: 2,
    say(fn) {
        fn()
        arguments[0]()
    }
}
person.say(fn, 1, 2) // 1, 3
```

new绑定时
```js
var name = 'window2'
function Fn(name) {
    this.name = name
}
let obj = new Fn('xiaoming')
console.log(obj.name) // xiaoming
```

## 显式执行时
显示执行时，通常分为两类：
 - 临时改变this指向: call apply
 - 永久改变this指向: bind

 call的使用：
 ```js
 const list = [1, 2, 3, 4]
 const newList = Array.prototype.map.call(list, el => el + 2)
 console.log(newList)

 // 用var定义的变量会挂载到windows上，而使用const定义的变量不会挂载到windows上
 var name = 'window3'
 const person = {
    name: 'xiaoming',
    say() {
        console.log(this.name)
    }
 }

 // call可以调用函数，可以改变this的指向
 person.say.call(window) // window3
 ```

 apply的使用
 ```js
 const list = [1, 2, 3, 4]
 // 传参的方式和call不一样，apply是用数组传参
 const newList = Array.prototype.map.apply(list,[el => el + 2])
 console.log(newList)

 var name = 'window3'
 const person = {
    name: 'xiaoming',
    say() {
        console.log(this.name)
    }
 }
 person.say.apply(window) // window3
 ```

 bind的使用
 ```js
 const list = [1, 2, 3, 4]
 const newList = Array.prototype.map.bind(list,el => el + 2)
 let data = newList()
 console.log(data)

 var name = 'window3'
 const person = {
    name: 'xiaoming',
    say() {
        console.log(this.name)
    }
 }
 // bind不会直接调用函数
 let fun = person.say.bind(window)
 fun() // windows
 ```

 