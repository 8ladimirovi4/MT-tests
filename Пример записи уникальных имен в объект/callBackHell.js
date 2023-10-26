const fs = require('fs')

    fs.readdir('./data', (err, files) => {
        if (err) {
        }else {
            //------------------------------------------------>
            let totalSize = 0
    files.forEach((file, index) => {
        fs.stat(`./data/${file}`, (err, stats) => {
            totalSize += stats.size
            if(err){
                console.log(err)
            }else{
                if(files.length === index + 1){
                    //------------------------------------------------>
                    fs.writeFile('./data/text3.txt', `files total size ${totalSize.toString()} KB`, (err) => {
                        if(err){
                            console.log(err)
                            return
                        }
                    })
                    //<------------------------------------------------
                }
           
            }
         })
    })
            //<------------------------------------------------
        }
    })
