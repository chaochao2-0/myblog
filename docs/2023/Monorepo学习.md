
# Monorepo学习
最近看了一点`vue3`和`element-plus`的源码，看到他们都已经用了`pnpm+Monorepo`。我悟了，这又是一个必须要学的东西。那么，就来浅浅的尝试一下，实现一个`vue3的项目(demo1)`，引入同样独立的`demo2`和`demo3`模块，三个包共用`vue3`、`element-plus`和`typescript`依赖，同时`demo2`有自己独立的依赖`ts-node`来运行自己的测试代码。

## 安装pnpm
```sh
npm install pnpm -g
```

## 项目结构搭建
新建一个文件夹，就叫`Monorepo-demo`，用编辑器打开文件夹，新建`pnpm-workspace.yaml`文件
```json
packages:
  - 'packages/*'
```
在`Monorepo-demo`下新建packages文件夹，文件夹下新建`demo1(vue项目文件夹)`、`demo2`、`demo3`三个文件夹
并在各级目录下执行`npm init -y`创建包，生成对应的`package.json`文件。

## 安装公共的Vue、Element-plus和typescript依赖
`-w`表示将依赖安装到公共模块中
```sh
pnpm install vue element-plus typescript -w
```

## demo1中创建vue3项目
这里我用的是官方脚手架创建`vue`项目，创建完以后将项目文件移动到`demo1`文件夹下，调整`package.json`中的配置，去掉`vue`、`typescript`在`demo1`中的依赖配置，然后去外层执行命令`pnpm install`安装依赖。
这时`demo1`中的依赖就安装好了，在`demo1`中打开终端运行代码，能够成功运行。证明外层的公共模块依赖正常生效了。

## demo2、demo3中提供一些封装好的逻辑
这里我直接在`demo2`下新建`index.ts`文件提供一个`Demo2`的类，代码如下：
```ts
// index.ts
export default class Demo2 {
    name: string
    constructor(name: string) {
        this.name = name
    }

    helloWorld() {
        console.log('Hello World ! Demo2:', this.name)
    }
}
```
新建`test.ts`运行测试
```ts
// test.ts
import Demo2 from './index'

const test = new Demo2('chaochao')
test.helloWorld()
```
`demo2`中安装自己的独立依赖`ts-node`，在`package.json`中配置测试命令：
```sh
pnpm install ts-node
```
```json
"scripts": {
  "test": "ts-node test.ts"
},
```
随后在demo2中打开终端执行`npm run test`，运行成功，证明`Demo2`中能共用`typescript`依赖且自己独立安装的`ts-node`生效。

`demo3`的代码和`demo2`大体一致，只修改了打印信息，不安装`ts-node`依赖，这里不再赘述。

## 在vue3项目中安装demo2、demo3作为依赖
这里的`demo2`、`demo3`是根据具体`package.json`下的包名来定，我这里是`demo2`、`demo3`
```sh
pnpm install demo2 demo3
```
然后就可以看到依赖的安装情况：
```json
"dependencies": {
  "demo2": "workspace:^",
  "demo3": "workspace:^",
},
```
然后在`vue`项目中的`App.vue`中测试一下依赖安装情况：
```ts
import Demo2 from 'demo2'
import Demo3 from 'demo3'

const test2 = new Demo2('chaochao')
test2.helloWorld()

const test3 = new Demo3('xiaohua')
test3.wakk()
```
运行项目，发现依赖正常引入，能正常打印出需要的日志信息。随后我又测试了一下修改demo2中的打印日志，vue的项目中第一时间就更新了过去，至此，Monorepo的demo项目完成。

## 在外层的package.json中配置命令启动packages文件夹下面的项目
```json
"scripts": {
  "dev": "pnpm -C ./packages/demo1 dev"
},
```
这样我就不需要每次启动项目都跑到demo1下面启动我的vue项目了，可以直接在项目根目录下启动vue项目。

## npm-run-all来串行/并行执行命令
```sh
pnpm install npm-run-all -D -w
```
`npm-run-all`提供三个命令，分别是`npm-run-all`、`run-s`、`run-p`，后两个是`npm-run-all`带参数的简写，分别对应串行和并行。
这里一起来看一下`element-plus`的命令配置：
```json
"typecheck": "run-p typecheck:web typecheck:play typecheck:node typecheck:vite-config typecheck:vitest",
"typecheck:web": "vue-tsc -p tsconfig.web.json --composite false --noEmit",
"typecheck:node": "tsc -p tsconfig.node.json --noEmit",
"typecheck:play": "vue-tsc -p tsconfig.play.json --composite false --noEmit",
"typecheck:vite-config": "vue-tsc -p tsconfig.vite-config.json --composite false --noEmit",
"typecheck:vitest": "vue-tsc -p tsconfig.vitest.json --composite false --noEmit",
```
`vue-tsc`是基于`Volar`的`vue3`类型检查工具，执行`vue-tsc --noEmit`时使用命令行参数`--project（或-p）`指定配置文件进行类型检查。`--composite false`不进行增量编译，增量编译指的是生成 `.d.ts` 和 `tsconfig.tsbuildinfo` 文件，使用 `vue-tsc` 法语检查时不能设置为`true`。
这里`element-plus`的配置命令，配置下面五个类型检查命令分别进行对应模块的类型检查，最后配置一个`typecheck`命令，并行对所有模块类型进行检查。

## 学习参考链接
Monorepo学习、typescript配置、串行/并行执行脚本、npm-run-all：[https://juejin.cn/post/7146183222425518093?searchId=20230726141301208A558690115E13CC04#heading-14](https://juejin.cn/post/7146183222425518093?searchId=20230726141301208A558690115E13CC04#heading-14)