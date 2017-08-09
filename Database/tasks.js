const db = require('./dbconnection.js');

createNewProject = (clientResponse, taskObj) => {
    let temp = [taskObj.name, taskObj.budget_hours, taskObj.owner];
    let sql = `INSERT INTO tasks (name, budget_hours, owner) VALUES (?, ?, ?);`;
    db.query(sql, temp, (err, resp) => {
        
        clientResponse.send(resp.insertId);
    });
};

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