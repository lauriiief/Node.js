import * as fs from 'node:fs'

fs.writeFile('file1.txt', 'Writing a file', {encoding: 'utf-8'}, function(error){
    if(error){
        console.log('Error writing')
    }

    console.log('File successfully saved')
})    