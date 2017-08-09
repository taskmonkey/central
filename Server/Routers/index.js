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
  users.getuserInfo(res, req.body.params);
});

router.get('/allProjectsByUser', (req, res) => {
  users.allProjectsByUser(res, req.body.params);
})




router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
});

router.get('/dashboard', (req, res) => {
  console.log('HOPEFULLY THIS WILL CHANGE SOMETHING IN THE REDUX STORE, AND FORCE THE UPDATE OF OUR PAGE (TO OMIT THE LOGOUT)', req);
});


router.get('/allTheData', (req, res) => {
  // inside the axios request package the nickname in {params: }
  


});




router.post('/addProject', (req, res) => {
  tasks.createNewProject(res, req.body.params);
  
});

router.post('/addTask', (req, res)=>{
  //posting a task to the database
  tasks.createNewTask(res, req.body.params);

});

router.get('/allTasksByUser', (req, res)=> {
  // gets all tasks assigned to users
  users.findAllTasksOfUser(res, req.body.params);
});



router.get('/allChildTasks', (req,res)=>{
  //this should query FOR All Child Tasks
  tasks.findAllChildTasks(res, req.body.params);
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
  tasks.updateActualHours(res, req.body.params);
});

router.put('/updateStatusInProgress', (req, res) => {
  tasks.markTaskAsInProgress(res, req.body.params);
});

router.put('/updateStatusComplete', (req, res) => {
  tasks.markTaskAsComplete(res, req.body.params);
});









router.post('/addUserToTask', (req, res) => {
  users_tasks.giveUserNewTask(res, req.body.params);
});

router.post('/addTaskToUser', (req, res) => {
  users_tasks.giveTaskNewUser(res, req.body.params);
});









module.exports = router;
