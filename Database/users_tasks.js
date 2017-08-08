const db = require('./database.js');

giveUserNewTask = (clientResponse, userTaskObj) => {
    let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES ("${userTaskObj.userid}", "${userTaskObj.taskid}")`;
    db.query(sql, (err, resp) => {
        
        clientResponse.send(resp.insertId);
    });
};

///////This should be chained when someone makes a new task ///////

giveTaskNewUser = (clientResponse, userTaskObj) => {
    let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES ("${userTaskObj.userid}", "${userTaskObj.taskid}");`;
    db.query(sql, (err, resp) => {
      
        clientResponse.send(resp.insertId);
    })
};

module.exports = {
    giveUserNewTask: giveUserNewTask,
    giveTaskNewUser: giveTaskNewUser
}

