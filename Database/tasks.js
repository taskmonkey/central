const db = require('./dbconnection.js');
const users_tasks = require('./users_tasks.js');

createNewProject = (clientResponse, taskObj) => {
    let temp = [taskObj.name, taskObj.description, taskObj.budget_hours, taskObj.owner];
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner) VALUES (?, ?, ?, ?);`;
    db.query(sql, temp, (err, resp) => {
        if(taskObj.assignees.length > 0) {
            taskObj.assignees.forEach(id => {
                id.taskid = resp.insertId;
                //giveUserNewTask({username: hello);
            });

        } else {
            clientResponse.send(resp.insertId);

        }
    });
};

giveUserNewTask = (userTaskObj) => {
    db.query("select users.id from users WHERE users.username = ?", [userTaskObj.username], (err, resp) => {
        if (resp) {
            // db.query("insert into users_tasks (user_id, task_id) VALUES (?, ?)", [resp.id, ], (err, response) => {

            // });

        } 
    });
}

// let sanitize = [userTaskObj.userid, userTaskObj.taskid];
//     let sql = `INSERT INTO users_tasks (user_id, task_id) VALUES (?, ?)`;
//     db.query(`select * from users_tasks where user_id = ?`, [userTaskObj.userid], (err, res) => {
//         if (res) {
//             db.query(sql, sanitize, (err, resp) => {
                
//                 clientResponse.send(resp.insertId);
//             });
//         } else {
//             clientResponse.end();
//         }

//     });

createNewTask = (clientResponse, taskObj) => {
    let temp = [taskObj.name, taskObj.budget_hours, taskObj.owner, taskObj.parentid];
    let sql = `INSERT INTO tasks (name, budget_hours, owner, parentid) VALUES (?, ?, ?, ?, ?);`;
    db.query(sql, temp, (err, resp) => {
      
        clientResponse.send(resp);
    });
};

updateActualHours = (clientResponse, hoursObj) => {
    let temp = [hoursObj.actual_hours, hoursObj.id];
    let sql = `UPDATE tasks SET actual_hours = ? WHERE id = ?`;
    db.query(sql, temp, (err, resp) => {
       
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
};

totalBudget = (clientResponse, taskObj) => {
    let sql = ``;
    db.query(sql, (err, resp) => {

    });
};

budgetVsActual = (clientResponse, taskObj) => {
    //Should only be called when task complete
     let sql = `select  id, name, parentid, budget_hours, actual_hours
from    (select * from tasks
         order by parentid, id) tasks_sorted,
        (select @pv := '${taskObj.taskid}')temp
where   find_in_set(parentid, @pv) > 0 
and     @pv := concat(@pv, ',', id);`;
};
module.exports = {
    createNewProject: createNewProject,
    createNewTask: createNewTask,
    updateActualHours: updateActualHours,
    findAllChildTasks: findAllChildTasks,
    markTaskAsComplete: markTaskAsComplete ,
    markTaskAsInProgress: markTaskAsInProgress,
    deleteTask: deleteTask
}