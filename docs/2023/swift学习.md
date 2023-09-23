# swift学习

## Hello World
```swift
print("Hello, world!")
```

## 基本数据类型
Double、Float、String、Int、Bool、Array、Set、Dictionary

## 常量和普通变量
使用`let`来声明常量，使用`var`来声明变量。当你通过一个值来声明变量和常量时，编译器会自动推断其类型。
字符串必须使用双引号，不能使用单引号。

值永远不会被隐式转换为其他类型，需要显示进行类型转换：
```swift
let aa = 123
let bb = "234"
print(bb + String(aa)) // 类型转换为String
print(bb + "\(aa)") // 使用\()将数值转换为String类型

let pi = Double(three)
let integerPi = Int(pi)
```

## 数组和字典
swift中的字典可以理解为：json格式的对象

```swift
// 创建空数组和空字典时必须指定类型
let emptyArray: [String] = []
let emptyDictionary: [String: Float] = [:]

var aa = [1,2,3]
aa.append(4) // 数组在添加元素时会自动变大
var bb = ["name": "zhangsan", "age": "cesrf"]
print(bb)
print(aa)
```

## 元组
元组把多个值组合成一个复合值。元组内的值可以是任意类型，并不要求是相同类型。
```swift
// http404Error的类型是(Int, String)，值是(404, "Not Found")
let http404Error = (404, "Not Found")

// 元组的分解
let (statusCode, statusMessage) = http404Error
// 如果只需要一部分元组值，分解的时候可以把要忽略的部分用下划线(_)标记
let (justTheStatusCode, _) = http404Error
// 也可以通过下标来访问元组中的单个元素，下标从零开始
print(http404Error.0)

// 还可以在定义元组的时候给单个元素命名
let http200Status = (statusCode: 200, description: "OK")
print(http200Status.statusCode)
// 给元组单个元素命名后，依然可以对元组进行分解和下标访问
let (aa, bb) = http200Status
print(aa)
print(http200Status.0)
```


## 控制流
使用`if`和`switch`来进行条件操作，使用`for-in`、`while`和`repeat-while`来进行循环。包裹条件和循环变量的括号可以省略，但是语句体的大括号是必须的。

## 可选类型、隐式解析可选类型
使用可选类型(optionals)来处理值可能缺失的情况。可选类型表示两种可能：或者有值，你可以解析可选类型访问这个值，或者根本没有值。
例如：类型转换中`Int()`的作用是将一个`String`值转换成一个`Int`值。然而，并不是所有的字符串都可以转换成一个整数。字符串`123`可以被转换成数字`123`，但是字符串`Hello World`不行。
```swift
let number = "123"
let theNumber = Int(number)
// theNumber被推断为类型: Int?  或者类型： optional Int

// 可以给可选变量赋值nil来表示它没有值
var code: Int? = 404
code = nil
// 注意：nil不能用于非可选的常量和变量
```

可选类型暗示了常量或者变量可以没有值。可选可以通过`if`语句来判断是否有值，如果有值的话可以通过可选绑定来解析值。
有时候在程序架构中，第一次被赋值之后，可以确定一个可选类型总会有值。在这种情况下，每次都要判断和解析可选值是非常低效的，因为可以确定它总会有值。
这种类型的可选状态被定义为隐式解析可选类型。把想要用作可选的类型的后面的问号(String?)改成感叹号(String!)来声明一个`隐式解析可选类型`。
```swift
let possibleString: String? = "An optional string"
let forcedString: String = possibleString! // 将可选类型赋值给非可选类型需要强制解析获取值

let assumedString: String! = "An implicitly string"
let implicitString: String = assumedString // 隐式解析可选类型确定有值后不需要强制解析
```


## if语句以及强制解析
```swift
let individualScores = [75, 43, 103, 87, 12]
var teamScore: [Int] = []
for score in individualScores {
    if (score > 50) {
        teamScore.append(score)
    }
}
print(teamScore)
```

你可以使用`if`语句和`nil`比较来判断一个可选值是否包含值。可以使用"相等"(==)或"不等"(!=)来执行比较。如果可选类型有值，它将不等于`nil`
```swift
if convertedNumber != nil {
    print("convertedNumber contains some integer value.")
}

// 当你确定可选类型确定包含值之后，你可以在可选的名字后面加一个感叹号(!)来获取值。这表示：我知道这个可选有值，请使用它。这被称为：可选值的强制解析。
if convertedNumber != nil {
    print("convertedNumber has an integer value of \(convertedNumber!).")
}
```


在`if`语句中，条件必须是一个布尔表达式，`if (3)`这样的代码会报错。可以一起使用`if`和`let`一起来处理值缺失的情况
在类型后面加一个问号来标记这个变量的值是可选的，一个可选的值是一个具体的值或者是`nil`以表示值缺失。
```swift
var aa: String? = "hello"
print(aa) // Optional("hello")

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"
if let name = optionalName { // 用if和let一起来处理值缺少的情况, if和let一起用的时候不能加括号，不能if (let...)
    greeting = "Hello, \(name)"
    print(greeting) // Hello, John Appleseed
}
```

