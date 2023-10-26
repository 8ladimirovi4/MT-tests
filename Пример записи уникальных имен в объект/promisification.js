const fs = require('fs')


    fs.readdir('./data', (err, data) => {
        if (err) {
          return reject(err)
        }else {
            return resolve(data)
        }
    })




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

     


    fs.writeFile(path, `files total size ${size.toString()} MB`, (err) => {
        if(err){
           return reject(err)
        }else{
   return resolve()
        }
    })

    






