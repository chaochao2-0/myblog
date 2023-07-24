import sidebarJson from './sidebar.json'
import navJson from './nav.json'

export default {
    title: '轻踏云层', // 博客的标题
    description: '轻踏云层 的个人博客', // 博客的介绍
    base: '/', // 如果想用 https://mlyz.wdy.github.io/blog/ 访问，那么这句话必填
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
    lastUpdated: true
}
