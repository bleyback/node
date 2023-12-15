const express = require('express')
const movies= require('./movies.json')
const crypto= require('node:crypto')
const  {validateMovie} = require('./schemas/movies.js')



const app=express()

app.disable('x-powered-by')


app.get('/movies',(req,res)=>{
    const {genre}= req.query
    if(genre){
        const moviegen= movies.filter(movie=>movie.genre.some(g=>g.toLowerCase()==genre.toLowerCase()))
        if(moviegen) return res.json(moviegen)
        res.status(404).json({mesage:'Gen no found'})
    }else{
        res.json(movies)
    }
})

app.get('/movies/:id',(req,res)=>{
    const {id}=req.params
    const movie= movies.find(movie=>movie.id==id)
    if(movie) return res.json(movie)

    res.status(404).json({mesage:'Movie no found'})
})


app.use(express.json())
app.post('/movies',(req,res)=>{
    const result = validateMovie(req.body)
    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    newMovie={
        id:crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})


const PORT = process.argv.PORT ?? 1234

app.listen(PORT,()=>{
    console.log( `Server listenign on port: http://localhost:${PORT}` )
})