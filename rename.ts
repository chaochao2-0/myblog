const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
import { pinyin } from 'pinyin-pro'

// 获取当前文件的拼接路径
const pathJoin = (dir: string) => {
    return path.join(__dirname, '', dir)
}
const basicPath = pathJoin('./docs')
const excludeArr: string[] = ['.vitepress', 'images']
interface obj {
    [key: string]: any
}
let renameCache: obj = {}
let chineseToPinyin: obj = {}

const fileRename = (folderPath: string) => {
    return new Promise((resolve, reject) => {
        let data = fs.readdirSync(folderPath)
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            if (excludeArr.includes(item as string)) continue

            const itemPath = `${folderPath}/${item}`

            // 判断路径是否是文件夹
            if (fs.statSync(itemPath).isDirectory()) {
                fileRename(itemPath)
            } else {
                const fileName = item.split('.md')[0]
                if (fileName === 'index') continue
                const changeName = pinyin(fileName, { toneType: 'num' }).replace(/\s*/g, '')
                const newPath = `${folderPath}/${changeName}.md`
                renameCache[newPath] = itemPath
                chineseToPinyin[fileName] = changeName
                fs.rename(itemPath, newPath, function (err: any) {
                    if (err) {
                        console.log(err)
                        reject(false)
                    }
                })
            }
        }
        resolve(true)
    })
}

const fileResetName = (folderPath: string) => {
    return new Promise((resolve, reject) => {
        let data = fs.readdirSync(folderPath)
        for (let i = 0; i < data.length; i++) {
            const item = data[i]
            if (excludeArr.includes(item as string)) continue

            const itemPath = `${folderPath}/${item}`

            // 判断路径是否是文件夹
            if (fs.statSync(itemPath).isDirectory()) {
                fileResetName(itemPath)
            } else {
                if (renameCache[itemPath]) {
                    fs.rename(itemPath, renameCache[itemPath], function (err: any) {
                        if (err) {
                            console.log(err)
                            reject(false)
                        }
                    })
                }
            }
        }
        resolve(true)
    })
}

const getConfData: obj = {
    sidebar: (data: any) => {
        return data.sidebar['/']
    }
}

const editorConfig = (filePath: string, type: string) => {
    const conf = fs.readFileSync(filePath, 'UTF-8')

    const editConf = conf
    let editConfData = JSON.parse(editConf)
    const confData = getConfData[type](editConfData)
    dealData(confData)

    const newConf = JSON.stringify(editConfData, null, 4)
    fs.writeFile(filePath, newConf, (error: any) => {
        if (error) throw `文件写入出错: ${error}`
    })
    return conf
}

const dealData = (data: any) => {
    data?.forEach((each: any) => {
        if (each.items) {
            dealData(each.items)
        } else {
            const pathArr = each.link?.split('/')
            pathArr[pathArr.length - 1] = pinyin(pathArr[pathArr.length - 1], { toneType: 'num' }).replace(/\s*/g, '')
            each.link = pathArr.join('/')
        }
    })
}

const resetConfig = (filePath: string, conf: string) => {
    fs.writeFile(filePath, conf, (error: any) => {
        if (error) throw `文件写入出错: ${error}`
    })
}

const writeChineseToPinyin = () => {
    const path = pathJoin('./pinyin.json')
    const content = JSON.stringify(chineseToPinyin, null, 4)
    fs.writeFile(path, content, (error: any) => {
        if (error) throw `文件写入出错: ${error}`
    })
}

const resertToPinyin = () => {
    const path = pathJoin('./pinyin.json')
    const content = JSON.stringify({}, null, 4)
    fs.writeFile(path, content, (error: any) => {
        if (error) throw `文件写入出错: ${error}`
    })
}

fileRename(basicPath)
const sidebarConfPath = pathJoin('./docs/.vitepress/sidebar.json')
const sidebarconf = editorConfig(sidebarConfPath, 'sidebar')

writeChineseToPinyin()


exec('npm run build', (error: any, stdout: any, stderr: any) => {
    if (error) {
        console.error(`执行出错: ${error}`)
        return
    }
    fileResetName(basicPath)
    resetConfig(sidebarConfPath, sidebarconf)
    resertToPinyin()
    // console.log(`stdout: ${stdout}`)
    // console.log(`stderr: ${stderr}`)
})
