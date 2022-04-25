const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }                         //table creation
});

//we will create a new collection
const Student = new mongoose.model("Student", studentSchema);     //modelling our table
module.exports = Student;                                         //letting it get ready to use
