# 学习element-plus的vitePress配置

本来想单独把 `element-plus` 的项目拎出来，这样更方便学习。但是因为 `element-plus` 项目是用 `Monorepo` 来搭建的，它的文档项目中引用了自己项目内部的一些依赖，所有不能直接把项目的文档部分单独拿出来运行

```json
"@element-plus/build": "workspace:*",
"@element-plus/build-constants": "workspace:*",
"@element-plus/build-utils": "workspace:*",
```

`element-plus` 写文档的做法是在`.vitepress` 文档下新建 `theme` 文件夹，页面内容全部自己开发，甚至`vitepress`自带的组件都需要自己写一遍，这种方法的优点是：效果也很好，页面自由度极高。缺点是不太适合我这种懒人，暂不采用。

`element-plus`的`theme`文件夹下`index.ts`的配置如下所示：
```ts{12}
import ElementPlus from 'element-plus'

import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import type { Theme } from 'vitepress'

export default define<Theme>({
  NotFound,
  // VPApp组件类似于vue项目的app.vue组件，里面加载各种组件展开整个项目
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})

```

```vue
<div class="content">
    <VPNavbarSearch class="search" :options="theme.agolia" multilang />
    <VPNavbarMenu class="menu" />
    <VPNavbarThemeToggler class="theme-toggler" />
    <VPNavbarTranslation class="translation" />
    <VPNavbarSocialLinks class="social-links" />
    <VPNavbarHamburger
      :active="fullScreen"
      class="hamburger"
      @click="$emit('toggle')"
    />
</div>
```
#### consola
element-plus 的源码中用到了这个插件，[consola](https://github.com/unjs/consola#readme)是一个功能更丰富，更漂亮的控制台日志输出控件。
