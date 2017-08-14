const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../../Database/users.js');
const tasks = require('../../Database/tasks.js');
const users_tasks = require('../../Database/users_tasks.js');
const Sequelize = require('sequelize');

/*

  1. Hit "/getUserInfo" route to get needed user data like id

  2. Hit "/allProjectsByUser" with an object like {params: {id: "user id"}} where inside 'user id' goes an integer.
    this gives back data to all of the root tasks




  GENERAL REQUEST STANDARDS
  taskid:
  if request includes a taskid give the req object have a key value pair taskid: 'your taskid here'

  userid:
  if request includes userid, then object includes userid: 'your userid here'

*/

router.get('/entireTasks', (req, res) => {
  tasks.allTasks(res);
})

router.get('/entireUsers', (req, res) => {
  users.allUsers(res);
});

router.get('/entireUsersTasks', (req, res) => {
  users_tasks.getTable(res);
})

router.get('/getUserInfo', (req, res) => {


  users.getUserInfo(res, req.query);
});

router.get('/allProjectsByUser', (req, res) => {

  users.allProjectsByUser(res, req.query);
});


router.get('/projectOfTask', (req, res) => {

  tasks.projectOfTask(res, req.query);
})




router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
});






router.post('/addProject', (req, res) => {
  tasks.createNewTask(res, req.body);

});

router.post('/addTask', (req, res)=>{
  //posting a task to the database
  tasks.createNewTask(res, req.body);

});

router.get('/allTasksByUser', (req, res)=> {
  // gets all tasks assigned to users
  users.findAllTasksOfUser(res, req.body);
});



router.get('/allOpenTasksOfUser', (req, res) => {
  users.openTasksOfUser(res, req.query);
});


router.get('/allChildTasks', (req,res)=>{

  tasks.findAllChildTasks(res, req.query);
});


router.get('/allUsersInProject', (req, res)=>{
  //this should query FOR ALL USERS IN OUR DATABASE


});

router.get('/allRelationalTasks', (req, res) =>{
  //this should bring back all users and  the tasks that each user owns

});

router.get('/totalBudgetHours', (err, resp) => {
  //return total budget
  //gets all children, then sums up total budget from them.

});

router.get('/budgetVsActual', (req, res)=>{
  //return difference between budget and actual hours

});

router.put('/updateActualHours', (req, res) => {
  tasks.updateActualHours(res, req.body);
});

router.put('/updateStatusInProgress', (req, res) => {
  tasks.markTaskAsInProgress(res, req.body);
});

router.put('/updateStatusComplete', (req, res) => {
  tasks.markTaskAsComplete(res, req.body);
});



router.post('/addUserToTask', (req, res) => {
  users_tasks.giveUserNewTask(res, req.body);
});

router.post('/addTaskToUser', (req, res) => {
  users_tasks.giveTaskNewUser(res, req.body);
});



router.get('/dashboard', (req, res) => {
  console.log('dashy');
});

// router.get('*', (req, res) => {
//   console.log('wildcard hit');
//   res.sendFile(path.resolve(__dirname, '../../static/index.html'));
// });




module.exports = router;
