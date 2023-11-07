import{_ as s,o as a,c as l,V as n}from"./chunks/framework.c5c8a48b.js";const A=JSON.parse('{"title":"嘉立创","description":"","frontmatter":{},"headers":[],"relativePath":"速记/we0bgl.md","filePath":"速记/we0bgl.md","lastUpdated":null}'),e={name:"速记/we0bgl.md"},o=n(`<h1 id="嘉立创" tabindex="-1">嘉立创 <a class="header-anchor" href="#嘉立创" aria-label="Permalink to &quot;嘉立创&quot;">​</a></h1><h2 id="顶点着色器是不是只有顶点信息-法线这些如何获取" tabindex="-1">顶点着色器是不是只有顶点信息？法线这些如何获取？ <a class="header-anchor" href="#顶点着色器是不是只有顶点信息-法线这些如何获取" aria-label="Permalink to &quot;顶点着色器是不是只有顶点信息？法线这些如何获取？&quot;">​</a></h2><p>不是的，除了顶点信息，顶点着色器还可以访问其他类型的数据，如：法线、纹理坐标等。</p><h2 id="webgl的渲染管线它的流程是怎样的" tabindex="-1">webgl的渲染管线它的流程是怎样的？ <a class="header-anchor" href="#webgl的渲染管线它的流程是怎样的" aria-label="Permalink to &quot;webgl的渲染管线它的流程是怎样的？&quot;">​</a></h2><ul><li>顶点着色器阶段（Vertex Shader Stage）：在这个阶段，输入的顶点数据会被处理。顶点着色器会对每个顶点执行一系列运算，例如计算变换后的顶点位置、法线、纹理坐标等等。这个阶段的输出会被送到下一个阶段进行处理。</li><li>图元装配阶段（Primitive Assembly Stage）：这个阶段会将顶点着色器输出的顶点连接起来，形成几何图形，例如点、线段、三角形等。这个阶段的输出会被送到下一个阶段进行处理。</li><li>光栅化阶段（Rasterization Stage）：在这个阶段，图元会被分解成一组更小的像素，也就是所谓的片元（fragment）。每个片元都有自己的属性，例如颜色、深度值等，这些属性会根据光栅化的结果进行计算。</li><li>片元着色器阶段（Fragment Shader Stage）：在这个阶段，片元的属性会被处理。片元着色器会执行一系列运算，例如计算最终的颜色、混合多个纹理、进行雾效处理等等。这个阶段的输出会被送到下一个阶段进行处理。</li><li>输出合并阶段（Output Merging Stage）：在这个阶段，所有的片元会被送入帧缓冲区，最终生成显示在屏幕上的图像。 需要注意的是，以上只是一个通用的渲染管线流程，具体的实现可能会有所不同。此外，不同的WebGL API版本可能也会有一些差异。</li></ul><h2 id="gltf格式的数据格式是怎样的-如何优化" tabindex="-1">gltf格式的数据格式是怎样的？如何优化？ <a class="header-anchor" href="#gltf格式的数据格式是怎样的-如何优化" aria-label="Permalink to &quot;gltf格式的数据格式是怎样的？如何优化？&quot;">​</a></h2><h2 id="node的子进程有哪些方法" tabindex="-1">Node的子进程有哪些方法？ <a class="header-anchor" href="#node的子进程有哪些方法" aria-label="Permalink to &quot;Node的子进程有哪些方法？&quot;">​</a></h2><p>Node 提供了 child_process 模块来创建子进程，方法有：</p><p>exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式一次性返回。exec方法会从子进程中返回一个完整的buffer。默认情况下，这个buffer的大小应该是200k。如果子进程返回的数据大小超过了200k，程序将会崩溃，同时显示错误信息“Error：maxBuffer exceeded”。你可以通过在exec的可选项中设置一个更大的buffer体积来解决这个问题，但是你不应该这样做，因为exec本来就不是用来返回很多数据的方法。</p><p>spawn - child_process.spawn 使用指定的命令行参数创建新进程。spawn 会返回一个带有stdout和stderr流的对象。你可以通过stdout流来读取子进程返回给Node.js的数据。stdout拥有’data’,’end’以及一般流所具有的事件。当你想要子进程返回大量数据给Node时，比如说图像处理，读取二进制数据等等，你最好使用spawn方法。</p><p>fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork(‘./son.js’) 相当于 spawn(‘node’, [‘./son.js’]) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。</p><h2 id="字节外包面试" tabindex="-1">字节外包面试 <a class="header-anchor" href="#字节外包面试" aria-label="Permalink to &quot;字节外包面试&quot;">​</a></h2><p>如何快速通过debugger的方式去找到某种效果的实现方式？ 带着问题去调试，在调试的过程看源码</p><ul><li>如何实现一个函数继承另一个函数</li><li>如何用promise基于一个方法封装callback函数,封装成.then的方式访问数据</li><li>如何实现数组去重，es5和es6分别怎么实现，es5实现的算法时间复杂度和空间复杂度是多少</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 我的答案:</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> aa </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">arr</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">let</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newArr</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> []</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">arr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">forEach</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">item</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">index</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newArr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">findIndex</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">item</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">index</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">-</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">            </span><span style="color:#A6ACCD;">newArr</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">item</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">newArr</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><ul><li>鼠标点击焦点，我这边点击，你那边会同步显示谁点击在什么位置，这个效果是如何实现的？</li><li>vue模板编译成AST后，最后又变成了什么形式，最终在浏览器中渲染成了html</li></ul>`,16),p=[o];function t(r,c,i,y,F,d){return a(),l("div",null,p)}const h=s(e,[["render",t]]);export{A as __pageData,h as default};
