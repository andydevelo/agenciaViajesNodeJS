import express from "express";
import router from "./routes/router.js";
import db from './config/db.js'
import dotenv from 'dotenv'
const app = express();
const PORT = 4000;

// usar template engine PUG
app.set("view engine", "pug");

// conectar base de datos 
db.authenticate()
     .then(() => console.log("DB conectada"))
     .catch(error => console.log(error))
// midelwares
app.use((req, res, next) => {
     res.locals.year = new Date().getFullYear();
    return next()
})       
// agregar body parser para leer datos del formulario
app.use(express.urlencoded({ extended: true }));

// definir carpeta public
app.use(express.static("public"));
// agregar router a la app
app.use("/" , router);

app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`)
})

