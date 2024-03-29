import cors from 'cors'
export const corsMiddleware = ()=>cors({
    origin: (origin,callback)=>{
        const accepted_origin=[
            'http://localhost:5173',
            'http://localhost:1234',
            'http://127.0.0.1:5173'
        ]
    if(accepted_origin.includes(origin)){
        return callback(null,true)
    }
    if(!origin){
        return callback(null,true)
    }
    return callback (new Error('Not allowed by CORS'))
    }
})