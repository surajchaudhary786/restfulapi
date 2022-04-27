const express =  require("express");                //we require express as a function
      require    ("./db/conn");                     //connecting database
const path    =  require("path");                   //This is included to get __dir work
const hbs     = require("hbs");                     //to get handlebars working

const app     = express();                          // to use express
const port    = process.env.PORT || 8000 ;          //it will give solid port no. for further excution 

const static_path   = path.join(__dirname,"../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));                   //this will redirect to hbs handeler index.hbs
app.set("view engine","hbs");                           // it denotes which one we using pug,hbs,or cors
app.set("views",template_path);                         // our views is changed to template_path
hbs.registerPartials(partials_path) 

app.use(express.json());                               //to able to read json files
app.use(express.urlencoded({extended:false}));         //to able to read data coming in html format

app.get("/",(req, res)=>{
    res.render("index")
});

//we need to create route 
//--student route-----------------------------------------------
const studentRouter = require("./router/student")      //referencing student router
app.use(studentRouter);                                //to able to use router(student)  

//--teacher route----------------------------------------------
// const TeacherRouter = require("./router/teacher")      //referencing Teacher router
// app.use(teacherRouter);                                //to able to use router(Teacher) 


//This opens the port for data transmission ; 
app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})