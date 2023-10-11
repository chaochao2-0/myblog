# git常用命令

```ts
// 撤销最近的一次提交
git reset HEAD~
// 允许不同git历史拉代码
git pull --allow-unrelated-histories origin main
// git分支更名
git branch -m master main
```


```ts
git pull 报错
// hint: You have divergent branches and need to specify how to reconcile them.
// hint: You can do so by running one of the following commands sometime before
// hint: your next pull:
// hint: 
// hint:   git config pull.rebase false  # merge
// hint:   git config pull.rebase true   # rebase
// hint:   git config pull.ff only       # fast-forward only
// hint: 
// hint: You can replace "git config" with "git config --global" to set a default
// hint: preference for all repositories. You can also pass --rebase, --no-rebase,
// hint: or --ff-only on the command line to override the configured default per
// hint: invocation.
// fatal: Need to specify how to reconcile divergent branches.
执行 git config pull.rebase false
然后来合并代码
```