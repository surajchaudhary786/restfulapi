const express = require("express");    //we require express as a function
require("./db/conn");
const Student= require("./models/students");

const app = express();                  // to use express
const port = process.env.PORT || 8000 ;  //it will give solid port no. for further excution 
const studentRouter = require("./router/student")

//we need to create route 

app.use(express.json());               //to able to read json files
app.use(studentRouter);                //to able to use router


app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})