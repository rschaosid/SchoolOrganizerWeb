var java = require('java');

java.classpath.push("lib/SchoolOrganizer.jar");
var Student = java.import("com.jakobcornell.compsci.schoolorganizer.Student"),
    Class = java.import("com.jakobcornell.compsci.schoolorganizer.Class"),
    StudentBody = java.import("com.jakobcornell.compsci.schoolorganizer.StudentBody"),
    Grade = java.import("com.jakobcornell.compsci.schoolorganizer.Grade");

var JavaDate = java.import("java.util.Date");

var startTime = new JavaDate(new Date(2013, 0, 1).getTime());
var endTime = new JavaDate(new Date(2014, 0, 1).getTime());



exports.index = function(req, res){
  res.render("index");
};

var classes = [];

classes.push(new Class(startTime, endTime));

exports.ui = {
  classList: function(req, res) {
    res.render("classList", {classes: classes});
  },
  
  classList: function(req, res) {
    res.render("classList", {classes: classes});
  },
  
  studentList: function(req, res) {
    res.render("studentList", {students: studentBody.getAllStudents() /* convert to array here */ });
  }
};



exports.api = {
  addClass: function(req, res) {
    classes.push(new Class(req.body.name, new JavaDate(req.body.startDate), new JavaDate(req.body.endDate)));
    res.json({success: true});
  },
  enroll: function(req, res) {
    
  }
}