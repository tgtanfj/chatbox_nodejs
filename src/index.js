import express from "express";
import bodyParser from "body-parser";
import webRoutes from '../routes/web'
import viewEngine from './configs/viewEngine'

let app = express()

viewEngine(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//config web routes
webRoutes(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let port = process.env.PORT || 1010

app.listen(port, () => {
    console.log("App is running at the port: ", port)
})