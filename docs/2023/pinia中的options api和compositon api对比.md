# pinia
## pinia中的options api和compositon api写法对比

`options api`写法
```ts
// information.ts
import { defineStore } from 'pinia'
import { getComponentTree } from '@/api/index'

export const useInformationStore = defineStore('information', {
    state: () => ({
        count: 0,
        message: {}
    }),
    getters: {
        doubleCount: (state) => {
            return state.count * 2
        },
        doublePlusOne(): number {
            // 通过this来访问state中的数据
            return this.count * 2 + 1
        }
    },
    actions: {
        async getData() {
            const params = {
                appliId: 'BIM2023053121223048',
                pageNo: 1,
                pageSize: 10
            }
            await getComponentTree(params).then((res: any) => {
                // 通过this来访问state中的数据
                this.message = res.data
            })
        }
    }
})
```

```ts
// index.vue
import { useInformationStore } from '@/store/information'
const initFunction = async() => {
    const info = useInformationStore()
    // 直接读取store中的数据修改
    info.count++
    // 使用$patch修改
    info.$patch({ count: info.count + 1 })
    // 调用getters中的方法
    console.log(info.doubleCount)
    // 调用actions中的接口请求方法
    await info.getData()
}
initFunction()
```

对比`composition api`的写法：
```ts
// information.ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getComponentTree } from '@/api/index'

export const useInformationStore = defineStore('counter', () => {
    const count = ref(0)
    const message = ref({})

    // 使用computed来实现和getters
    const doubleCount = computed(() => count.value * 2)

    // 直接在函数中进行接口请求
    const getData = async () => {
        const params = {
            appliId: 'BIM2023053121223048',
            pageNo: 1,
            pageSize: 10
        }
        await getComponentTree(params).then((res: any) => {
            message.value = res.data
        })
    }

    return { count, message, doubleCount, getData }
})
```

```ts
// index.vue
import { useInformationStore } from '@/store/information'
const initFunction = async() => {
    const info = useInformationStore()
    // 直接读取store中的数据修改
    info.count++
    // 使用$patch修改
    info.$patch({ count: info.count + 1 })
    
    console.log(info.doubleCount)
    await info.getData()
}
initFunction()
```

`composition api`的写法没有了`getters`和`actions`的模块要求，写法更自由，也因为没有模块化要求，代码解构显得不是那么清晰。利弊就和`vue3`使用`compositon api`和`options api`的利弊一样，各有所好。