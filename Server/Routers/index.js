const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/node_modules/auth0-js/build/auth0.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/auth0-js/build/auth0.js'));
})
router.get('/dashboard', (req, res) => {
  console.log('HOPEFULLY THIS WILL CHANGE SOMETHING IN THE REDUX STORE, AND FORCE THE UPDATE OF OUR PAGE (TO OMIT THE LOGOUT)', req);
})

router.get('/allTasksByUser', (req, res)=> {
  //this should query for all tasks given a user id
})

router.get('/allChildTasks', (req,res)=>{
  //this should query FOR All Child Tasks
})

router.get('/allUsers', (req, res)=>{
  //this should query FOR ALL USERS IN OUR DATABASE
})

router.get('/allRelationalTasks', (req, res) =>{
  //this should bring back all users and  the tasks that each user owns 
})

router.get('/budgetVsActual', (req, res)=>{
  //return all the hours spent on each task and all budget hours
})


router.post('/addTask', (req, res)=>{
  //posting a task to the database
})










module.exports = router;
