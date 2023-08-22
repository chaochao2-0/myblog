# ESlint和Prettier的比较

 - 只单纯使用Prettier十分合理，开箱即用是个很棒的功能
 - 如果你需要使用ESlint，它也可以像Prettier一样格式化代码，并且更加可配置
 - Prettier + ESlint仍然需要大量的配置，它并没有让你的生活变得更简单
 - 你可以在ESlint中完全控制代码风格，但在Prettier中却无法做到，这两者混合在一起感觉很奇怪
 - 我不认为Parse两次代码会更快
 ESlint的自动修复也可以像Prettier一样进行格式化，还有更自由的选择

 ### 替代方案
 ESlint对确保代码质量来说不可或缺。如果ESlint已经能够进行代码格式化，那么对我来说最好的解决方案就是一次性都有它处理。
 我花了一些时间配置我的ESlint并将其设置为预设配置:[@antfu/eslint-config](https://github.com/antfu/eslint-config)
 从结果来看，使用ESlint其实也可以非常简单：
 ```js
 npm i -D @antfu/eslint-config
 ```

 ```js
 // .eslintrc
 {
    "extends": "@antfu"
 }
 ```
 这样就可以了。配合IDE扩展，还可以在保存时触发自动修复。它的工作方式与Prettier类似，但当你要换行的时候尊重你的选择，并提供了许多lint的最佳实践。哦！当然，这是基于我自己的需求的另一种"固执己见的"配置，但或许它可以成为一份很好的参考，方便你创建属于你自己的配置。

 以上Prettier和ESlint的观点来自：https://antfu.me/posts/why-not-prettier-zh，我一直在使用Prettier，ESlint用的其实很少，也对ESlint不够了解，但我确实在工作中感受到了Prettier的一些局限性，也就是文中所说的Prettier的"固执己见"。有时间可以参考一下他的实现来配置自己的ESlint最佳实践。

eslint在vscode的setting中配置保存时自动格式化
 ```json
  "eslint.format.enable": true,
  "eslint.run": "onSave",
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
 ```