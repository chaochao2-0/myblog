# SwiftUI进阶

## @State
在`SwiftUI`中，视图是由数据驱动的。每当视图在创建或解析时，都会为该视图和该视图中使用的状态数据之间创建一个依赖关系，每当状态的信息发生变化，有依赖关系的视图会马上翻译出这些变化并重绘。

## Swift发请求
1. 首先使用`cocoapods`安装`Alamofire`
2. 安装完以后关闭项目，打开`.xcworkspace`后缀的文件启动项目，然后出现三个报错，解决方案：
- 点击项目根路径，找到项目的`Build Settings`，搜索`sandbox`，将`Build Options`中的`User Script Sandboxing`选项设置为`NO`。然后重新编译项目即可解决问题。

```swift
struct ResponseList: Codable {
    var id: Int
    var uid: String
    var city: String
    var street_name: String
    var secondary_address: String

//    var status: Int = 0
//    var message: String?
//    struct item: Codable {
//        var id: Int
//        var name: String?
//        var headimg: String?
//        var description: String?
//    }
//    struct listPage: Codable {
//        var page: Int
//        var size: Int
//        var list: [item]?
//    }
//    var data: listPage?
}

func text () {
    //自动返回decode模型
    AF.request("https://random-data-api.com/api/address/random_address", method: .get)
    .responseDecodable {(res: AFDataResponse<ResponseList>) in
        switch res.result {
            case .failure(let error):
                print("失败了", error)
            case .success(let model):
                //返回 ResponseList 类型的对象
            print("model", model)
        }
    }
}
```

## 如何实现一个文字一行左对齐的效果？
frame属性给view提供特定空间
Text的multilineTextAlignment属性只是多行文字的一个对齐效果

SwiftUI中的组件分为：紧凑型组件和贪婪型组件
在HStack、VStack和ZStack这三种容器中，它们的宽高不是铺满屏幕的，而是根据内部元素来定

```swift
// 这里用一个空白的Color将宽度撑满，高度设置为0来撑起这个盒子，这样里面的文字可以根据alignment属性来实现左右对齐效果
VStack(alignment: .trailing) {
    Color.clear
        .frame(maxWidth: .infinity)
        .frame(height: 0)
    Text("123")
}
.border(.red, width: 1)

// 因为盒子没有撑开，后续即使给盒子增加了宽度，文字也始终无法实现对齐效果，始终都是居中效果
VStack(alignment: .leading) {
    Text("123")
}
.border(.red, width: 1)
.frame(maxWidth: .infinity)
.background(.gray)

// 用垫片实现左右对齐
HStack {
    Text("123")
    Spacer()
    Text("123")
}
```


```swift
// 左边文字和右边蚊子对齐的布局效果
HStack {
    VStack(alignment: .trailing) {
        Text("Username")
        Text("Email")
        Text("Phone")
    }
    .font(.system(size: 35, weight: .bold))
    
    VStack(alignment: .leading) {
        Text("Jack").frame(maxHeight: .infinity)
        Text("jack@mail.com").frame(maxHeight: .infinity)
        Text("4001234656").frame(maxHeight: .infinity)
    }
    .font(.system(size: 25))
}
.fixedSize()
```
在布局中还可以使用垫片来灵活布局

## 复选框控件的封装和使用
```swift
// 封装
struct CheckBoxStyle: ToggleStyle {
    enum CheckBoxShape: String {
        case circle
        case square
    }
    let shape: CheckBoxShape
    
    init (shape: CheckBoxShape = .circle) {
        self.shape = shape
    }
    func makeBody(configuration: Configuration) -> some View {
        let systemName: String = configuration.isOn ? "checkmark.\(shape.rawValue).fill" : shape.rawValue
        HStack (spacing: 10) {
            configuration.label
                .font(.system(size: 20))
                .foregroundColor(.blue)
            Button {
                configuration.isOn.toggle()
            } label: {
                Image(systemName: systemName)
                    .resizable()
                    .frame(width: 30, height: 30)
            }
        }
    }
}

// 使用
Toggle("开关1", isOn: $remberPassword)
Toggle("开关1", isOn: $remberPassword)
    .toggleStyle(CheckBoxStyle(shape: .circle))
Toggle("开关2", isOn: $remberPassword)
    .toggleStyle(CheckBoxStyle(shape: .square))
```

