
# Monorepo学习

原文链接：[https://juejin.cn/post/7146183222425518093?searchId=20230726141301208A558690115E13CC04#heading-14](https://juejin.cn/post/7146183222425518093?searchId=20230726141301208A558690115E13CC04#heading-14)

## 安装pnpm
```
npm install pnpm -g
```

tsconfig.json文件有一个顶级属性"references"，它支持将TypeScript的程序项目分割成更小的组成部分，进而可以提高类型检查和编译的速度。
tsconfig.json文件
```ts
{
  "files": [],
  "references": [
    { "path": "./tsconfig.web.json" }, // 组件包部分
    { "path": "./tsconfig.play.json" }, // 组件 play 部分
    { "path": "./tsconfig.vitest.json" } // 组件测试部分
  ]
}
```
每个引用的path属性可以指向包含tsconfig.json文件的目录，也可以指向配置文件本身。经过上面的设置，就等于是在TypeScript层又把我们的项目分成了三个部分。然后我们通过具体配置文件进行具体每个部分的TypeScript编译项设置。而每个部分都有一些公共的配置项，所以我们又可以把公共的配置项进行抽离设置到一个公共配置文件中，再通过extends进行引用，这样一来就可以大大减少相同的配置代码。

公共配置项tsconfig.base.json文件：
```ts
{
    "compilerOptions": {
        "outDir": "dist", // 指定输出目录
        "target": "es2018", // 目标语言的版本
        "module": "esnext", // 生成代码的模板标准
        "baseUrl": ".", // 解析非相对模块的基地址，默认是当前目录
        "sourceMap": false, // 是否生成相应的Map映射文件，默认是false
        "moduleResolution": "node", // 指定模块解析策略，node或classic
        "allowJs": false, // 是否允许编译器编译JS、JSX文件
        "strict": true, // 是否启动所有严格检查的总开关，默认为false，启动后将开启所有的严格检查选项
        "noUnusedLocals": true, // 是否检查未使用的局部变量，默认为false
        "resolveJsonModule": true, // 是否解析JSON模块，默认为false
        "allowSyntheticDefaultImports": true, // 是否允许从没有默认导出的模块中默认导入，默认为false
        "esModuleInterop": true, // 是否通过为所有导入模块创建命名空间对象，允许CommonJS和ES模块之间的互操作性，开启该选项是，也自动开启allowSyntheticDefaultImports选项，默认为false
        "removeComments": false, // 删除注释
        "rootDir": ".", // 指定输出文件目录(用于输出)，用于控制输出目录结构
        "types": [],
        "paths": { // 路径映射，相当于baseUrl
            "@cobyte-ui/*": ["packages/*"]
        }
    }
}
```

组件包部分配置项tsconfig.web.json文件：
```ts
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "composite": true, // 是否开启项目编译，开启该功能，将会生成被编译文件所在的目录，同时开启declaration、declarationMap和incremental，默认为false
        "jsx": "preserve", // 指定JSX代码生成用于的开发环境
        "lib": ["ES208", "DOM", "DOM.Iterable"], // 指定项目运行时使用的库
        "types": ["unplugin-vue-define-options"], // 用来指定需要包含的模块，并将其包含在全局范围内
        "skipLibCheck": true // 是否跳过声明文件的类型检查，这可以在编译期间以牺牲类型系统准确性为代价来节省时间，默认为false
    },
    "include": ["packages"], // 使用include来指定应从绝对类型中使用哪些类型
    "exclude": [ // 提供用于禁用JavaScript项目中某个模块的类型获取的配置
        "node_modules",
        "**/dist",
        "**/__tests__/**/*",
        "**/gulpfile.ts",
        "**/test-helper",
        "packages/test-utils",
        "**/*.md"
    ]
}
```
通过include属性进行限制组件部分的范围

组件play部分配置项tsconfig.play.json文件：
```ts
{
    "extends": "./tsconfig.web.json",
    "compilerOptions": {
        "allowJs": true, // 是否允许编译器编译JS、JSX文件
        "lib": ["ESNext", "DOM", "DOM.Iterable"] // 指定项目运行时使用的库
    },
    "includes": [ // 使用include来指定应从绝对类型中使用哪些类型
        "packages",
        "typings/components.d.ts", 
        "typings/env.d.ts",
        // playground
        "play/main.ts",
        "play/env.d.ts",
        "play/src/**/*"
    ]
}
```
通过include属性进行限制play部分的范围

这样设置之后就可以进行编译优化了，那么它的原理是什么呢？其实关键在于"composite": true这个选项，这个选项设置为true之后，TypeScript就会进行增量编译，所谓增量编译指的是生成.d.ts和.tsbuildinfo文件，其中.tsbuildinfo文件的内容就是记录所编译的项目的文件信息，主要是记录每个文件的hash值，下一次编译的时候，就会对比每个文件的hash值，如果没有变化那么就不进行编译，从而实现了编译性能的优化。

## TypeScript的类型检查
Element Plus组件库是采用rollup-plugin-esbuild来进行打包的，此插件的基本原理就是结合使用ESbuild和Rollup来编译ESNext和TypeScript代码，而ESbuild在编译的时候是不会进行TypeScript的类型检查的，所以我们需要在编译之前就进行TypeScript的类型检查。

对于纯TS文件的项目，我们可以通过tsc --noEmit命令来进行类型检查，tsc --noEmit的意思就是只进行TypeScript的语法检测，而不会进行编译。那么Element Plus组件库有哪些项目是纯TS文件的呢？就是我们的构建程序。在调用tsc命令时可以使用命令行参数--project(或-p)指定配置文件进行执行。

例如在package.json文件中scripts进行如下设置：
```json
{
    "scripts": {
        "typecheck:node": "tsc -p tsconfig.json --noEmit"
    }
}
```
包含SFC单文件组件的项目，我们则可以使用Vue官方提供的vue-tsc工具进行类型检查。
[vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/vue-tsc)提供的针对单文件组件的命令行类型检查和生成。vue-tsc是一个基于volar的Vue3命令行类型检查工具，我们也是可以在执行vue-tsc --noEmit时使用命令行参数--project(或-p)指定配置文件进行配置需要检查的内容和方式。
```json
{
    "scripts": {
        "typecheck:web": "vue-tsc -p tsconfig.web.json --composite false --noEmit",
        "typecheck:play": "vue-tsc -p tsconfig.play.json --composite false --noEmit"
    }
}
```

--composite false 不进行增量编译，增量编译指的是生成.d.ts和tsconfig.tsbuildinfo文件，使用vue-tsc语法检查时不能设置为true。
--composite false --noEmit 不进行编译，也不进行增量编译，只进行语法检测。

## 串行/并行执行脚本
我们上面进行TypeScript类型检查的时候在package.json的script中配置了多个模块的命令，如果需要同时全部执行所有的命令，我们需要进行以下的设置：
```json
{
    "scripts": {
        "runall": "pnpm run typecheck:web && pnpm run typecheck:play && pnpm run typecheck:node && pnpm run typecheck:vitest"
    }
}
```
以上方式属于通过&&符号来串行执行脚本。

既然有串行那么也就有并行，如果需要并行执行脚本，可以使用&符号，示例如下：
```json
{
    "scripts": {
        "runall": "pnpm run typecheck:web & pnpm run typecheck:play & pnpm run typecheck:node & pnpm run typecheck:vitest"
    }
}
```
此外社区里也封装了很多串行/并行执行脚本的公共包供开发者选用，比如还可以使用[npm-run-all](https://github.com/mysticatea/npm-run-all)进行更优雅的设置。npm-run-all是一个可并行或串行运行多个npm-scripts的CLI工具。
安装npm-run-all工具：
```node
pnpm install npm-run-all -D -w
```
npm-run-all提供三个命令，分别是npm-run-all、run-s、run-p，后两个是npm-run-all带参数的简写，分别对应串行和并行。
有了这个包，我们就可以进行以下设置了：
```json
{
    "scripts": {
        "typecheck": "run-p typecheck:web typecheck:play typecheck:node typecheck:vitest"
    }
}
```
这样看起来就优雅多了，更多关于npm-run-all包的使用可以查看其官方文档。

串行命令和并行命令执行规则：
- 一个&是代表并行执行左指令和右指令
- 两个&&是代表串行执行，先执行左指令，再执行右指令
- 如果一个命令中既包含&，也包含&&。&并行的级别要高一些，首先会执行&左右两侧的命令，然后再根据左右两侧指令情况进行执行。