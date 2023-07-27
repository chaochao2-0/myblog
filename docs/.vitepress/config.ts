import { defineConfig } from 'vitepress'
import sidebarJson from './sidebar.json'
import navJson from './nav.json'

export default defineConfig({
    title: '轻踏云层', // 博客的标题
    description: '轻踏云层 的个人博客', // 博客的介绍
    base: '/myblog', // 这里要填github的仓库名，不然它找不到对应的css、js资源
    themeConfig: {
        logo: '/images/avatar.jpg',
        nav: navJson.nav,
        sidebar: { ...sidebarJson.sidebar },
        lastUpdatedText: '最近更新时间',
        search: {
            provider: 'local'
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/chaochao2-0' }] // 可以连接到 github
    },
    lastUpdated: true,
    vite: {
        server: {
            host: true,
            port: 1104
        }
    }
})
