var java = require('java');

java.classpath.push("lib/SchoolOrganizer.jar");
var Student = java.import("com.jakobcornell.compsci.schoolorganizer.Student"),
    Class = java.import("com.jakobcornell.compsci.schoolorganizer.Class"),
    StudentBody = java.import("com.jakobcornell.compsci.schoolorganizer.StudentBody"),
    Grade = java.import("com.jakobcornell.compsci.schoolorganizer.Grade"),
    Integer = java.import("java.lang.Integer");

var JavaDate = java.import("java.util.Date");

var studentBody = new StudentBody();

exports.index = function(req, res){
  res.render("index");
};

var classes = [];

function classFromClassid(classid) {
  for(var i=0;i<classes.length;i++)
    if(classes[i].hashCodeSync() == classid)
      return classes[i];
}

function studentFromStudentid(studentid) {
  var students = studentBody.getAllStudentsSync().toArraySync();
  for(var i=0;i<students.length;i++)
    if(students[i].hashCodeSync() == studentid)
      return students[i];
}

exports.loadClass = function(req, res, next) {
  req.cl = classFromClassid(req.params.classid || req.body.classid);
  next();
};

exports.loadStudent = function(req, res, next) {
  req.student = studentFromStudentid(req.params.studentid || req.body.studentid);
  next();
};

exports.ui = {
  home: function(req, res) {
    res.render('home');
  },
  
  classList: function(req, res) {
    res.render('classList', {classes: classes});
  },
  
  classDetail: function(req, res) {
    res.render('classDetail', {cl: req.cl, studentBody: studentBody});
  },
  
  newClass: function(req, res) {
    res.render('newClass');
  },
  
  studentList: function(req, res) {
    res.render('studentList', {studentBody: studentBody});
  },
  
  studentDetail: function(req, res) {
    res.render('studentDetail', {student: req.student});
  },
  
  newStudent: function(req, res) {
    res.render('newStudent');
  },
  
  enrollmentDetail: function(req, res) {
    res.render('enrollmentDetail', {student: req.student, semester: parseInt(req.params.semester), bloq: parseInt(req.params.block), classes: classes});
  }
};

exports.api = {
  newClass: function(req, res) {
    classes.push(new Class(req.body.name));
    res.redirect('/classes');
  },
  
  removeClass: function(req, res) {
    if(classes.indexOf(req.cl) > -1)
      classes.splice(classes.indexOf(req.cl), 1)
    studentBody.getAllStudentsSync().toArraySync().forEach(function(student) {
      if(student.isEnrolledSync(req.cl))
        student.unenrollSync(req.cl);
    });
    res.redirect('/classes')
  },
  
  addSession: function(req, res) {
    req.cl.addSessionSync(new JavaDate(parseInt(req.body.date)));
    res.redirect('/class/'+req.cl.hashCodeSync());
  },
  
  removeSession: function(req, res) {
    req.cl.removeSessionSync(new JavaDate(parseInt(req.body.date)));
    res.redirect('/class/'+req.cl.hashCodeSync());
  },
  
  newStudent: function(req, res) {
    var student = new Student(req.body.name);
    studentBody.addStudentSync(student);
    res.redirect('/student/'+student.hashCodeSync());
  },
  
  removeStudent: function(req, res) {
    studentBody.removeStudentSync(req.student);
    res.redirect('/students');
  },
  
  enroll: function(req, res) {
    req.student.enrollSync(parseInt(req.body.semester), parseInt(req.body.block), req.cl);
    res.redirect('/student/'+req.student.hashCodeSync());
  },
  
  unenroll: function(req, res) {
    req.student.unenrollSync(req.cl);
    res.redirect('/student/'+req.student.hashCodeSync());
  },
  
  setAttendance: function(req, res) {
    req.cl.setAttendanceSync(new JavaDate(parseInt(req.body.date)), req.student, req.body.present == 'present')
    res.redirect('/class/'+req.cl.hashCodeSync());
  },
  
  setGrade: function(req, res) {
    req.student.assignGradeSync(req.cl, Grade[req.body.grade]);
    res.redirect('/enrollment/'+req.student.hashCodeSync()+'/'+req.body.semester+'/'+req.body.block);
  }
};