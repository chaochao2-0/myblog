import{d as n}from"./chunks/pinyin.data.0b75b7aa.js";import{o as p,c as l,k as s,a as o,l as t,V as c}from"./chunks/framework.c5c8a48b.js";const r=s("h1",{id:"脚手架开发",tabindex:"-1"},[o("脚手架开发 "),s("a",{class:"header-anchor",href:"#脚手架开发","aria-label":'Permalink to "脚手架开发"'},"​")],-1),A=["href"],C=c(`<h2 id="package-json配置bin" tabindex="-1">package.json配置bin <a class="header-anchor" href="#package-json配置bin" aria-label="Permalink to &quot;package.json配置bin&quot;">​</a></h2><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">wakk</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./index.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>执行<code>npm link</code>命令，<code>link</code>相当于将当前本地模块链接到<code>npm</code>目录下，这个目录可以直接访问。默认<code>package.json</code>的<code>name</code>为基准，也可以通过<code>bin</code>配置别名。 <code>npm unlink</code>解除链接 只有本地开发需要执行这一步，正常脚手架全局安装无需执行此步骤。因为<code>npm link</code>以后，相当于全局可以执行<code>wakk</code>命令，这里不执行<code>npm link</code>命令。</p><h2 id="删除依赖、执行命令" tabindex="-1">删除依赖、执行命令 <a class="header-anchor" href="#删除依赖、执行命令" aria-label="Permalink to &quot;删除依赖、执行命令&quot;">​</a></h2><p>删除项目中已经安装好的目录，重新<code>pnpm install</code>，让<code>demo1</code>项目下生成<code>wakk</code>的软链接。这个时候去<code>demo1</code>打开终端，运行<code>wakk</code>会报如下错误：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">wakk</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> The term </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wakk</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> is not recognized </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">cmdlet</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">file</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">executable</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">program</span><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#82AAFF;">Check</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">spelling</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">name</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">path</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">was</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">included</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">verify</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">that</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">path</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">correct</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">try</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">again</span><span style="color:#A6ACCD;">.</span></span></code></pre></div><p>执行<code>npx wakk</code>则可以正常执行，所以脚手架发布以后，可以全局安装使用，也可以单个项目安装，然后配置<code>npx</code>使用。</p><p>到这里我就弄懂了如何配置一个可以不使用<code>npm run</code>执行的脚手架命令，至于后续的如何拉去<code>git</code>远程模板，配置友好的脚手架命令提示等内容，以后有时候再补。 可以参考： <a href="https://juejin.cn/post/7086340583697940516?searchId=202308011333480F886C2A2AE1C06DAA0B#comment" target="_blank" rel="noreferrer">https://juejin.cn/post/7086340583697940516?searchId=202308011333480F886C2A2AE1C06DAA0B#comment</a></p><p>我之前一直理解的脚手架就是拉取一份模板项目代码下来，而有难度的脚手架应该是支持扩展的，能够根据用户的选择来构建不同的项目模板。</p><p><a href="https://github.com/xun082/react-cli" target="_blank" rel="noreferrer">https://github.com/xun082/react-cli</a></p><p><a href="https://juejin.cn/post/7246001188449550396?share_token=aac06d17-4ce8-429d-b237-63e10991e6cb#comment" target="_blank" rel="noreferrer">https://juejin.cn/post/7246001188449550396?share_token=aac06d17-4ce8-429d-b237-63e10991e6cb#comment</a></p>`,11),m=JSON.parse('{"title":"脚手架开发","description":"","frontmatter":{},"headers":[],"relativePath":"2023/jiao3shou3jia4kai1fa1.md","filePath":"2023/jiao3shou3jia4kai1fa1.md","lastUpdated":null}'),y={name:"2023/jiao3shou3jia4kai1fa1.md"},k=Object.assign(y,{setup(F){const a="Monorepo学习",e=n.data[a]?n.data[a]:a;return(d,i)=>(p(),l("div",null,[r,s("p",null,[o("这次我们还是在 "),s("a",{href:"./"+t(e)},"Monorepo+pnpm",8,A),o(" 的代码基础上进行开发")]),C]))}});export{m as __pageData,k as default};