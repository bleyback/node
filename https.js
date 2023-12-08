const { prototype } = require('node:events')
const http =require('node:http')

const desirePORT= process.argv.PORT ?? 1234


const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html;charset=utf-8')
    if(req.url=='/'){
        res.statusCode=200
        res.end('Bienvenído a mi api')
    }else if(req.url=='/imagen.png'){
        res.setHeader('Content-Type,image/png')
    }else if(req.url=='/contacto'){
        res.statusCode=200
        res.end('<h1>3121691026</h1>')
    }else{
        res.statusCode=400
        res.end('<h1>Error 404</h1>')
    }

})

server.listen(desirePORT,()=>{
    console.log(`server listening on port http://localhost:${desirePORT}`)
})