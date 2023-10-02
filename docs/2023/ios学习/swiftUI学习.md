# swiftUI开发

创建项目后修改项目`General`中的`Minimum Deployments`版本为`ios 15.0`

## Xcode中的快捷键
```ts
ctrl + i // 将所有代码进行缩进，类似代码格式化
command + n // 新建文件
command + alt + 左箭头 // 代码折叠
command + alt + 右箭头 // 代码展开
```

## 简单布局
修饰符的先后顺序很重要，设置不同的修饰符顺序会得到不同的效果

```swift
// VStack: 布局容器，可以让Text和Image各占一行显示，类似flex布局中
// 水平排列布局 HStack 和 垂直排列布局 VStack
// horizontal: 水平的
// vertical: 垂直的

VStack(alignment: .leading, spacing: 8.0, content: {
    // 文字左对齐、限制行数为1
    Text("Build an ios ").font(.largeTitle).fontWeight(.bold).multilineTextAlignment(.leading).lineLimit(1)
    // 必须添加.resizable()作为Image之后的第一个修饰符，其他修饰符才能生效
    Image("avator").resizable().frame(width: 26, height: 26)
    Text("wakk").multilineTextAlignment(.leading).lineLimit(1)
})
.frame(height: 200)
// .padding(.all, 60.0)
.padding(.top, 60.0)
.background(Color.blue)
.cornerRadius(10)
.shadow(radius: 20)
```

## 将Text中的文字改为大写
```swift
Text("afddsadfdsf".uppercased())
```

## 设置阴影
```swift
.shadow(color: Color.red.opacity(0.5), radius: 20, x: 10, y: 20)
```

## 设置背景图片
```swift
.frame(height: 200)
.padding(.top, 60.0)
.background(.ultraThinMaterial) // 最薄的材料
.cornerRadius(10)
.shadow(color: Color.red.opacity(0.5), radius: 20, x: 10, y: 20)
// 设置背景图片并设置图片偏移
.background(Image("avator").resizable().frame(width: 400, height: 400).offset(x: 20, y: 20))
```

## 设置覆盖
```swift
.overlay(
    Image("img1").resizable().aspectRatio(contentMode: .fit).frame(height: 200).offset(x: 160, y: -100)
)
```

## 文字的颜色渐变
```swift
Text("afddsadfdsf")
    .foregroundStyle(.linearGradient(colors: [.red, .blue], startPoint: .topLeading, endPoint: .bottomTrailing))

// 渐变颜色设置透明度
.foregroundStyle(.linearGradient(colors: [.primary.opacity(0.5), .blue], startPoint: .topLeading, endPoint: .bottomTrailing))
```

## 遮罩
使用`cornerRadius`会将超出的内容隐藏。
```swift
// 设置Capsule胶囊和透明度
.mask(Capsule().frame(width: 100, height: 40).opacity(0.6))
```

## 自定义修饰符以及获取系统中的白天黑夜模式
```swift
// 新建Styles来配置自定义修饰符的内容
import SwiftUI

struct StrokeStyle: ViewModifier {
    var cornerRadius: CGFloat
    @Environment(\.colorScheme) var colorScheme // 获取app的白天黑夜模型状态
    
    func body(content: Content) -> some View {
        content.overlay(
            RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                .stroke(
                    .linearGradient(
                        colors: [
                            .white.opacity(colorScheme == .dark ? 0.6 : 0.3), // 根据白天黑夜模式设置不同的效果
                            .black.opacity(0.1)
                        ], startPoint: .top, endPoint: .bottom)
                )
                .blendMode(.overlay)
        )
    }
}

extension View {
    func strokeStyle(cornerRadius: CGFloat = 30) -> some View {
        // StrokeStyle(cornerRadius: cornerRadius) :创建StrokeStyle实例时指定了一个参数： cornerRadius, 它表示描边的圆角半径
        modifier(StrokeStyle(cornerRadius: cornerRadius)) // 定义一个描边样式，并将其应用于视图或形状
    }
}

// 使用自定义修饰符
.strokeStyle(cornerRadius: 60.0)
.strokeStyle()
```

