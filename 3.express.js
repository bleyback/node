const express = require('express')
const ditto = require('./dito.json')
const app = express()

const port = process.argv.port?? 1234


    next()
})

app.get('/ditto',(req,res)=>{
    res.json(ditto)
})



app.post('/pokemon',(req,res)=>{
    let body=''
    //listen data event
    req.on('data',chuck=>{
    body+=chuck.toString()
    })
    //when data event end 
    req.on('end',()=>{
    const data= JSON.parse(body)
        res.end(JSON.stringify(data))
    })
})

app.use((req,res)=>{
    res.status(404).end('<h1>Error 404</h1>')
})

app.listen(port,()=>{
    console.log(`Server listening on http://localhost:${port}`)
})
