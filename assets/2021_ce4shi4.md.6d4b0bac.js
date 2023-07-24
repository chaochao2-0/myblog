import{_ as s,o as a,c as n,V as l}from"./chunks/framework.c3c5d8f9.js";const e="/myblog/assets/avatar.a1e135fd.jpg",h=JSON.parse('{"title":"测试","description":"","frontmatter":{},"headers":[],"relativePath":"2021/ce4shi4.md","filePath":"2021/ce4shi4.md","lastUpdated":null}'),p={name:"2021/ce4shi4.md"},t=l('<h1 id="测试" tabindex="-1">测试 <a class="header-anchor" href="#测试" aria-label="Permalink to &quot;测试&quot;">​</a></h1><p>并发请求之前一直做的很少，没有一个很好的并发请求的概念。这次在CAD项目中，第一次感受到了并发请求的重要性。尤其在处理大文件，运用一些切片上传、并发请求的场景中，并发请求是必须要用的。</p><p>在CAD中，我这边的并发请求用的是Promise.all来处理，将CAD的各种需要请求的资源通过Promise来封装，然后用Promise.all来并发请求<br><img src="'+e+`" alt="image.png"></p><p>以上是我的并发请求实现思路，这种实现方式有一个问题就是：Promise.all的并发，它会等待所有请求都返回了才去处理逻辑。如果遇到一些比较复杂的场景，需要并发请求，并且需要保持一定的并发数量，比如有一百个请求，需要同时保持有十个请求在并发处理，响应一个，继续请求下一个。这种逻辑该如何进行处理和实现：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const arr = []</span></span>
<span class="line"><span style="color:#A6ACCD;">for (let i = 0; i &lt; 100; i++) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    arr.push(</span></span>
<span class="line"><span style="color:#A6ACCD;">        () =&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">            new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    console.log(&#39;done&#39;, i)</span></span>
<span class="line"><span style="color:#A6ACCD;">                    resolve()</span></span>
<span class="line"><span style="color:#A6ACCD;">                }, 100 * i)</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const parallelRun = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    const runingTask = new Map()</span></span>
<span class="line"><span style="color:#A6ACCD;">    const inqueue = (totalTask, max) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">        while (runingTask.size &lt; max &amp;&amp; totalTask.length) {</span></span>
<span class="line"><span style="color:#A6ACCD;">            const newTask = totalTask.shift()</span></span>
<span class="line"><span style="color:#A6ACCD;">            const tempName = totalTask.length</span></span>
<span class="line"><span style="color:#A6ACCD;">            runingTask.set(tempName, newTask)</span></span>
<span class="line"><span style="color:#A6ACCD;">            newTask().finally(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">                runingTask.delete(tempName)</span></span>
<span class="line"><span style="color:#A6ACCD;">                inqueue(totalTask, max)</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return inqueue</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">parallelRun()(arr, 6)</span></span></code></pre></div><p>还有一个使用Promise进行并发请求处理的一个库：p-limit<br><a href="https://github.com/sindresorhus/p-limit" target="_blank" rel="noreferrer">https://github.com/sindresorhus/p-limit</a></p>`,6),o=[t];function c(r,i,C,A,m,D){return a(),n("div",null,o)}const u=s(p,[["render",c]]);export{h as __pageData,u as default};
