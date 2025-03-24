//importações
//importação de pacote
import express from 'express'
import dotenv from 'dotenv'
//importando com export default
import config from './config.js'
import connectDatabase from './database/db.js'
/*importar elementos separados de um js export

//import { soma, subt } from './src/controllers/user.controller.js'

//importar arquivo json
import produtos from './src/produtos.json' with {type:'json'}
*/
//importar as rotas
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
//constantes
dotenv.config();


const app = express()
//usar as rotas
connectDatabase()
app.use(express.json())
app.use("/user", userRoutes)
app.use("/auth", authRoutes)
app.use("/post", postRoutes)



app.listen(config.port,config.host,()=>{
    console.log(`servidor iniciado na porta:${config.port}`)
})