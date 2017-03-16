var fs = require("fs")
var path = require("path")
var indexCurrent = ''
var fileSrc = ''
var fileList = []
var $picture = document.getElementById('picture')
var supportType = ['jpg', 'jpeg', 'png', 'bmp', 'webp']

function init() {
    indexCurrent = ''
    fileSrc = ''
    fileList = []
}

function getFileType(name){
    var arr = name.split('.')
    var len = arr.length
    return arr[len - 1]
}

function nextPicture() {
    fileList.forEach(function (file, index) {
        if (file === fileSrc) {
            if (indexCurrent === '') {
                indexCurrent = index + 1
                return false
            } else {
                if (indexCurrent < fileList.length - 1) {
                    indexCurrent = indexCurrent + 1
                    return false
                } else {
                    indexCurrent = 0
                    return false
                }
            }
        }
    })
    setPicture()
}

function setPicture() {
    if (fileList.length === 0) return false
    fileSrc = fileList[indexCurrent]
    $picture.src = 'file://' + fileSrc
}

const holder = document.getElementById('holder')
holder.ondragover = () => {
    return false;
}

holder.ondragleave = holder.ondragend = () => {
    return false;
}

holder.ondrop = (e) => {
    e.preventDefault()
    init()
    for (let f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
        console.log(f.path.replace(f.name, ''))
        var filePath = f.path.replace(f.name, '')
        console.log(filePath)
        fileSrc = f.path
        $picture.src = 'file://' + fileSrc
        fs.readdir(filePath, function (err, files) {
            if (err) {
                console.log(err)
                return false
            }
            console.log(files)
            files.forEach(function (fileName) {
                const fileUrl = path.join(filePath, fileName)
                console.log(fileUrl)
                const fileType = getFileType(fileName)
                // console.log(fileType)

                supportType.forEach(function (type) {
                    if (fileType === type) {
                        fileList.push(fileUrl)
                        return false
                    }
                })
            })
        })
    }
    return false;
}

var body = document.getElementById('body')
body.onclick = (e) => {
    nextPicture()
}
