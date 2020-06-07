const express = require("express")
const server = express()

//Public path
server.use(express.static("public"))

//Template engine for html
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})
/*------------------------------------/
               Routes
/------------------------------------*/
/*Home*/
//Req = Requisição
//Res = Resposta
server.get("/", (req,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

/*------------------------------------/
            Open Server
/------------------------------------*/
server.listen(3000)