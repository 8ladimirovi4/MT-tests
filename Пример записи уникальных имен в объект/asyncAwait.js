const fs = require('fs')

const readDir =  new Promise((resolve, reject) => {
    fs.readdir('./data', (err, data) => {
        if (err) {
          return reject(err)
        }else {
            return resolve(data)
        }
    })
})

const fileSize = (files) => new Promise((resolve, reject) => {
     let totalSize = 0
    files.forEach((file, index) => {
        fs.stat(`./data/${file}`, (err, stats) => {
            totalSize += stats.size
            if(err){
               return reject('ошибка, такого файла нет')
            }else{
                if(files.length === index + 1){
                   return resolve(totalSize)
                }
            }
         })
    })
})


const writeFile = (path, size) => new Promise((resolve, reject) => {
    fs.writeFile(path, `files total size ${size.toString()} KB`, (err) => {
        if(err){
           return reject(err)
        }else{
   return resolve()
        }
    })
})

async function writeData(readDir){

}

//writeData(readDir)