另一种处理可选值的方法是通过使用`??`操作符来提供一个默认值。如果可选值缺少的话，可以使用默认值来代替。
```swift
var test: String? = nil
print("\(test ?? "123")")
```

## switch语句
`switch`支持任意类型的数据以及各种比较操作————不仅仅是整数以及测试相等：
```swift
let vegetable = "123peppe"
switch vegetable {
case "celery":
    print("Add some raisins and make ants on a log.")
case "cucumber", "watercress":
    print("That would make a good tea sandwich.")
case let x where x.hasSuffix("pepper"): // let将匹配等式的值赋给常量x
    print("Is it a spicy \(x)?")
default:
    print("Everything tastes good in soup.")
}
```
运行`switch`中匹配到的`case`语句之后，程序会退出`switch`语句，并不会继续向下运行，所以不需要在每个子句结尾写`break`。

```swift
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
// 两层for in 找出字典中的最大值
for (_, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)
// 输出 "25"
```
## while和repeat while
repeat while和do while一样，会先执行一次代码再进行判断。
```swift
var n = 2
while n < 100 {
    n *= 2
}
print(n)

var m = 2
repeat {
    m *= 2
} while m < 100
print(m)
```

在循环中使用`..<`来表示下标范围，使用`..<`创建的范围不包含上界，如果想包含的话需要使用`...`
```swift
var total = 0
for i in 0 ..< 4 {
    total += i
    print(total)
}
print(total)
```

## 函数和闭包
默认情况下，函数使用它们的参数名称作为它们参数的标签，在参数名称前可以自定义参数标签，或者使用`_`表示不使用参数标签。
```swift
func greet(person: String, day: String) -> String {
    return "Hello \(person), today is \(day)"
}
let aa = greet(person: "Bob", day: "Tuesday")
print(aa)

// 使用_表示不使用参数标签，在参数名称前可以自定义参数标签
func greet(_ person: String, wakk day: String) -> String {
    return "Hello \(person), today is \(day)"
}
let aa = greet("Bob", wakk: "Tuesday")
print(aa)
```

使用元组来生成复合值，比如让一个函数返回多个值。该元组的元素可以用名称或数字来获取。
```swift
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0

    for score in scores {
        if score > max {
            max = score
        } else if score < min {
            min = score
        }
        sum += score
    }

    return (min, max, sum)
}
let statistics = calculateStatistics(scores:[5, 3, 100, 3, 9])
print(statistics.sum)
print(statistics.2)
```

函数可以嵌套。被嵌套的函数可以访问外侧函数的变量，可以使用嵌套函数来重构一个太长或者太复杂的函数。
```swift
func returnFifteen() -> Int {
    var y = 10
    func add() {
        y += 5 // 在js中，这里的y形成了闭包
    }
    add()
    return y
}
returnFifteen()
```

函数是第一等类型，这意味着函数可以作为另一个函数的返回值：
```swift
func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)
```

函数也可以当做参数传入另一个函数：
```swift
func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
func lessThanTen(number: Int) -> Bool {
    return number < 10
}
var numbers = [20, 19, 7, 12]
let aa = hasAnyMatches(list: numbers, condition: lessThanTen)
print(aa)
```

在`javascript`中，当函数主动维护了在函数内使用的外部的变量，则该函数为一个闭包。

### 数组的map方法和sorted方法
```swift
// map不会改变原数组的值，和js中的map方法一样
// map方法必须有一个return返回值
var numbers = [20, 19, 7, 12]
let mappedNumbers = numbers.map({
    (number: Int) -> Int in
    let result = 3 * number
    return result
})
print(mappedNumbers)
print(numbers)

// 单个语句会把它语句的值当做结果返回
var numbers = [20, 19, 7, 12]
let mappedNumbers = numbers.map({ number in 3 * number })

// 使用sorted对数组进行排序，这里通过参数位置来引用参数
var numbers = [20, 19, 7, 12]
let sortedNumbers = numbers.sorted { $0 < $1 }
print(sortedNumbers)
```

## 对象和类
使用`class`和类名来创建一个类，要创建一个类的实例，在类名后面加上括号。使用点语法来访问实例的属性和方法。
```swift
class Shape {
    var numberOfSides = 0
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}

var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
print(shapeDescription)
```

- 类中使用`init`来创建一个构造器，`self`被用来区别实例变量和构造器的参数，和`javascript`中的`this`一样。
- 如果你需要在对象释放之前进行一些清理工作，使用`deinit`创建一个析构函数。
- 子类的定义方法是在它们的类名后面加上父类的名字，用冒号分隔。
- 子类如果要重写父类的方法的话，需要用`override`标记，如果没有添加`override`就重写父类方法的话编译器会报错。
```swift
class NamedShape {
    var numberOfSides: Int = 0
    var name: String

    init(name: String) {
        self.name = name
    }

    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}

class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        // super调用父级的构造函数
        super.init(name: name)
        numberOfSides = 4
    }

    func area() ->  Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
let area = test.area()
print("面积: \(area)")
let desc = test.simpleDescription()
print("描述: \(desc)")
```

