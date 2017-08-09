const db = require('./dbconnection.js');

giveUserNewTask = (clientResponse, userTaskObj) => {
    let sanitize = [userTaskObj.userid, userTaskObj.taskid];
    let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES (?, ?)`;
    db.query(`select * from users_tasks where user_id = ?`, [userTaskObj.userid], (err, res) => {
        if (res) {
            db.query(sql, sanitize, (err, resp) => {
                
                clientResponse.send(resp.insertId);
            });
        } else {
            clientResponse.end();
        }

    });
};

///////This should be chained when someone makes a new task ///////

giveTaskNewUser = (clientResponse, userTaskObj) => {
    let sanitize = [userTaskObj.userid, userTaskObj.taskid];
    let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES (?, ?);`;
    db.query(sql, sanitize, (err, resp) => {
      
        clientResponse.send(resp.insertId);
    })
};

getTable = (clientResponse) => {
    db.query("SELECT * from users_tasks", (err, resp) => {
        clientResponse.send(resp);
    })
}

module.exports = {
    giveUserNewTask: giveUserNewTask,
    giveTaskNewUser: giveTaskNewUser,
    getTable: getTable
}