## NavigationView、List的使用
```swift
NavigationView {
    List(0 ..< 5) {item in
            Text("Settings")
            .listRowSeparatorTint(.blue)
            .listRowSeparator(.hidden)
        Section {
            Text("Settings")
            Text("Billing")
            Text("Help")
        }
        .listRowSeparatorTint(.red) // Separator: 分隔符  tint: 色彩
        .listRowSeparator(.automatic)
    }
    .listStyle(.insetGrouped)
    .navigationTitle("Account")
}
```

## sf symbols 图标库
去官网下载[sf symbols](https://developer.apple.com/sf-symbols/)
```swift
Image(systemName: "person.crop.circle.fill.badge.checkmark")
    .symbolVariant(.circle.fill) // symbol: 符号   variant: 变体  这个修饰符代表使用sf符号的某个变体
    .font(.system(size: 32))
    .symbolRenderingMode(.palette)
    .foregroundStyle(.blue, .blue.opacity(0.3))
    .padding()
    .background(Circle().fill(.ultraThinMaterial))
    .background(
        Image(systemName: "hexagon")
            .symbolVariant(.fill)
            .foregroundColor(.blue)
            .font(.system(size: 200))
            .offset(x: -50, y: -100)
    )

Label("Settings", systemImage: "gear")
Label("Billing", systemImage: "creditcard")
Label("Help", systemImage: "questionmark")
```

## 导航 NavigationLink
```swift
// 使用方式一：
NavigationLink(destination: ContentView()) {
    Label("Settings", systemImage: "gear")
}
// 使用方式二：
NavigationLink {
    ContentView()
} label: {
    Label("Billing", systemImage: "creditcard")
}

NavigationLink {
    Text("请说出你的疑问")
} label: {
    Label("Help", systemImage: "questionmark")
}
```

```swift
// 跳转到外链
Section {
    Link(destination: URL(string: "https://www.baidu.com")!) {
        HStack {
            Label("Website", systemImage: "house")
            Spacer() // 垫片
            Image(systemName: "link")
                .foregroundColor(.secondary)
        }
    }
    Link(destination: URL(string: "https://www.baidu.com")!) {
        HStack {
            Label("Website", systemImage: "house")
            Spacer()
            Image(systemName: "link")
                .foregroundColor(.secondary)
        }
    }
}
```

## Swipe Actions 左滑右滑响应
```swift
Link(destination: URL(string: "https://www.baidu.com")!) {
    HStack {
        Label("Website", systemImage: "house")
        Spacer() // 垫片
        Image(systemName: "link")
            .foregroundColor(.secondary)
    }
}
.swipeActions(edge: .leading, allowsFullSwipe: true) {
    Button(action: { isDeleted = true }) {
        Label("Delete", systemImage: "trash")
    }
    .tint(.red)
    
    Button {} label: {
        Label("Pin", systemImage: "pin")
    }
    .tint(.yellow)
    
}
.swipeActions(edge: .trailing, allowsFullSwipe: false) {
    Button(action: { isDeleted = true }) {
        Label("Delete", systemImage: "trash")
    }
    .tint(.gray)
    
    Button(action: { print("点击了") }) {
        Label("Pin", systemImage: "pin")
    }
    .tint(.blue)
}
```

## structure 将代码封装成component
思想和前端的组件封装一样
```swift
NavigationView {
    List(0 ..< 5) { item in
        header // 组件
        list
        outlink
    }
    .listStyle(.insetGrouped)
    .navigationTitle("Account")
}


var header: some View {
    VStack {
        Image(systemName: "person.crop.circle.fill.badge.checkmark")
        Text("huang chao")
            .font(.title.weight(.semibold))
        HStack {
            Image(systemName: "location")
                .imageScale(.large)
                .font(.system(size: 36))
            Text("China")
                .foregroundColor(.secondary)
        }
    }
    .frame(maxWidth: .infinity)
}
```

## canvas画布
将svg转换为canvas绘制，可以减小资源文件的大小
```swift
Canvas {
    context, size in
    context.draw(Text("DesignCode"), at: CGPoint(x: 120, y: 20))
    // canvas中绘制圆
    context.fill(Path(ellipseIn: CGRect(x: 40, y: 30, width: 200, height: 200)), with: .color(.pink))
    // canvas中绘制图片
    context.draw(Image("avator"), in: CGRect(x: 40, y: 300, width: 200, height: 200))
    // canvas中绘制sf图标
    context.draw(Image(systemName: "hexagon.fill"), in: CGRect(x: 60, y: 500, width: 200, height: 200))
    // 绘制过程中使用canvas本身的尺寸信息做不同屏幕的自适应
    // context.draw(Image(systemName: "hexagon.fill"), in: CGRect(x: 0, y: 0, width: size.width, height: size.height))
}
.frame(width: 400, height: 600)
.foregroundStyle(.linearGradient(colors: [.pink, .blue], startPoint: .topLeading, endPoint: .bottomTrailing))
```

## canvas动画
```swift
struct CanvasView: View {
    @State var appear = false
    
    var body: some View {
        TimelineView(.animation) { timeline in
            // now是获取的当前时间的毫秒数
            let now = timeline.date.timeIntervalSinceReferenceDate
            
            // now.remainder(dividingBy: 3): 得到的是一个区间在[-1.5, 1.5]之间的数
            // Angle.degrees: 将数值转化为度数
            let angle = Angle.degrees(now.remainder(dividingBy: 3) * 60)
            let x = cos(angle.radians)
            
            let angle2 = Angle.degrees(now.remainder(dividingBy: 6) * 10)
            let x2 = cos(angle2.radians)
            // Text("value\(x), \(x2), \(now.remainder(dividingBy: 3))")
            
            Canvas { context, size in
                context.fill(path(in: CGRect(x: 0, y: 0, width: size.width, height: size.height), x: x, x2: x2), with: .linearGradient(Gradient(colors: [.pink, .blue]), startPoint: CGPoint(x: 0, y: 0), endPoint: CGPoint(x: 200, y: 200)))
            }
            .frame(width: 200, height: 207)
            .rotationEffect(.degrees(appear ? 360 : 0))
        }
        .onAppear {
            withAnimation(.linear(duration: 10).repeatForever(autoreverses: true)) {
                appear = true
            }
        }
    }
    
    func path(in rect: CGRect, x: Double, x2: Double) -> Path {
        var path = Path()
        let width = rect.size.width
        let height = rect.size.height
        path.move(to: CGPoint(x: 0.9923 * width, y: 0.42593 * height))
        path.addCurve(to: CGPoint(x: 0.6355 * width * x2, y: height),
                      control1: CGPoint(x: 0.92554 * width * x2, y: 0.77749 * height * x2),
                      control2: CGPoint(x: 0.91864 * width * x2, y: height)
        )
        path.addCurve(to: CGPoint(x: 0.08995 * width, y: 0.60171 * height),
                      control1: CGPoint(x: 0.35237 * width * x, y: height),
                      control2: CGPoint(x: 0.2695 * width, y: 0.77304 * height)
        )
        path.addCurve(to: CGPoint(x: 0.34086 * width, y: 0.06324 * height * x),
                      control1: CGPoint(x: -0.0896 * width, y: 0.43038 * height),
                      control2: CGPoint(x: 0.00248 * width, y: 0.23012 * height * x)
        )
        path.addCurve(to: CGPoint(x: 0.9923 * width, y: 0.42593 * height),
                      control1: CGPoint(x: 0.67924 * width, y: -0.10364 * height * x),
                      control2: CGPoint(x: 1.05906 * width, y: 0.07436 * height * x2)
        )
        path.closeSubpath()
        return path
    }
}
```

## tabbar 组件
```swift
// 使用TabView组件
TabView {
    ContentView().tabItem {
        Image(systemName: "house")
        Text("Learn Now")
    }
    AccountView().tabItem {
        Image(systemName: "magnifyingglass")
        Text("Explore")
    }
}
```

```swift
// 使用自定义tabbar

// data
struct TabItem: Identifiable {
    var id = UUID()
    var text: String
    var icon: String
    var tab: Tab
    var color: Color
}

var tabItems = [
    TabItem(text: "Learn Now", icon: "house", tab: .home, color: .teal),
    TabItem(text: "Explore", icon: "magnifyingglass", tab: .explore, color: .blue),
    TabItem(text: "Notifications", icon: "bell", tab: .notifications, color: .red),
    TabItem(text: "Library", icon: "rectangle.stack", tab: .library, color: .pink)
]

enum Tab: String {
    case home
    case explore
    case notifications
    case library
}

// View
struct TabBar: View {
    @State var selectedTab: Tab = .home
    @State var color: Color = .teal
    
    var body: some View {
        // 使用自定义组件实现tabbar
        // ZStack组件可以使用alignment来实现对齐
        ZStack(alignment: .bottom) {

            Group {
                switch selectedTab {
                case .home:
                    ContentView()
                case .explore:
                    AccountView()
                case .notifications:
                    AccountView()
                case .library:
                    AccountView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            HStack {
                ForEach(tabItems) { item in
                    Button {
                        // 动画
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                            selectedTab = item.tab
                            color = item.color
                        }
                    } label: {
                        VStack(spacing: 0) {
                            Image(systemName: item.icon)
                                .symbolVariant(.fill)
                                .font(.body.bold())
                                .frame(width: 44, height: 29)
                            Text(item.text)
                                .font(.caption2)
                                .lineLimit(1)
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .foregroundStyle(selectedTab == item.tab ? .primary : .secondary)
                    .blendMode(selectedTab == item.tab ? .overlay : .normal) // 会将按钮和背景的融合效果显得更好
                }
            }
            .padding(.horizontal, 8)
            .padding(.top, 14)
            .frame(height: 88, alignment: .top)
            // RoundedRectangle: 可以在框架内对齐的，有圆角的矩形形状  style属性有两个值：circular(四分之一圆的圆角)、continuous(连续曲率圆角)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 34, style: .continuous))
            .background(
                HStack {
                    if selectedTab == .library { Spacer() }
                    if selectedTab == .explore { Spacer() }
                    if selectedTab == .notifications {
                        Spacer()
                        Spacer()
                    }
                    Circle().fill(color).frame(width: 80)
                    if selectedTab == .home { Spacer() }
                    if selectedTab == .explore { Spacer(); Spacer() }
                    if selectedTab == .notifications { Spacer() }
                }
                    .padding(.horizontal, 8)
            )
            .overlay(
                HStack {
                    if selectedTab == .library { Spacer() }
                    if selectedTab == .explore { Spacer() }
                    if selectedTab == .notifications {
                        Spacer()
                        Spacer()
                    }
                    
                    Rectangle()
                        .fill(color)
                        .frame(width: 28, height: 5)
                        .cornerRadius(3)
                        .frame(width: 88)
                        .frame(maxHeight: .infinity, alignment: .top)

                    if selectedTab == .home { Spacer() }
                    if selectedTab == .explore { Spacer(); Spacer() }
                    if selectedTab == .notifications { Spacer() }
                }
                    .padding(.horizontal, 8)
            )
            .strokeStyle(cornerRadius: 34)
            .frame(maxHeight: .infinity, alignment: .bottom)
            .ignoresSafeArea() // 将视图扩展到安全区域之外
        }
        
    }
}
```

## 使用GeometryReader来做tabbar的自适应处理
```swift
// data
struct TabItem: Identifiable {
    var id = UUID()
    var text: String
    var icon: String
    var tab: Tab
    var color: Color
}

var tabItems = [
    TabItem(text: "Learn Now", icon: "house", tab: .home, color: .teal),
    TabItem(text: "Explore", icon: "magnifyingglass", tab: .explore, color: .blue),
    TabItem(text: "Notifications", icon: "bell", tab: .notifications, color: .red),
    TabItem(text: "Library", icon: "rectangle.stack", tab: .library, color: .pink)
]

enum Tab: String {
    case home
    case explore
    case notifications
    case library
}

struct TabPreferenceKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}


// view
struct TabBar: View {
    @State var selectedTab: Tab = .home
    @State var color: Color = .teal
    @State var tabItemWidth: CGFloat = 0
    
    var body: some View {
        // 使用自定义组件实现tabbar
        // ZStack组件可以使用alignment来实现对齐
        ZStack(alignment: .bottom) {

            Group {
                switch selectedTab {
                case .home:
                    ContentView()
                case .explore:
                    AccountView()
                case .notifications:
                    AccountView()
                case .library:
                    AccountView()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            
            HStack {
                ForEach(tabItems) { item in
                    Button {
                        // 动画
                        withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                            selectedTab = item.tab
                            color = item.color
                        }
                    } label: {
                        VStack(spacing: 0) {
                            Image(systemName: item.icon)
                                .symbolVariant(.fill)
                                .font(.body.bold())
                                .frame(width: 44, height: 29)
                            Text(item.text)
                                .font(.caption2)
                                .lineLimit(1)
                        }
                        .frame(maxWidth: .infinity)
                    }
                    .foregroundStyle(selectedTab == item.tab ? .primary : .secondary)
                    .blendMode(selectedTab == item.tab ? .overlay : .normal) // 会将按钮和背景的融合效果显得更好
                    .overlay( // 使用overlay来使用GeometryReader获取button的宽度，来做页面的自适应
                        GeometryReader { proxy in
                            Color.clear.preference(key: TabPreferenceKey.self, value: proxy.size.width)
                        }
                    )
                    .onPreferenceChange(TabPreferenceKey.self) {
                        value in
                        tabItemWidth = value
                    }
                }
            }
            .padding(.horizontal, 8)
            .padding(.top, 14)
            .frame(height: 88, alignment: .top)
            // RoundedRectangle: 可以在框架内对齐的，有圆角的矩形形状  style属性有两个值：circular(四分之一圆的圆角)、continuous(连续曲率圆角)
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 34, style: .continuous))
            .background(
                HStack {
                    if selectedTab == .library { Spacer() }
                    if selectedTab == .explore { Spacer() }
                    if selectedTab == .notifications {
                        Spacer()
                        Spacer()
                    }
                    Circle().fill(color).frame(width: tabItemWidth)
                    if selectedTab == .home { Spacer() }
                    if selectedTab == .explore { Spacer(); Spacer() }
                    if selectedTab == .notifications { Spacer() }
                }
                    .padding(.horizontal, 8)
            )
            .overlay(
                HStack {
                    if selectedTab == .library { Spacer() }
                    if selectedTab == .explore { Spacer() }
                    if selectedTab == .notifications {
                        Spacer()
                        Spacer()
                    }
                    
                    Rectangle()
                        .fill(color)
                        .frame(width: 28, height: 5)
                        .cornerRadius(3)
                        .frame(width: tabItemWidth)
                        .frame(maxHeight: .infinity, alignment: .top)

                    if selectedTab == .home { Spacer() }
                    if selectedTab == .explore { Spacer(); Spacer() }
                    if selectedTab == .notifications { Spacer() }
                }
                    .padding(.horizontal, 8)
            )
            .strokeStyle(cornerRadius: 34)
            .frame(maxHeight: .infinity, alignment: .bottom)
            .ignoresSafeArea() // 将视图扩展到安全区域之外
        }
        
    }
}
```

## AppStorage缓存
```swift
// 只需要声明变量前使用 @AppStorage()来修饰就可以将数据保存到 AppStorage 中，读取时也是相同的操作即可
@AppStorage("selectedTab") var selectedTab: Tab = .home
```