var java = require('java');

java.classpath.push("lib/SchoolOrganizer.jar");
var Student = java.import("com.jakobcornell.compsci.schoolorganizer.Student"),
    Class = java.import("com.jakobcornell.compsci.schoolorganizer.Class"),
    StudentBody = java.import("com.jakobcornell.compsci.schoolorganizer.StudentBody"),
    Grade = java.import("com.jakobcornell.compsci.schoolorganizer.Grade");


/*
 * GET home page.
 */

exports.index = function(req, res){
  var student = new Student("Jakob Cornell");
  res.render("index", {studentName: student.toStringSync()});
};