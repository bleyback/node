const express = require('express')
const movies= require('./movies.json')
const crypto= require('node:crypto')
const  {validateMovie,validatePartialMiove} = require('./schemas/movies.js')



const app=express()

app.disable('x-powered-by')


app.get('/movies',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
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



app.delete('/movies/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    const {id}= req.params
    const movieIndex= movies.findIndex(movie=> movie.id==id)
    if (movieIndex == -1) return res.status(404).json({massage:'Movie not found'})
    movies.splice(movieIndex,1)
    return res.json({message :'Movie deleted'})
})



app.patch('/movies/:id',(req,res)=>{
    const {id}= req.params
    const result = validatePartialMiove(req.body)
    if(result.error){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const movieIndex = movies.findIndex(movie => movie.id==id)
    if (movieIndex == -1) return res.status(404).json({massage:'Movie not found'})
    
    const updateMovie={
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex]=updateMovie

    return res.json(updateMovie)
})
app.options('/movies/:id',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE')
    res.send(200)
})
const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log( `Server listenign on port: http://localhost:${PORT}` )
})