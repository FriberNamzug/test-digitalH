import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import descifrar from './routes/descifrar.routes.js'
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

app.use("/descifrar", descifrar);

app.use((req, res) => {
    res.status(404).json({ message: "No se encontro la ruta" })
})