## 页面之间的跳转
```swift
// 方法一： NavigationView
NavigationView {
    NavigationLink(isActive: $jumpToLogin) {
        LoginView()
    } label: {
        VStack {
            Text("想不到吧，这才是主界面")
            Text("Hello World\(str)")
        }
        .foregroundColor(.black)
    }
}
.navigationBarBackButtonHidden(true) // 隐藏系统的导航返回按钮
.navigationBarItems(leading: Button(action: { // 自定义导航的返回按钮
    presentationMode.wrappedValue.dismiss() // 返回上级页面
}, label: {
    Image(systemName: "pencil.circle") // 导航返回按钮图标
}))

Button {
    jumpToLogin = true
} label: {
    Text("按钮点击跳转")
}

// 方法二：模态跳转
NavigationView {
    VStack {
        Text("想不到吧，这才是主界面")
        Text("Hello World\(str)")
    }
    .foregroundColor(.black)
}
.sheet(isPresented: $jumpToLogin, content: {
    LoginView()
})

// 方法三： 全屏跳转
NavigationView {
    VStack {
        Text("想不到吧，这才是主界面")
        Text("Hello World\(str)")
    }
    .foregroundColor(.black)
}
.fullScreenCover(isPresented: $jumpToLogin, content: {
    LoginView()
})
```

## 闭包

[闭包学习](https://blog.csdn.net/qq_36924683/article/details/116896031)

枚举或结构体的方法如果会修改self，则必须以`mutaing`声明修饰符标记。

```swift
// 在闭包中修改和使用外部的变量和值
var count = 0
mutating func doSomething() {
    { (x: Int) in
        self.count = 2 // 在闭包中修改和使用外部的变量和值
        print("count: \(count)")
    }(10)
}
```

```swift
// 将函数作为参数传递使用
func doSomething(callback: (String) -> Void) {
    let result = "Hello, World!"
    callback(result)
}
func printResult(result: String) {
    print(result)
}

doSomething(callback: printResult)
```
逃逸闭包不可修改`self`这个参数
当`self`是结构体或枚举实例时，逃逸闭包不能捕获`self`
如果`self`是一个类的实例，则逃逸闭包能铺货`self`
如果只是普通闭包则能铺货所有类型的`self`

在页面的`init`方法中，不能修改上面定义的`@State`数据，必须在`body`中修改

```swift
// 异步调用请求
import SwiftUI

struct LoginView: View {
    @State private var isLoading = false
    @State private var data = ""

    var body: some View {
        VStack {
            Text(data)
                .padding()
            Button("Fetch Data") {
                Task {
                    isLoading = true
                    let result = await fetchData()
                    print("result: \(result)")
                    data = result
                    isLoading = false
                }
            }
            .disabled(isLoading)
            .padding()
        }
    }

    func fetchData() async -> String {
        let url = URL(string: "https://random-data-api.com/api/address/random_address")!
        let (data, _) = try! await URLSession.shared.data(from: url)
        return String(data: data, encoding: .utf8)!
    }
}
```

## 将字符串转为对象
```swift
struct Person: Codable {
    let name: String
    let age: Int
}

let jsonString = "{\"name\":\"Alice\",\"age\":20}"
if let data = jsonString.data(using: .utf8) {
    if let person = try? JSONDecoder().decode(Person.self, from: data) {
        print("name: \(person.name), age: \(person.age)")
    }
}
```

## 使用async/await发请求
```swift
func fetchData() async -> String {
    let url = URL(string: "https://random-data-api.com/api/address/random_address")!
    let (data, _) = try! await URLSession.shared.data(from: url)
    return String(data: data, encoding: .utf8)!
}

Button("Fetch Data") {
    Task {
        isLoading = true
        let result = await fetchData()
        print("result: \(result)")
        data = result
        isLoading = false
    }
}
```