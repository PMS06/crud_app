const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'root123',
    database: 'employee system'
})
app.post('/create',(req,res) =>{
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],(err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("values inserted");
        }
    }
    )
})

app.get('/employees',(req,res)=>{
    db.query("SELECT * FROM employees", (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
  
    console.log('ID:', id);
    console.log('Wage:', wage);
  
    db.query("UPDATE employees SET wage = ? WHERE id = ?", [wage, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Wage updated");
      }
    });
  });
  
  app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE ID = ?", [id], (err, result) => { // Change this line
      if (err) {
        console.log(err);
      } else {
        res.send("Employee deleted");
      }
    });
  });
  
  
  
  

app.listen(3001, ()=>{
    console.log("Server running")
})