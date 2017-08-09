const express = require('express');
const router = express.Router();
const path = require('path');
const users = require('../../Database/users.js');
const tasks = require('../../Database/tasks.js');
const users_tasks = require('../../Datbase/users_tasks.js');


router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
});

router.get('/dashboard', (req, res) => {
  console.log('HOPEFULLY THIS WILL CHANGE SOMETHING IN THE REDUX STORE, AND FORCE THE UPDATE OF OUR PAGE (TO OMIT THE LOGOUT)', req);
});

router.get('/addProject', (req, res) => {
  tasks.createNewProject(res, req.body.params);
});

router.post('/addTask', (req, res)=>{
  //posting a task to the database
  tasks.createNewTask(res, req.body.params);

});

router.get('/allTasksByUser', (req, res)=> {
  //this should query for all tasks given a user id
  //all tasks by User
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

router.get('/budgetVsActual', (req, res)=>{
  //return all the hours spent on each task and all budget hours

});

router.get('/updateActualHours', (req, res) => {
  tasks.updateActualHours(res, req.body.params);
});

router.get('/updateStatusInProgress', (req, res) => {
  tasks.markTaskAsInProgress(res, req.body.params);
});

router.get('/updateStatusComplete', (req, res) => {
  tasks.markTaskAsComplete(res, req.body.params);
});

router.get('/addUserToTask', (req, res) => {
  users_tasks.giveUserNewTask(res, req.body.params);
});

router.get('/addTaskToUser', (req, res) => {
  users_tasks.giveTaskNewUser(res, req.body.params);
});









module.exports = router;
