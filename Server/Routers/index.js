const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../../Database/users.js');
const tasks = require('../../Database/tasks.js');
const users_tasks = require('../../Database/users_tasks.js');
const Sequelize = require('sequelize');

/*

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


// {username: ''}
// gives back id, us

router.get('/getUserInfo', (req, res) => {
  
  
  users.getUserInfo(res, req.query);
});


//{userid: ''}
router.get('/allProjectsByUser', (req, res) => {
  
  users.allProjectsByUser(res, req.query);
})




router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
});

router.get('/dashboard', (req, res) => {
  console.log('HOPEFULLY THIS WILL CHANGE SOMETHING IN THE REDUX STORE, AND FORCE THE UPDATE OF OUR PAGE (TO OMIT THE LOGOUT)', req);
});


// router.get('/allTheData', (req, res) => {
//   // inside the axios request package the nickname in {params: }
  


// });



////////// Use addProject on the form page. add a property of assignees that has an array of all the names of people trying to be added to new Project

// project object as well as an assignees array attached of everyone being assigned to the project
//WILL RETURN AN OBJECT {'taskid" : 'id here'} of the taskid of the new project
//will also return two arrays "success" and "failure" which shows which users were sucessfully given the task or failed to give task

router.post('/addProject', (req, res) => {
  console.log(req.body);
  
  tasks.createNewProject(res, req.body);
  
});


////////////////////////////////////////////////

router.post('/addTask', (req, res)=>{
  //posting a task to the database
  tasks.createNewTask(res, req.body);

});

router.get('/allTasksByUser', (req, res)=> {
  // gets all tasks assigned to users
  users.findAllTasksOfUser(res, req.query);
});


//pass in userid
router.get('/allOpenTasksOfUser', (req, res) => {
  console.log(req.query);
  
  users.openTasksOfUser(res, req.query);
});


//given a project id
// Only gives back children. WON'T GIVE BACK THE ACTUAL PROJECT
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
  users_tasks.giveUserNewTask(res, req.body.params);
});

router.post('/addTaskToUser', (req, res) => {
  users_tasks.giveTaskNewUser(res, req.body.params);
});









module.exports = router;
