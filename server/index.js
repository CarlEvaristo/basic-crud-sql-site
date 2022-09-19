import express from "express"
import mysql from "mysql2"        // FIXING MYSQL ERROR: STEP1 IMPORT MYSQL2 IPV MYSQL
import cors from "cors"                               // STEP2 SET PORT IN MYSQL.CREATECONNECTION.... FIND PORT WITH QUERY IN WORKBENCH: SHOW GLOBAL VARIABLES LIKE 'PORT';
                                                      // STEP3 RUN QUERY IN SQL WORKBENCH:  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
const app = express()
app.use(cors())                         // cors prevents errors when making requests from front to backend
app.use(express.json())

const db = mysql.createConnection({     // connect todb
    user: "root",                       //this is default username (unless you changed username)
    host: "localhost",  
    port: 3306,                         // SET PORT HERE , FIND PORT WITH QUERY IN WORKBENCH: SHOW GLOBAL VARIABLES LIKE 'PORT';
    password: "password",               // this is "" or "password" 
    database: "employeeSystem"          //mind upper/lowercase
})

db.connect()

app.post("/create", (req, res)=>{
    const name = req.body.name          // get posted data from req body
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

        db.query(                       // save data to db/table
            "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",  //NOT PASS VALUES DIRECTLY =>THIS IS CONVENTION (BECAUSE OF SECURITY)
            [name, age, country, position, wage], 
            (err, result) => err ? console.log(err) : res.send(result))
})

app.get("/employees", (req,res) => {
    db.query("SELECT * FROM employees", (err, result) => err ? console.log(err) : res.send(result))
})

app.put("/update", (req,res)=>{     // hoeft geen unieke route te zijn, mag bijv ook hetzelfde als post request "/create")
    const id = req.body.id 
    const wage = req.body.wage
    db.query("UPDATE employees SET wage = ? WHERE id = ? ", 
    [wage, id],
    (err,result) =>  err ? console.log(err) : res.send(result)
    )
})       

app.delete("/delete/:id", (req,res)=> {       // delete request: geen body!! maar params (MIND THE COLON!!)
    const id= req.params.id                   // re.params
    db.query("DELETE FROM employees WHERE id = ?", [id],
        (err,result) =>  err ? console.log(err) : res.send(result)
    )
})

app.listen(3001, ()=>{
    console.log("Server is running on port 3001.")
})