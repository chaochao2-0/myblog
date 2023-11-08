# Line2

- line2的`geometry`，它的大小第一次初始化的时候就已经固定了，后面再通过`setPositions`修改不了它的大小，只能通过重新创建来修改大小
- 使用同一个`geometry`使用不同数据进行绘制，后面的绘制结果会覆盖前面的绘制结果

如何将rbg和十六进制颜色相互转换:
```ts
export const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (c: number) => {
      const hex = c.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }
    const redHex = toHex(r)
    const greenHex = toHex(g)
    const blueHex = toHex(b)
    return `#${redHex}${greenHex}${blueHex}`
}

export const hexToRgb = (hex: string) => {
    // 去除可能包含的 '#' 符号
    hex = hex.replace(/^#/, '')

    // 提取红色、绿色和蓝色的十六进制分量
    const red = parseInt(hex.substring(0, 2), 16)
    const green = parseInt(hex.substring(2, 4), 16)
    const blue = parseInt(hex.substring(4, 6), 16)

    // 返回 RGB 值的对象
    return {
        r: red,
        g: green,
        b: blue
    }
}
```