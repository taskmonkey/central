const db = require('./database.js');

createNewUser = (clientResponse, userObj) => {
    let sql = `INSERT INTO users (username, image) VALUES ("${userObj.username}", "${userObj.image}");`;
    db.query(sql, (err, res) => {
        clientResponse.send(res.insertId);
    });
};

deleteUser = (clientResponse, userObj) => {
    let sql = `DELETE FROM users WHERE users.id = "${userObj.id}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    })
}

findAllTasksOfUser = (clientResponse, userObj) => {
    let sql = `SELECT (tasks.name, tasks.description, tasks.budget_hours, tasks.actual_hours, tasks.parentid, users_tasks.difficulty, tasks.owner, tasks.status) FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};

findAllProjectsOfUser = (clientResponse, userObj) => {
    // given a user id, find all their tasks, then from the list of tasks of a user go up the chain and find the root. group by root id to get rid of duplicates
    let sql = ``;
    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    })
};

//     let sql = `select  id, name, parentid
// from    (select * from tasks
//          order by parentid, id) tasks_sorted,
//         (select @pv := '${taskObj.taskid}')temp
// where   find_in_set(parentid, @pv) > 0 
// and     @pv := concat(@pv, ',', id);`;

findAllTasksOfOwner = (clientResponse, ownerObj) => {
    let sql = `SELECT * FROM tasks WHERE tasks.owner = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};

module.exports = {
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    findAllTasksOfUser: findAllTasksOfUser,
    findAllTasksOfOwner: findAllTasksOfOwner
}