const db = require('./database.js');

/////////////////////////////TASKS////////////////////TASKS///////////////////TASKS/////////////////////

createNewProject = (clientResponse, taskObj) => {
    let sql = `INSERT INTO tasks (name, budget_hours, owner) VALUES ("${taskObj.name}", "${taskObj.budget_hours}", "${taskObj.owner}");`;
    db.query(sql, (err, resp) => {
        clientResponse.send(resp.insertId);
    });
};

createNewTask = (clientResponse, taskObj) => {
    let sql = `INSERT INTO tasks (name, budget_hours, owner, parentid) VALUES ("${taskObj.name}", "${taskObj.budget_hours}", "${taskObj.owner}", "${taskObj.parentid}");`;
    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};

updateActualHours = (clientResponse, hoursObj) => {
    let sql = `UPDATE tasks SET actual_hours = "${hoursObj.actual_hours}" WHERE id = "${hoursObj.id}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    });
};

findAllChildTasks = (clientResponse, taskObj) => {
    let sql = `select  id, name, parentid
from    (select * from tasks
         order by parentid, id) tasks_sorted,
        (select @pv := '${taskObj.taskid}')temp
where   find_in_set(parentid, @pv) > 0 
and     @pv := concat(@pv, ',', id);`;

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};

markTaskAsComplete = (clientResponse, taskObj) => {
    let sql = `UPDATE tasks SET status = 1 WHERE id = "${taskObj.id}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    });
};

markTaskAsInProgress = (clientResponse, taskObj) => {
    let sql = `UPDATE tasks SET status = 0 WHERE id = "${taskObj.id}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    });
};
deleteTask = (clientResponse, taskObj) => {
    let sql = `DELETE FROM tasks WHERE tasks.id = "${taskObj.id}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    });
}

////////////////////////////////////USERS/////////////USERS//////////////USERS//////////////////////////


createNewUser = (clientResponse, userObj) => {
    let sql = `INSERT INTO users (username, token) VALUES ("${userObj.username}", "${userObj.token}");`;
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
    let sql = `SELECT * FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};


findAllTasksOfOwner = (clientResponse, ownerObj) => {
    let sql = `SELECT * FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.id}";`; 
};
/////////////////////////////////////////USERS_TASKS/////////////////////////////////////////////////////

giveUserNewTask = (clientResponse, userTaskObj) => {
    let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES ("${userTaskObj.userid}", "${userTaskObj.taskid}")`;
    db.query(sql, (err, resp) => {
        clientResponse.send(resp.insertId);
    });
}




///////This should be chained when someone makes a new task ///////

giveTaskNewUser = (clientResponse, userTaskObj) => {
    let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES ("${userTaskObj.userid}", "${userTaskObj.taskid}");`;
    db.query(sql, (err, resp) => {
        clientResponse.send(resp.insertId);
    })
}


//////////////////////TODO///////TODO//////TODO////////TODO/////////TODO////////


module.exports = {
    'createNewTask': createNewTask,
    'updateActualHours': updateActualHours,
    'findAllChildTasks': findAllChildTasks,
    'createNewUser': createNewUser
}