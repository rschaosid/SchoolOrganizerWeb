var java = require('java');

java.classpath.push("lib/SchoolOrganizer.jar");
var Student = java.import("com.jakobcornell.compsci.schoolorganizer.Student"),
    Class = java.import("com.jakobcornell.compsci.schoolorganizer.Class"),
    StudentBody = java.import("com.jakobcornell.compsci.schoolorganizer.StudentBody"),
    Grade = java.import("com.jakobcornell.compsci.schoolorganizer.Grade");

var startTime = new Date(2013, 1, 1);
var endTime = new Date(2014, 1, 1);


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render("index");
};

var classes = [];

classes.push(new Class(startTime, endTime));

exports.classList = function(req, res) {
  res.render("classList", {classes: classes});
};
