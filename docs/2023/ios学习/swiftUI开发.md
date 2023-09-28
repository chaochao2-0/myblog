# swiftUI开发

创建项目后修改项目`General`中的`Minimum Deployments`版本为`ios 15.0`

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