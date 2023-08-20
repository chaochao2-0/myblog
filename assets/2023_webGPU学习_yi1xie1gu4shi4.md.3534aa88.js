import{_ as e,o as a,c as t,V as o}from"./chunks/framework.c5c8a48b.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"2023/webGPU学习/yi1xie1gu4shi4.md","filePath":"2023/webGPU学习/yi1xie1gu4shi4.md","lastUpdated":null}'),r={name:"2023/webGPU学习/yi1xie1gu4shi4.md"},c=o('<h2 id="今天给勇哥发了下面的一段话" tabindex="-1">今天给勇哥发了下面的一段话 <a class="header-anchor" href="#今天给勇哥发了下面的一段话" aria-label="Permalink to &quot;今天给勇哥发了下面的一段话&quot;">​</a></h2><p>勇哥，和你聊一聊我们cad目前的一个现状，cad目前的研发工作已经比较难在短时间内有一个阶段性的进展。尤其是后面的二三维图模融合，需要提取cad图纸中的图元数据，选中图元，并根据所选图元来调用ourbim现有的功能去做三维模型的构件选中和高亮。实现思路是清晰的，难点是：我们现在的技术方案它做不了一个高性能的一个渲染。具体原因可能是：three.js它本身是一个三维的技术框架，用它来做二维可能会带来一些额外的性能开销，而在一个稍微大一点的cad图纸中，有好几万图元数据的情况下，只要每个图元的渲染都多上一点点性能开销，总体呈现的流畅效果都会相差很大。前段时间我们的cad就是从图纸卡顿一步步优化过来的：图纸加载时间太长就做文件切割、gzip压缩；图元数据量太多会卡顿就根据图层来合模，把所有相同图层的图元的点线面数据进行合模处理成一个大图元来渲染，即使是这样的合模方法，我们的cad也没有彻底解决图纸的卡顿问题，也还是做不到bimface那样的流畅操作，根据图元来合模肯定会让cad的卡顿问题回到从前。我也看了bimface的cad渲染，他们是自己基于webgl写了一套自己的渲染，没有用three.js。所以后面的图模融合，要做到好的一个效果，我们也要走和他们一样的路：我们需要自己用底层来写一套渲染逻辑。好消息是：webgpu已经出来了，我们可以用webgpu来做底层渲染，如果处理的好，这会比webgl性能更好。我这边已经开始在进行webgpu的相关学习，后面我也会慢慢用webgpu来重写cad的一个渲染层，但这个过程就和我一开始接触做cad一样，有很多的未知和挑战，也会带来试错成本，我只能保证我一定尽全力来做好，但也实在不好意思吹牛说我能保证结果。</p><p>关于cad方向上的一些想法：前几天看到一个视频，了解到photoshop开始在基于webgpu来做网页版的开发了，或许我们也可以尝试把cad做成一个网页版的autoCAD。畅想一下：用户可以在我们的平台上上传图纸，上传以后，用户可以很方便的在我们的网页上打开图纸并进行二次开发。甚至我们可以把一些用户常用的图元数据保存下来，形成一个用户个性化的图元库，一键拖拽即可实现常用图元的绘制，和我们现在ourbim的资源库一样方便。再甚至我们可以对一些最常用的cad图元做3d的建模，用户如果是在我们的平台通过拖拽图元库中的图元来从零设计图纸，设计完以后可以一键生成对应的3d模型并自动构建好二三维的联动逻辑，让用户可以很便捷的在cad里面做到二三维联动。而不需要像：事先准备好二维图纸和三维模型，再让我们手动添加二三维的联动逻辑这样麻烦。我们还可以根据用户上传的图纸，提取出来图元数据并配合AI来做一些事情。</p><h2 id="他回复我说" tabindex="-1">他回复我说 <a class="header-anchor" href="#他回复我说" aria-label="Permalink to &quot;他回复我说&quot;">​</a></h2><p>1、这个WebGPU会不会不太成熟，造成有很多坑？ 2、webgl重写底层渲染，和基于ThreeJS修改，本质的区别是什么，是否已经找到了性能问题的本质了？ 3、图纸的数据体量，相比三维几何，一般来说要小1-2个数量级，用webgpu是不是有些大材小用？ 4、所讲的这些未来可以拓展的功能，是非常好的，也是必然会涉及到的，其实类似的产品，我了解云端autodcad几年前就有了。 <a href="https://www.autodesk.com/solutions/cloud-based-online-cad-software" target="_blank" rel="noreferrer">https://www.autodesk.com/solutions/cloud-based-online-cad-software</a><a href="https://www.crowncad.com/#/" target="_blank" rel="noreferrer">https://www.crowncad.com/#/</a> 5、至于这种二三维联动，我们目前CAD和BIM是两套独立的架构，不是统一的，会比全部webgl实现的统一架构，要复杂得多，需要有个连接和转换层，可行性还待研究。</p><p>我无法回答他webgl重写底层渲染和基于ThreeJS修改本质的区别是什么，希望我以后可以回答出来这个问题的答案！</p>',6),d=[c];function s(i,n,l,p,h,u){return a(),t("div",null,d)}const b=e(r,[["render",s]]);export{_ as __pageData,b as default};
