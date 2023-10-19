import{d as l}from"./chunks/pinyin.data.7c358b91.js";import{o as p,c as e,k as s,a,l as t,V as c}from"./chunks/framework.c5c8a48b.js";const r=s("h1",{id:"学习element-plus的vitepress配置",tabindex:"-1"},[a("学习element-plus的vitePress配置 "),s("a",{class:"header-anchor",href:"#学习element-plus的vitepress配置","aria-label":'Permalink to "学习element-plus的vitePress配置"'},"​")],-1),D=s("code",null,"element-plus",-1),y=s("code",null,"element-plus",-1),F=["href"],i=c(`<div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@element-plus/build</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">workspace:*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@element-plus/build-constants</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">workspace:*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">@element-plus/build-utils</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">workspace:*</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">,</span></span></code></pre></div><p><code>element-plus</code> 写文档的做法是在<code>.vitepress</code> 文档下新建 <code>theme</code> 文件夹，页面内容全部自己开发，甚至<code>vitepress</code>自带的组件都需要自己写一遍，这种方法的优点是：效果也很好，页面自由度极高。缺点是不太适合我这种懒人，暂不采用。</p><p><code>element-plus</code>的<code>theme</code>文件夹下<code>index.ts</code>的配置如下所示：</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> ElementPlus </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">element-plus</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> VPApp</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">NotFound</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">globals</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../vitepress</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">define</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../utils/types</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">uno.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./style.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">type</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Theme</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitepress</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">define</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Theme</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  NotFound</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// VPApp组件类似于vue项目的app.vue组件，里面加载各种组件展开整个项目</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">Layout</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> VPApp</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">enhanceApp</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">({</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">app</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">})</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">use</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">ElementPlus</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">globals</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">([</span><span style="color:#A6ACCD;font-style:italic;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">Comp</span><span style="color:#89DDFF;">])</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">name</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Comp</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;VPNavbarSearch class=&quot;search&quot; :options=&quot;theme.agolia&quot; multilang /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;VPNavbarMenu class=&quot;menu&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;VPNavbarThemeToggler class=&quot;theme-toggler&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;VPNavbarTranslation class=&quot;translation&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;VPNavbarSocialLinks class=&quot;social-links&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;VPNavbarHamburger</span></span>
<span class="line"><span style="color:#A6ACCD;">      :active=&quot;fullScreen&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;hamburger&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      @click=&quot;$emit(&#39;toggle&#39;)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h4 id="consola" tabindex="-1">consola <a class="header-anchor" href="#consola" aria-label="Permalink to &quot;consola&quot;">​</a></h4><p>element-plus 的源码中用到了这个插件，<a href="https://github.com/unjs/consola#readme" target="_blank" rel="noreferrer">consola</a>是一个功能更丰富，更漂亮的控制台日志输出控件。</p>`,7),g=JSON.parse('{"title":"学习element-plus的vitePress配置","description":"","frontmatter":{},"headers":[],"relativePath":"2023/vitePress/xue2xi2e0le0me0n0t-plu0sde0vi0te0Pre0sspei4zhi4.md","filePath":"2023/vitePress/xue2xi2e0le0me0n0t-plu0sde0vi0te0Pre0sspei4zhi4.md","lastUpdated":null}'),C={name:"2023/vitePress/xue2xi2e0le0me0n0t-plu0sde0vi0te0Pre0sspei4zhi4.md"},f=Object.assign(C,{setup(A){const n="Monorepo学习",o=l.data[n]?l.data[n]:n;return(u,d)=>(p(),e("div",null,[r,s("p",null,[a("本来想单独把 "),D,a(" 的项目拎出来，这样更方便学习。但是因为 "),y,a(" 项目是用 "),s("a",{href:"../"+t(o)},"Monorepo",8,F),a(" 来搭建的，它的文档项目中引用了自己项目内部的一些依赖，所有不能直接把项目的文档部分单独拿出来运行")]),i]))}});export{g as __pageData,f as default};