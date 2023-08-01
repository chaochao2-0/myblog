# npm run dev后发生了什么

## npm run dev后发生了什么
这里以`acorn`为例：
 - `npm install`的时候会根据库源代码的`package.json`中的`bin`配置来生成`node_modules/.bin`下的软链接
 ```json
 "bin": {
    "acorn": "./bin/acorn"
}
 ```
 - 软链接是一个脚本，它会用`node`去执行`node_modules`下`acorn/bin/acorn.js`文件<br />
 软链接有三个文件，`windows`执行的是`cmd`文件：<br />
 `acorn`：`unix`默认的可执行文件<br />
 `acorn.cmd`：`windows cmd`中默认的可执行文件<br />
 `acorn.ps1`：`windows` `powershell`中可执行文件，可以跨平台
 ```sh{9,11}
 #!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*|*MINGW*|*MSYS*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  exec "$basedir/node"  "$basedir/../acorn/bin/acorn" "$@"
else 
  exec node  "$basedir/../acorn/bin/acorn" "$@"
fi

 ```

<script setup>
import { data } from '../../pinyin.data.ts'
const fileName = 'Monorepo学习'
const cliName = '脚手架开发'
const name = data.data[fileName] ? data.data[fileName] : fileName
const cli = data.data[cliName] ? data.data[cliName] : cliName
</script>
## 配置了bin就一定会生成软链接吗
`ourcad`由于没有在`package.json`中配置`bin`字段数据，所以不会在`node_modules/.bin`下生成软链接<br/>
配置了`bin`字段的所有包都会在`node_modules`下生成软链接吗？<br/>
是的！我在上午刚用
<a :href="'./' + name">Monorepo+pnpm</a>
搭建的项目里做了如下测试：<br/>
 1  修改`demo3`中的`index.ts`代码，修改如下：
 ```ts
 export default class Demo3 {
    name: string
    constructor(name: string) {
        this.name = name
    }

    wakk() {
        console.log('wakk ! Demo3:', this.name)
    }
}
// 新增下面一行
console.log('脚手架搭建测试')
 ```
 2 用tsc编译index.ts生成index.js
 3 在demo3项目的package.json中配置了bin字段，配置如下：
 ```json
 "bin": {
    "chaochao": "./index.js"
}
 ```
 4 删除所有项目的依赖(因为软链接的生成是在`npm install`执行的时候)，回到根目录下执行`pnpm install`，然后查看`demo1`中`node_modules/.bin`下，生成了名为`chaochao`的软链接
 5 修改demo1的命令如下：
 ```json
 "scripts": {
    "dev": "chaochao",
}
 ```
 6 执行`npm run dev`，控制台输出了：脚手架搭建测试。成功!

 思考：<br/>
 问：那么全局指令，比如`pnpm`、`yarn`这些，如果不使用`-g`来安装，是否还可以使用这些指令？<br/>
 答：如果不全局安装，需要使用`npx pnpm`来执行对应的命令，不能直接执行

 问：如何做一个脚手架，让安装的人直接执行你的命令，就像：`vue-cli install`一样，而不是`npm run vue-cli`<br/>
 答：后续补充了脚手架相关内容的学习，具体内容可以查看<a :href="'./' + cli">脚手架开发</a>