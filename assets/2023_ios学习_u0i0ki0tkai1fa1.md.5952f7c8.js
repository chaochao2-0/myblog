import{_ as s,o as a,c as n,V as l}from"./chunks/framework.c5c8a48b.js";const C=JSON.parse('{"title":"UIKit开发","description":"","frontmatter":{},"headers":[],"relativePath":"2023/ios学习/u0i0ki0tkai1fa1.md","filePath":"2023/ios学习/u0i0ki0tkai1fa1.md","lastUpdated":null}'),o={name:"2023/ios学习/u0i0ki0tkai1fa1.md"},e=l(`<h1 id="uikit开发" tabindex="-1">UIKit开发 <a class="header-anchor" href="#uikit开发" aria-label="Permalink to &quot;UIKit开发&quot;">​</a></h1><h2 id="创建项目" tabindex="-1">创建项目 <a class="header-anchor" href="#创建项目" aria-label="Permalink to &quot;创建项目&quot;">​</a></h2><ul><li>使用<code>Xcode</code>创建项目，选择<code>ios</code>和<code>app</code>开发</li><li><code>Interface</code>选择<code>Storyboard</code>即<code>UIKit</code></li><li>然后项目就创建成功了</li><li>打开<code>ViewController</code>编辑<code>viewDidLoad</code>函数，新增如下代码：</li></ul><div class="language-swift"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 修改打开的第一个页面的颜色</span></span>
<span class="line"><span style="color:#A6ACCD;">view.backgroundColor </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> .systemRed</span></span></code></pre></div><p>这样，<code>app</code>首次打开的<code>ViewController</code>页面的背景颜色就被修改成了红色</p><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h2><p>—— test-demo —— AppDelegate —— SceneDelegate —— ViewController: —— Main —— Assets —— LaunchScreen —— test_demo —— Info —— test_demo</p><h2 id="基础组件的使用" tabindex="-1">基础组件的使用 <a class="header-anchor" href="#基础组件的使用" aria-label="Permalink to &quot;基础组件的使用&quot;">​</a></h2><p><code>UILabel</code>组件的使用：</p><div class="language-swift"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">UIKit</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ViewController</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> UIViewController </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F78C6C;">var</span><span style="color:#A6ACCD;"> myLabel: UILabel</span><span style="color:#89DDFF;">!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">viewDidLoad</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        super.</span><span style="color:#82AAFF;">viewDidLoad</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 修改打开的第一个页面的颜色</span></span>
<span class="line"><span style="color:#A6ACCD;">        view.backgroundColor </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> .systemRed</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 创建实例</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">UILabel</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.translatesAutoresizingMaskIntoConstraints </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.font </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> UIFont.</span><span style="color:#82AAFF;">systemFont</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">ofSize</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">24</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// 字号</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.text </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello World</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.numberOfLines </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.textAlignment </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> .left</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 给UILabel设置点击事件</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.isUserInteractionEnabled </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 这里有#selector，对应的userDidTapLabel方法要加上@objc，便于OC的代码调用能找到swift的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F78C6C;">let</span><span style="color:#A6ACCD;"> tapGesture </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">UITapGestureRecognizer</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">target</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> self, </span><span style="color:#82AAFF;">action</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">#selector</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">userDidTapLabel</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">tapGestureRecognizer:</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">))</span></span>
<span class="line"><span style="color:#A6ACCD;">        myLabel.</span><span style="color:#82AAFF;">addGestureRecognizer</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">tapGesture</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 添加到view中</span></span>
<span class="line"><span style="color:#A6ACCD;">        view.</span><span style="color:#82AAFF;">addSubview</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">myLabel</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 设置约束</span></span>
<span class="line"><span style="color:#A6ACCD;">        NSLayoutConstraint.</span><span style="color:#82AAFF;">activate</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">[</span></span>
<span class="line"><span style="color:#A6ACCD;">            myLabel.topAnchor.</span><span style="color:#82AAFF;">constraint</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">equalTo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> view.layoutMarginsGuide.topAnchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">            myLabel.trailingAnchor.</span><span style="color:#82AAFF;">constraint</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">equalTo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> view.layoutMarginsGuide.trailingAnchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">@</span><span style="color:#C792EA;">objc</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">func</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">userDidTapLabel</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">tapGestureRecognizer</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">_</span><span style="color:#A6ACCD;">: UITapGestureRecognizer</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">label clicked!</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="页面的布局" tabindex="-1">页面的布局 <a class="header-anchor" href="#页面的布局" aria-label="Permalink to &quot;页面的布局&quot;">​</a></h2><p><code>view.layoutMarginsGuide</code>是在<code>ios</code>中用于指代视图的内边距区域的一个特殊属性。内边距区域是视图内容与视图边缘之间的空白区域。</p><div class="language-swift"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    \`view.layoutMarginsGuide\`包括以下四个属性：</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    view.layoutMarginsGuide.leadingAnchor: 内边距区域的左侧边缘</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    view.layoutMarginsGuide.trailingAnchor: 内边距区域的右侧边缘</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    view.layoutMarginsGuide.topAnchor: 内边距区域的顶部边缘</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    view.layoutMarginsGuide.bottomAnchor: 内边距区域的底部边缘</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    这些属性可以用来创建约束，以确保视图的子视图与内边距之间保持一定的间距，从而避免内容紧贴到视图的边缘。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    通常情况下，内边距区域的大小可以通过视图的 layoutMargins 属性来设置，或者在 Interface Builder 中进行配置。开发者可以自定义这些内边距，以满足特定的界面设计需求。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">    总之，view.layoutMarginsGuide是一个有助于创建视图布局约束并考虑内边距的便捷工具，以确保用户界面在不同设备和屏幕尺寸下都能正确呈现。</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 设置约束</span></span>
<span class="line"><span style="color:#A6ACCD;">NSLayoutConstraint.</span><span style="color:#82AAFF;">activate</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">[</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// myLabel的顶部和view.layoutMarginsGuide的顶部对齐</span></span>
<span class="line"><span style="color:#A6ACCD;">    myLabel.topAnchor.</span><span style="color:#82AAFF;">constraint</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">equalTo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> view.layoutMarginsGuide.topAnchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// myLabel的左侧和view.layoutMarginsGuide的左侧对齐</span></span>
<span class="line"><span style="color:#A6ACCD;">    myLabel.leadingAnchor.</span><span style="color:#82AAFF;">constraint</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">equalTo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> view.layoutMarginsGuide.leadingAnchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 上下左右居中</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// submitButton的y轴中心和view.layoutMarginsGuide的y轴中心对齐</span></span>
<span class="line"><span style="color:#A6ACCD;">    submitButton.centerYAnchor.</span><span style="color:#82AAFF;">constraint</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">equalTo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> view.layoutMarginsGuide.centerYAnchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    submitButton.centerXAnchor.</span><span style="color:#82AAFF;">constraint</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">equalTo</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> view.layoutMarginsGuide.centerXAnchor</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">]</span><span style="color:#89DDFF;">)</span></span></code></pre></div><h2 id="多个页面之间的跳转" tabindex="-1">多个页面之间的跳转 <a class="header-anchor" href="#多个页面之间的跳转" aria-label="Permalink to &quot;多个页面之间的跳转&quot;">​</a></h2><div class="language-swift"><button title="Copy Code" class="copy"></button><span class="lang">swift</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 跳转项目列表</span></span>
<span class="line"><span style="color:#F78C6C;">let</span><span style="color:#A6ACCD;"> controller </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ProjectController</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#A6ACCD;">controller.modalPresentationStyle </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> .fullScreen</span></span>
<span class="line"><span style="color:#A6ACCD;">self.</span><span style="color:#82AAFF;">present</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">controller,</span><span style="color:#82AAFF;">animated</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">)</span></span></code></pre></div><h2 id="view-controller" tabindex="-1">View Controller <a class="header-anchor" href="#view-controller" aria-label="Permalink to &quot;View Controller&quot;">​</a></h2><p><code>ios</code>中的<code>View Controller</code>，它负责用户界面的展示，有一些生命周期的回调函数，还和界面切换相关，一个<code>app</code>中可以有一个或多个<code>ViewController</code>。</p><p>每一个<code>ViewController</code>都有一个<code>single root view</code>，包含此<code>ViewController</code>的所有内容，在页面上的所有<code>View</code>都会被加入到以这个<code>root view</code>为根的树形结构中去。</p><p><code>ViewController</code>有一个<code>view</code>属性，代表最后返回的页面 <code>ViewController</code>拥有所有的<code>View</code>，管理和这些<code>View</code>相关的交互，是离用户最近的第一层代码。</p><h2 id="动态库和静态库" tabindex="-1">动态库和静态库 <a class="header-anchor" href="#动态库和静态库" aria-label="Permalink to &quot;动态库和静态库&quot;">​</a></h2><p>对于静态库而言，在编译链接的时候，会将静态库的所有文件都添加到目标app可执行文件中，并在程序运行之后，静态库与app可执行文件一起被加载到同一块代码区中。 对于动态库而言，在编译链接的时候，只会将动态库被引用的头文件添加到目标app可执行文件，区别于静态库，动态库是在程序运行的时候被添加另外一块内存区域。</p><p>相比于动态库的方案，使用静态库将花费更多的启动时间和内存消耗。还会增加可执行文件的大小。</p><ul><li>对于静态库的后缀名是<code>.a</code>，从<code>libsqlite3.dylib</code>这里我们可以知道<code>.dylib</code>就是动态库的文件的后缀名。细心的朋友发现了，从<code>Xcode7</code>我们再导入系统提供的动态库的时候，不再有<code>.dylib</code>，取而代之的是<code>.tbd</code>。而<code>.tbd</code>其实是一个<code>YAML</code>文本文件，描述了需要链接的动态库的信息。主要目的是为了减少<code>app</code>的下载大小</li><li><code>a</code>是一个纯二进制文件，不能直接拿来使用，需要配合头文件、资源文件一起使用。在<code>ios</code>中是作为静态库的文件名后缀。</li><li>相比较与静态库和动态库，动态库在包体积、启动时间还有内存占比上都是很有优势的。</li><li>为了解决<code>.a</code>的文件不能直接用，还要配备<code>.h</code>和资源文件，苹果推出了一个叫做<code>.framework</code>的东西，而且还支持动态库。</li></ul><p>服务端会用秋全的app.js判断视频流的请求对象是移动端、PC, 然后ue用来区分显示摇杆 app.js是否是根据设备UA来进行判断？AR的webView打开视频流是否改变了ipad的UA信息？</p>`,24),p=[e];function t(c,r,i,y,A,D){return a(),n("div",null,p)}const d=s(o,[["render",t]]);export{C as __pageData,d as default};
