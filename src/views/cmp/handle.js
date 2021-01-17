/* eslint-disable */
const fs = require('fs')
const path = require('path')
const request = require('request')
const async = require("async");
const download = require('download');

// 用于获取系统文件分隔符
const sep = path.sep
// 用于存储图片和网页的文件夹路径
const srcPath = path.join(__dirname, '../../') // src路径
const jsonDir = `${srcPath}${sep}static${sep}jsons${sep}`
const imgDir = `${srcPath}${sep}static${sep}imgs${sep}`

const imgUrlArr = []

// 读取目录
function readDir(dirPath) {
    const jsonFileArr = fs.readdirSync(dirPath)
    jsonFileArr.forEach(item => {
       const jsonPath = path.join(dirPath, item)
       reafFile(jsonPath)
    })
}

// 读取文件
function reafFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8')
    const jsonData = JSON.parse(data)
    const listArr = jsonData.data.list
    listArr.forEach(list => {
        const imgSrcArr = list.itemData.imgSrc
        imgSrcArr.forEach(img => {
            imgUrlArr.push(img.img_origin)
        })
    })
    console.log(imgUrlArr)
    getImg(imgUrlArr)
   
    // for (const imgUrl of imgUrlArr.slice(0, 5)) {
    //     if (imgUrl) {
    //        const imageName = Math.random().toString().substring(2, 5) + '-' +Math.random().toString().substring(2, 15)
    //        downloadImg(imgUrl, imageName)
    //     }
    
    // }
}

async function getImg(imgArr) {
    await Promise.all(imgArr.map(url => url && download(url, imgDir)));
}

async function downloadImg(downloadUrl, imageName) {
    // request(downloadUrl).pipe(
    //     fs.createWriteStream(`${imgDir}${imageName}.jpg`)
    //   );
    //  download(downloadUrl).pipe(fs.createWriteStream(imageName));
    await download(downloadUrl, imgDir);
}

readDir(jsonDir)

module.exports = readDir