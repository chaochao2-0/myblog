# 如何diy二维码

webpack注功绘制二维码中间logo
```js
// canvas中绘制中间logo
const img = new Image()
img.src = require('../../../assets/logo.jpg')
img.onload = function () {
    // 从(75, 75)开始，绘制宽度和高度为50的logo
    ctx.drawImage(img, 75, 75, 50, 50)
}
```

vue现成的组件：https://github.com/Binaryify/vue-qr.git
react现成的组件：https://github.com/ciaochaos/qrbtf.git

antfu: https://github.com/antfu/qrcode-toolkit.git
