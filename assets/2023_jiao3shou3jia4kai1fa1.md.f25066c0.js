import{d as o}from"./chunks/pinyin.data.e865787d.js";import{o as p,c as e,k as s,a as n,l as t,V as c}from"./chunks/framework.c5c8a48b.js";const r=s("h1",{id:"脚手架开发",tabindex:"-1"},[n("脚手架开发 "),s("a",{class:"header-anchor",href:"#脚手架开发","aria-label":'Permalink to "脚手架开发"'},"​")],-1),D=["href"],F=c(`<h2 id="package-json-配置-bin" tabindex="-1">package.json 配置 bin <a class="header-anchor" href="#package-json-配置-bin" aria-label="Permalink to &quot;package.json 配置 bin&quot;">​</a></h2><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bin</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">wakk</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">./index.js</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>执行<code>npm link</code>命令，<code>link</code>相当于将当前本地模块链接到<code>npm</code>目录下，这个目录可以直接访问。默认<code>package.json</code>的<code>name</code>为基准，也可以通过<code>bin</code>配置别名。 <code>npm unlink</code>解除链接 只有本地开发需要执行这一步，正常脚手架全局安装无需执行此步骤。因为<code>npm link</code>以后，相当于全局可以执行<code>wakk</code>命令，这里不执行<code>npm link</code>命令。</p><h2 id="删除依赖、执行命令" tabindex="-1">删除依赖、执行命令 <a class="header-anchor" href="#删除依赖、执行命令" aria-label="Permalink to &quot;删除依赖、执行命令&quot;">​</a></h2><p>删除项目中已经安装好的目录，重新<code>pnpm install</code>，让<code>demo1</code>项目下生成<code>wakk</code>的软链接。这个时候去<code>demo1</code>打开终端，运行<code>wakk</code>会报如下错误：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">wakk</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> The term </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">wakk</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> is not recognized </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">name</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">cmdlet</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">file</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">executable</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">program</span><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#82AAFF;">Check</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">spelling</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">name</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">or</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">if</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">path</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">was</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">included</span><span style="color:#A6ACCD;">, </span><span style="color:#82AAFF;">verify</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">that</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">the</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">path</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">is</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">correct</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">try</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">again</span><span style="color:#A6ACCD;">.</span></span></code></pre></div><p>执行<code>npx wakk</code>则可以正常执行，所以脚手架发布以后，可以全局安装使用，也可以单个项目安装，然后配置<code>npx</code>使用。</p><p>到这里我就弄懂了如何配置一个可以不使用<code>npm run</code>执行的脚手架命令，至于后续的如何拉去<code>git</code>远程模板，配置友好的脚手架命令提示等内容，以后有时候再补。 可以参考： <a href="https://juejin.cn/post/7086340583697940516?searchId=202308011333480F886C2A2AE1C06DAA0B#comment" target="_blank" rel="noreferrer">https://juejin.cn/post/7086340583697940516?searchId=202308011333480F886C2A2AE1C06DAA0B#comment</a></p><p>我之前一直理解的脚手架就是拉取一份模板项目代码下来，而有难度的脚手架应该是支持扩展的，能够根据用户的选择来构建不同的项目模板。</p><p><a href="https://github.com/xun082/react-cli" target="_blank" rel="noreferrer">https://github.com/xun082/react-cli</a></p><p><a href="https://juejin.cn/post/7246001188449550396?share_token=aac06d17-4ce8-429d-b237-63e10991e6cb#comment" target="_blank" rel="noreferrer">https://juejin.cn/post/7246001188449550396?share_token=aac06d17-4ce8-429d-b237-63e10991e6cb#comment</a></p><h2 id="脚手架开发-1" tabindex="-1">脚手架开发 <a class="header-anchor" href="#脚手架开发-1" aria-label="Permalink to &quot;脚手架开发&quot;">​</a></h2><p>书接上回，这次来做一个脚手架开发，先实现拉去 template 仓库里面的固定代码，如果后续脚手架需要扩展，适配不同的框架和项目，就只需要在 template 里面新建一个分支，每次都去拉取不同的分支代码就可以了。 新的脚手架项目我决定要用 ESlint 来做代码格式化，弃用 Prettier。</p><ul><li><p>npm init -y 初始化包</p></li><li><p>package.json 中配置 bin</p></li><li><p>npm install -save-dev typescript @types/node 安装 ts</p></li><li><p>tsc --init 生成 ts 配置文件 ts 的配置 include 和 exclude 配置是用来说明哪些文件需要编译，哪些文件不需要被编译的，比如我这里配置的 include 是 src 下面的文件，那我 src 外的 ts 文件则不会被编译。而如果我不添加 include 配置，则所有的 ts 文件都会被编译</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">include</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src/**/*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">exclude</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">node_mudules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">]</span></span></code></pre></div></li><li><p>npm i -D @antfu/eslint-config eslint vscode默认的保存代码自动格式化：左下角的 setting，搜索 format，勾选 Editor:Format On Save，即可实现保存代码自动格式化，这里的格式化不是按照eslint的规则来格式化的</p><p>eslint 的保存时自动格式化代码，点击左下角的setting打开设置后，点击Open Settings(JSON)，在配置文件中添加下面的配置，即可实现vscode按照eslint规则来实现代码格式化</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint.format.enable</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">true</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">eslint.run</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">onSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">editor.codeActionsOnSave</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">source.fixAll</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>因为我这里使用的是@antfu/eslint-config，所以有些eslint的配置我并不喜欢，需要按照自己的需求做些修改：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">extends</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@antfu</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">rules</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">// 关闭定义变量转为const</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">prefer-const</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">// 保存代码时缩进4个空格</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">indent</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@typescript-eslint/indent</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">error</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#676E95;font-style:italic;">// 允许使用console</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">no-console</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">off</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>到这里，eslint配置并且保存代码时自动格式化代码已经完成了</p></li></ul>`,14),h=JSON.parse('{"title":"脚手架开发","description":"","frontmatter":{},"headers":[],"relativePath":"2023/jiao3shou3jia4kai1fa1.md","filePath":"2023/jiao3shou3jia4kai1fa1.md","lastUpdated":null}'),y={name:"2023/jiao3shou3jia4kai1fa1.md"},m=Object.assign(y,{setup(A){const a="Monorepo学习",l=o.data[a]?o.data[a]:a;return(i,C)=>(p(),e("div",null,[r,s("p",null,[n("这次我们还是在 "),s("a",{href:"./"+t(l)},"Monorepo+pnpm",8,D),n(" 的代码基础上进行开发")]),F]))}});export{h as __pageData,m as default};
