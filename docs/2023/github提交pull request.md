# 提交Pull Request

```bash
// TODO:提交pull request需要实操一遍
```
- 首先需要`fork`这个项目，进入项目页面，点击右上角的`fork`按钮
- 你的`github`账号中会出现这个项目
- 在本地拉取github的代码并添加远程地址
- 获取项目最新代码
- 创建分支：一般都创建一个新的分支来修改代码
- 合并修改：一个常见的问题是远程的项目`upstream`有了新的更新，从而导致我们提交`Pull Request`时会导致冲突，因此我们可以在提交前先把远程其他开发者的`commit`和我们的`commit`合并。把合并后的代码提交到自己新建的分支当中。
- 提交`Pull Request`你可以在你的`github`代码仓库页面切换到`branches`页面点击`branch1`分支后点击`New pull request`按钮，添加相关注释后提交。OR切换到`branch1`分支的代码仓库点击`Compare & pull request`按钮，添加相关注释后提交。

## commit 规范
提交 commit 的类型，包括以下几种：
- feat 🚀: 新功能
- fix 🧩: 修复问题
- docs 📚: 修改文档
- style 🎨: 修改代码格式，不影响代码逻辑
- refactor ♻️: 重构代码，理论上不影响现有功能
- perf ⚡️: 提升性能
- test ✅: 增加修改测试用例
- chore 🔨: 修改工具相关（包括但不限于文档、代码生成等）
- build 📦️: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）
