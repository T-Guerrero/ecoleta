const sqlite3 = require("sqlite3").verbose()


//db create
const db = new sqlite3.Database("./src/database/database.db")

//defining db operations
db.serialize(() => {
    /*SQL SYNTAX */
    //create table
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
/*

            All methods already implemented at the server file

    //Insert data
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

    //Manual test
    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Papersider",
        "Guilherme Gemballa",
        "260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    db.run(query, values, function(err) {
        if (err){ 
            //err == Erro
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    })

    //consult data
    db.all('SELECT * FROM places', function(err, rows) {
        if (err){
            return console.log(err)
        }
        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    //delete data
    db.run('DELETE FROM places WHERE id = ?', [], function(err) {
        if (err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })
*/
})

//Export data
module.exports = db