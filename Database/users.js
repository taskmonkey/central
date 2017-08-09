const db = require('./dbconnection.js');


allUsers = (clientResponse) => {
    db.query("SELECT * FROM users", (err, resp) => {
        clientResponse.send(resp);
    })
}


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
    let sql = `SELECT users.username, tasks.name, tasks.description, tasks.budget_hours, tasks.actual_hours, tasks.parentid, users_tasks.difficulty, tasks.owner, tasks.status FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};

findProjectOfTask = (userObj, cb) => {
    // given a user id, find all their tasks, then from the list of tasks of a user go up the chain and find the root. group by root id to get rid of duplicates
    let sql = `select MIN(id) as parent from (select 
  @parent:=parentid as parentid, name, id
from
  (select @parent:="${userObj.id}") actual
join 
  (select * from tasks order by id desc) total
where 
  @parent=id) ours`;
    db.query(sql, (err, resp) => {
        cb(resp.parent);
    });
};


allProjectsByUser = (clientResponse, userObj) => {
    let sql = `SELECT tasks.id FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {

        var amountofTasks = resp.length;
        var count = 0;
        var projList = [];

        userObj.tasks.forEach(task => {

            findProjectOfTask(task, (parent) => {
                count++;
                if (projList.indexOf(parent) === -1) {
                    projList.push(parent);
                } 
                if(count === amountofTasks) {
                    // projList.forEach(proj => );
                }
            });
        });
    });
};

findAllTasksOfOwner = (clientResponse, ownerObj) => {
    let sql = `SELECT * FROM tasks WHERE tasks.owner = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};


getUserInfo = (clientResponse, userObj) => {
    let sql = `SELECT * from users WHERE users.username = ?`;
    db.query(sql, [userObj.username], (err, resp) => {
        clientResponse.send(resp);
    })
}


module.exports = {
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    findAllTasksOfUser: findAllTasksOfUser,
    findAllTasksOfOwner: findAllTasksOfOwner,
    allProjectsByUser: allProjectsByUser,
    allUsers: allUsers
}