使用`getter`和`setter`的计算属性
```swift
class NamedShape {
    var numberOfSides: Int = 0
    var name: String

    init(name: String) {
        self.name = name
    }

    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}

class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 3
    }

    var perimeter: Double {
        get {
            return 3.0 * sideLength
        }
        set { // 在setter中，新值的名字是newValue，也可以在set之后的圆括号中显示地设置一个名字
            sideLength = newValue / 3.0
        }
    }

    override func simpleDescription() -> String {
        return "An equilateral triangle with sides of length \(sideLength)."
    }
}
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
print(triangle.perimeter)
triangle.perimeter = 9.9
print(triangle.sideLength)
```

如果你不需要计算属性，但是仍然需要在设置一个新值之前或者之后运行代码，使用`willSet`和`didSet`。写入地代码会在属性值发生改变时调用，但不包含构造器中发生值改变地情况。
```swift
var square: Square {
    willSet {
        triangle.sideLength = newValue.sideLength
    }
}
```

处理变量地可选值时，你可以在操作（比如方法、属性和子脚本）之前加`?`。如果`?`之前地值是`nil`，`?`后面地东西都会被忽略，并且整个表达式返回`nil`。否则，可选值会被解包，之后地所有代码都会按照解包后地值运行。在这两种情况下，整个表达式地值也是一个可选值。
```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
let sideLength = optionalSquare?.sideLength
```

## 枚举和结构体
默认情况下，`swift`按照从0开始每次加1的方式为原始值进行赋值，不过你可以通过显式赋值进行改变。使用`rawValue`属性来访问一个枚举成员的原始值。
```swift
enum Rank: Int {
    case ace = 1
    case two, three, four, five, six, seven, eight, nine, ten
    case jack, queen, king
    func simpleDescription() -> String {
        switch self {
        case .ace:
            return "ace123"
        case .jack:
            return "jack"
        case .queen:
            return "queen"
        case .king:
            return "king"
        default:
            return String(self.rawValue)
        }
    }
}

let ace = Rank.ace
print(ace)
let aceRawValue = ace.rawValue
print(aceRawValue)
let aceDesc = ace.simpleDescription()
print(aceDesc)
```

## 协议和扩展
使用`protocol`来声明一个协议。类、枚举、结构体都可以遵循协议。
```swift
protocol ExampleProtocol {
    var simpleDescription: String { get }
    mutating func adjust()
}
```

## 错误处理
在`swift`中，错误用遵循`Error`协议的类型的值来表示。这个空协议表明该类型可以用于错误处理。
`swift`的枚举类型尤为适合构建一组相关的错误状态，枚举的关联值还可以提供错误状态的额外信息。

当一个函数抛出一个错误时，你的程序流程会发生改变，所以重要的是你能迅速识别代码中会抛出错误的地方。为了标识出这些地方，在调用一个能抛出错误的函数、方法或者构造器之前，加上`try`关键字，或者`try?`或`try!`这种变体。

```swift
enum VendingMachineError: Error {
    case invalidSelection                    //选择无效
    case insufficientFunds(coinsNeeded: Int) //金额不足
    case outOfStock                          //缺货
}

struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 3),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 20

    // 为了表示一个函数、方法或构造器可以抛出错误，在函数声明的参数之后加上throws关键字。一个标有throws关键字的函数被称做throwing函数。
    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }

        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }

        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }

        coinsDeposited -= item.price

        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem

        print("Dispensing \(name)")
    }
}
let aa = VendingMachine()

// 如果在do子句中的代码抛出了一个错误，这个错误会与catch子句做匹配，从而决定哪条子句能处理它
do {
    try aa.vend(itemNamed: "Chipss") // 因为vend方法能抛出错误，所以在调用它的时候在它前面加了try关键字
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    print("Unexpected error: \(error).")
}
```

## 泛型
在尖括号里写一个名字来创建一个泛型函数或者类型。
```swift
func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
    var result: [Item] = []
    for _ in 0..<numberOfTimes {
        result.append(item)
    }
    return result
}
let res = makeArray(repeating: "knock", numberOfTimes: 4)
print(res)
```

## 断言和先决条件
断言和先决条件是在运行时所做的检查。你可以用他们来检查在执行后续代码之前是否一个必要的条件已经被满足了。如果断言或者先决条件中的布尔条件评估的结果为true，则代码像往常一样继续执行。如果布尔条件评估结果为false，程序的当前状态是无效的，则代码执行结束，应该程序中止。

断言和先决条件的不同点是，他们什么时候进行状态检测：断言仅在调试环境运行，而先决条件则在调试环境和生产环境中运行。
```swift
let age = -3
assert(age >= 0, "A person's age cannot be less than zero")
// 因为 age < 0，所以断言会触发

// 先决条件
precondition(index > 0, "Index must be greater than zero.")
```