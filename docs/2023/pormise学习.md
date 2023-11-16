## promise学习

再见，山峰下的园区。一个人选择远行，并不一定是马云说的钱给少了或者心委屈了，也可以是为了远方有西湖般的美景。

现实主义者关注的是钱，理想主义者关注的是时间，当代这个社会，钱很重要。但更重要的，对个体来说，是如何提高时间的质量，对人类来说，不仅关注时间的质量，还关注整个人类时间的长短，是否可延续下去。赚钱是为了花钱，花钱是为了提升时间的品质甚至长度。围绕钱的现实主义者，最终会为围绕时间的理想主义者服务。

微前端的解决的痛点不在于各个系统间要重复登陆，而是当你的系统数量或者单个系统内业务体量达到一定程度以后，业务人员要完整的进行一次工作流程，可能需要在数个系统间反复横跳。

## Promise.all的实现
```js
function isPromise(value) {
    if (typeof value === 'function' || (typeof value === 'object' && value !== null)) {
        if (typeof value.then === 'function') {
            return true
        }
    }
}

Promise.all = function (values) {
    return new Promise((resolve, reject) => {
        let result = []
        let times = 0

        const postSuccess = (i, value) => {
            result[i] = value
            if (++times === values.length) {
                resolve(result)
            }
        }

        for (let i = 0; i < values.length; i++) {
            const current = values[i]
            if (isPromise(current)) {
                current.then(value => {
                    postSuccess(i, value)
                }).catch(e => {
                    reject(e)
                })
            } else {
                postSuccess(i, current)
            }
        }

    })
}
```

## Promise.race的实现
```js
function isPromise(value) {
    if (typeof value === 'function' || (typeof value === 'object' && value !== null)) {
        if (typeof value.then === 'function') {
            return true
        }
    }
}

Promise.race = function (values) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < values.length; i++) {
            const current = values[i]
            if (isPromise(current)) {
                current.then(resolve, reject)
            } else {
                resolve(current)
            }
        }
    })
}
```

## Promise.prototype.finally
`finally()`方法返回一个`Promise`。在`Promise`结束时，无论结果是`fulfilled`或者是`rejected`，都会执行指定的回调函数。这为在`Promise`是否成功完成后都需要执行的代码提供了一种方式。

这避免了同样的语句需要在`then()`和`catch()`中各写一次的情况。
```js
Promise.prototype.finally = function (cb) {
    return this.then((data) => {
        return Promise.resolve(cb()).then((n) => data)
    }, (err) => {
        return Promise.resolve(cb()).then((n) => { throw err })
    })
}
```

## 如果有100个请求，如何使用Promise控制并发
```js
for (let i = 0; i < 100; i++) {
    arr.push(() => new Promise((resolve) => {
        setTimeout(() => {
            console.log('done', i)
            resolve()
        }, 100 * i)
    }))
}

const parallelRun = () => {
    const runingTask = new Map()
    const inqueue = (totalTask, max) => {
        while (runingTask.size < max && totalTask.length) {
            const newTask = totalTask.shift() // shift方法：删除数组的第一个元素并返回该元素的值
            const tempName = totalTask.length
            runingTask.set(tempName, newTask)
            newTask().finally(() => {
                runingTask.delete(tempName)
                inqueue(totalTask, max)
            })
        }
    }
    return inqueue
}

parallelRun()(arr, 6)
```

## Promise实现原理
https://juejin.cn/post/7259647015604863013?searchId=20231110131223AAEC16C00BD15B04AB76

```js
const PROMISE_PENDING_STATE = 'pending'
const PROMISE_FULFILLED_STATE = 'fulfilled'
const PROMISE_REJECTED_STATE = 'rejected'

class Promise {
    constructor(execute) {
        this.PromiseState = PROMISE_PENDING_STATE
        this.PromiseResult = undefined
        this.callbacks = []

        try {
            excute(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    resolve(result) {
        if (this.PromiseState === PROMISE_PENDING_STATE) {
            this.PromiseState = PROMISE_FULFILLED_STATE
            this.PromiseResult = result

            setTimeout(() => {
                this.callbacks.forEach((cb) => {
                    cb.onResolved(this.PromiseResult)
                })
            })
        }
    }

    reject(reason) {
        if (this.PromiseState === PROMISE_PENDING_STATE) {
            this.PromiseState = PROMISE_REJECTED_STATE
            this.PromiseResult = reason

            setTimeout(() => {
                this.callbacks.forEach((cb) => {
                    cb.onRejected(this.PromiseResult)
                })
            })
        }
    }

    then(onResolved, onRejected) {
        if (typeof onResolved !== 'function') {
            onResolved = (result) => {
                return result
            }
        }

        if (typeof onRejected !== 'function') {
            onRejected = (reason) => {
                throw reason
            }
        }

        return new Promise((resolve, reject) => {
            const callback = (fn) => {
                try {
                    const result = fn(this.PromiseResult)
                    if (result instanceof Promise) {
                        result.then((res) => {
                            resolve(res)
                        },
                        (err) => {
                            reject(err)
                        })
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    reject(err)
                }
            }

            // 成功
            if (this.PromiseState === PROMISE_FULFILLED_STATE) {
                setTimeout(() => {
                    callback(onResolved)
                })
            }

            // 失败
            if (this.PromiseState === PROMISE_REJECTED_STATE) {
                setTimeout(() => {
                    callback(onRejected)
                })
            }

            // 等待中
            if (this.PromiseState === PROMISE_PENDING_STATE) {
                this.callbacks.push({
                    onResolved: () => {
                        callback(onResolved)
                    },
                    onRejected: () => {
                        callback(onRejected)
                    }
                })
            }
        })
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    static resolve(result) {
        return new Promise((resolve, reject) => {
            if (result instanceof Promise) {
                result.then((res) => {
                    resolve(res)
                },
                (err) => {
                    reject(err)
                })
            } else {
                resolve(result)
            }
        })
    }

    static reject(result) {
        return new Promise((resolve, reject) => {
            reject(result)
        })
    }

    static all(promises) {
        let result = []
        let count = 0
        return new Promise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++) {
                promises[i].then((res) => {
                    result[i] = res
                    count++
                    if (count === promises.length) {
                        resolve(result)
                    }
                },
                (reason) => {
                    reject(reason)
                })
            }
        })
    }

    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then((res) => {
                    resolve(res)
                },
                (reason) => {
                    reject(reason)
                })
            }
        })
    }
}
```

## 以后面试前必须要准备的一些东西
- call、apply、bind的使用
- 手写Promise，包括书写.all、.race、.finally
- 事件循环
- 回流和重绘
- 设计模式