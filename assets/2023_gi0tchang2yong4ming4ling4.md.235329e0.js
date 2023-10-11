import{_ as s,o as n,c as a,V as l}from"./chunks/framework.c5c8a48b.js";const d=JSON.parse('{"title":"git常用命令","description":"","frontmatter":{},"headers":[],"relativePath":"2023/gi0tchang2yong4ming4ling4.md","filePath":"2023/gi0tchang2yong4ming4ling4.md","lastUpdated":null}'),t={name:"2023/gi0tchang2yong4ming4ling4.md"},e=l(`<h1 id="git常用命令" tabindex="-1">git常用命令 <a class="header-anchor" href="#git常用命令" aria-label="Permalink to &quot;git常用命令&quot;">​</a></h1><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 撤销最近的一次提交</span></span>
<span class="line"><span style="color:#A6ACCD;">git reset HEAD</span><span style="color:#89DDFF;">~</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 允许不同git历史拉代码</span></span>
<span class="line"><span style="color:#A6ACCD;">git pull </span><span style="color:#89DDFF;">--</span><span style="color:#A6ACCD;">allow</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">unrelated</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">histories origin main</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// git分支更名</span></span>
<span class="line"><span style="color:#A6ACCD;">git branch </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">m master main</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">git pull 报错</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: You have divergent branches and need to specify how to reconcile them.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: You can do so by running one of the following commands sometime before</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: your next pull:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint:   git config pull.rebase false  # merge</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint:   git config pull.rebase true   # rebase</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint:   git config pull.ff only       # fast-forward only</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: You can replace &quot;git config&quot; with &quot;git config --global&quot; to set a default</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: preference for all repositories. You can also pass --rebase, --no-rebase,</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: or --ff-only on the command line to override the configured default per</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// hint: invocation.</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// fatal: Need to specify how to reconcile divergent branches.</span></span>
<span class="line"><span style="color:#A6ACCD;">执行 git config pull</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">rebase </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">然后来合并代码</span></span></code></pre></div>`,3),o=[e];function i(p,c,r,y,g,f){return n(),a("div",null,o)}const u=s(t,[["render",i]]);export{d as __pageData,u as default};
