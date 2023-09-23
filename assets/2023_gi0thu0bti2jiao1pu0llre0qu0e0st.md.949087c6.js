import{_ as e,o as l,c as t,V as o}from"./chunks/framework.c5c8a48b.js";const _=JSON.parse('{"title":"提交Pull Request","description":"","frontmatter":{},"headers":[],"relativePath":"2023/gi0thu0bti2jiao1pu0llre0qu0e0st.md","filePath":"2023/gi0thu0bti2jiao1pu0llre0qu0e0st.md","lastUpdated":null}'),a={name:"2023/gi0thu0bti2jiao1pu0llre0qu0e0st.md"},i=o('<h1 id="提交pull-request" tabindex="-1">提交Pull Request <a class="header-anchor" href="#提交pull-request" aria-label="Permalink to &quot;提交Pull Request&quot;">​</a></h1><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">//</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">TODO:提交pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">request需要实操一遍</span></span></code></pre></div><ul><li>首先需要<code>fork</code>这个项目，进入项目页面，点击右上角的<code>fork</code>按钮</li><li>你的<code>github</code>账号中会出现这个项目</li><li>在本地拉取github的代码并添加远程地址</li><li>获取项目最新代码</li><li>创建分支：一般都创建一个新的分支来修改代码</li><li>合并修改：一个常见的问题是远程的项目<code>upstream</code>有了新的更新，从而导致我们提交<code>Pull Request</code>时会导致冲突，因此我们可以在提交前先把远程其他开发者的<code>commit</code>和我们的<code>commit</code>合并。把合并后的代码提交到自己新建的分支当中。</li><li>提交<code>Pull Request</code>你可以在你的<code>github</code>代码仓库页面切换到<code>branches</code>页面点击<code>branch1</code>分支后点击<code>New pull request</code>按钮，添加相关注释后提交。OR切换到<code>branch1</code>分支的代码仓库点击<code>Compare &amp; pull request</code>按钮，添加相关注释后提交。</li></ul><h2 id="commit-规范" tabindex="-1">commit 规范 <a class="header-anchor" href="#commit-规范" aria-label="Permalink to &quot;commit 规范&quot;">​</a></h2><p>提交 commit 的类型，包括以下几种：</p><ul><li>feat 🚀: 新功能</li><li>fix 🧩: 修复问题</li><li>docs 📚: 修改文档</li><li>style 🎨: 修改代码格式，不影响代码逻辑</li><li>refactor ♻️: 重构代码，理论上不影响现有功能</li><li>perf ⚡️: 提升性能</li><li>test ✅: 增加修改测试用例</li><li>chore 🔨: 修改工具相关（包括但不限于文档、代码生成等）</li><li>build 📦️: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）</li></ul>',6),c=[i];function s(r,d,u,n,p,h){return l(),t("div",null,c)}const b=e(a,[["render",s]]);export{_ as __pageData,b as default};
