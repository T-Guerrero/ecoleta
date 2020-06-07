const express = require("express")
const server = express()

//Import db
const db = require("./database/db.js")

//Public path for access for css, assets and js files
server.use(express.static("public"))

//enable req.body in your application
server.use(express.urlencoded({ extended: true}))

//Template engine for html, e.g, implementing logic in html
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
    //query at the URL, e.g, http://teste.com/?name=Guerrero&state=São+Paulo (we're not using this, we're using post method)
    //console.log(req.query)
    return res.render("create-point.html", {saved: false})
})

server.post("/savepoint", (req, res) => {
    //req.body stores form fields submited
    //console.log(req.body)

    //insert data into db
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    db.run(query, values, function(err) {
        if (err){ 
            //err == Erro
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    })
})

server.get("/search", (req, res) => {
    const querySearch = req.query.search
    //fetch data
    if (querySearch == ""){
        //No city selected
        db.all('SELECT * FROM places', function(err, rows) {
            if (err){
                return console.log(err)
            }
            return res.render("search-results.html", {places: rows})
        })
    }
    else{
        db.all(`SELECT * FROM places WHERE city LIKE '%${querySearch}%'`, function(err, rows) {
            if (err){
                return console.log(err)
            }
            return res.render("search-results.html", {places: rows, city: querySearch})
        })
    }
})

/*------------------------------------/
            Open Server
/------------------------------------*/
server.listen(3000)