import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import decifrar from './routes/decifrado.routes.js'
config()



const app = express();


app.use(express.json());
app.use(morgan('dev'))

app.use(cors({
    origin: "*"
}));


app.listen(process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`)
})

app.use("/decifrar", decifrar);

app.use((req, res) => {
    res.status(404).json({ message: "No se encontro la ruta" })
})


