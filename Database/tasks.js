const db = require('./database.js');

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

module.exports = {
    createNewProject: createNewProject,
    createNewTask: createNewTask,
    updateActualHours: updateActualHours,
    findAllChildTasks: findAllChildTasks,
    markTaskAsComplete: markTaskAsComplete ,
    markTaskAsInProgress: markTaskAsInProgress,
    deleteTask: deleteTask
}