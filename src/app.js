const express = require("express");    //we require express as a function
require("./db/conn");
const Student= require("./models/students");

const app = express();                  // to use express
const port = process.env.PORT || 8000 ;  //it will give solid port no. for further excution 

//we need to create route 

app.use(express.json());               //to able to read json files

//this is to get whole students details....
app.get("/students",async(req,res)=>{
    try{
      const studentsData = await Student.find();         //return promise in future
      res.send(studentsData);
    }catch(e){
        res.statusCode(400).send(e);
    }
})

//this is to get unique student daetails using id (usinf find by id method)
app.get("/students/:id",async (req,res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);

        if(!studentData){
            return res.status(404).send();
        }
        else{
            res.send(studentData);
        }
    }catch(e){
        res.status(500).send(e);
    }
})

app.post("/students",(req,res)=>{
        const addingstudent=new Student(req.body);        //creating object of the table student (basically a row)
        console.log(req.body);
        addingstudent.save().then(()=>{                   //saving that row in side the student table
            res.status(201).send(`ok received ${addingstudent}`);             //this is handled using promises
        }).catch((e)=>{
            res.status(400).send(e);
        })
})
//update the students by id
app.patch("/students/:id", async (req,res)=>{
    try{
        const _id = req.params.id;
        const studentupdate = await Student.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(studentupdate)
    }catch(e){
        res.status(404).send(updateStudents);
    }
})

app.delete("/students/:id", async(req,res)=>{
    try{
      const id = req.params.id;
      const deleteStudent = await Student.findByIdAndDelete(id);
      if(!id){
          return res.status(400).send();
      }
      res.send("deleted");
    }catch(e){
          return res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})