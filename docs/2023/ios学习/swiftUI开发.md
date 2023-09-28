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
// 垂直排列布局HStack和水平排列布局行VStack

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
        modifier(StrokeStyle(cornerRadius: cornerRadius))
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
    .symbolVariant(.circle.fill)
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