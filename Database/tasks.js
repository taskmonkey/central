const db = require('./dbconnection.js');
const users_tasks = require('./users_tasks.js');


const getNestedChildren = (arr, parent, index = 0) => {
    let nested = [];
    for(let i = index; i < arr.length; i++) {
        if(arr[i].parentid == parent) {
            let children = getNestedChildren(arr, arr[i].id, index + 1);
            if (arr[i].status === -1) {
                arr[i].className = 'red-node';
            } else if (arr[i].status === 1){
                arr[i].className = 'green-node';
            }
            if(children.length) {
                arr[i].children = children
            }
            nested.push(arr[i])
        }
    }
    return nested;
};

allTasks = (clientResponse) => {
    db.query("SELECT * FROM tasks", (err, resp) => {
        clientResponse.send(resp);
    })
}

createNewTask = (clientResponse, taskObj) => {
    console.log('DB createNewTask: temp: invoked');
    let temp = [taskObj.name, taskObj.description, taskObj.budget_hours, taskObj.owner, taskObj.parentid, taskObj.assignees[0]];
    // let temp = [taskObj.name, taskObj.description, taskObj.budget_hours, taskObj.owner, taskObj.parentid, JSON.parse(taskObj.assignees)];
    console.log('DB createNewTask: temp:', temp);
    console.log('DB createNewTask: temp: assigneestypeof', typeof taskObj.assignees);
    console.log('DB createNewTask: temp: assignees', taskObj.assignees);
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner, parentid, assignee) VALUES (?, ?, ?, ?, ?, ?);`;
    console.log('DB createNewTask: insert query', sql);
    db.query(sql, temp, (err, resp) => {

        var responseObject = {};
        if(taskObj.assignees.length > 0) {
            responseObject.success = [];
            responseObject.failure = [];
            let assignees = taskObj.assignees.length;
            let count = 0;

            taskObj.assignees.forEach(id => {
                let temp = {};
                temp.username = id;
                temp.taskid = resp.insertId;

                giveUserNewTask(temp, () => {

                    count++;
                    responseObject.success.push(id);
                    if (count === assignees) {

                        findOneTask(clientResponse, {taskid: resp.insertId}, responseObject);

                    }
                },() => {
                    count++;
                    responseObject.failure.push(id);
                    if(count === assignees) {
                        findOneTask(clientResponse, {taskid: resp.insertId}, responseObject);

                    }
                });

            });

        } else {
            findOneTask(clientResponse, {taskid: resp.insertId}, responseObject);


        }
    });
};



giveUserNewTask = (userTaskObj, cb, failcb) => {
    db.query("select users.id from users WHERE users.username = ?", [userTaskObj.username], (err, resp) => {
        if (resp && resp.length) {
            db.query("insert into users_tasks (user_id, tasks_id) VALUES (?, ?)", [resp[0].id, userTaskObj.taskid], (err, response) => {
                cb();
            });

        } else {
            failcb();
        }
    });
};

updateActualHours = (clientResponse, hoursObj) => {
    let temp = [hoursObj.actual_hours, hoursObj.taskid];
    let sql = `UPDATE tasks SET actual_hours = ? WHERE id = ?`;
    db.query(sql, temp, (err, resp) => {

        clientResponse.end();
    });
};


findAllChildTasks = (clientResponse, taskObj) => {

    let sql = `select  id, name, description, parentid, budget_hours, actual_hours, owner, status, deficiency, assignee
from    (select * from tasks
         order by parentid, id) tasks_sorted,
        (select @pv := '${taskObj.taskid}')temp
where   find_in_set(parentid, @pv) > 0
and     @pv := concat(@pv, ',', id);`;

    db.query(sql, (err, resp) => {
        let temp = getNestedChildren(resp, taskObj.taskid);
        budgetVsActual(null, taskObj, (totals) => {
            temp.push(totals);
            clientResponse.send(temp);
        });
    });
};

markTaskAsComplete = (clientResponse, taskObj) => {
    let sql = `UPDATE tasks SET status = 1, actual_hours = ? WHERE id = ?`;
    db.query(sql, [taskObj.actual_hours, taskObj.taskid], (err, resp) => {
        clientResponse.end();
    });
};

markTaskAsInProgress = (clientResponse, taskObj) => {
    let sql = `UPDATE tasks SET status = 0 WHERE id = "${taskObj.taskid}"`;
    db.query(sql, (err, resp) => {

        clientResponse.end();
    });
};

deleteTask = (clientResponse, taskObj) => {
    let sql = `DELETE FROM tasks WHERE tasks.id = "${taskObj.taskid}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    });
};

totalBudget = (clientResponse, taskObj) => {
    let sql = ``;
    db.query(sql, (err, resp) => {

    });
};

budgetVsActual = (clientResponse, taskObj, cb) => {
    //Should only be called when task complete
     let sql = `select  SUM(budget_hours) as budgetTotal, SUM(actual_hours) as actualTotal
from    (select * from tasks
         order by parentid, id) tasks_sorted,
        (select @root := '${taskObj.taskid}')temp
where   find_in_set(parentid, @root) > 0
and     @root := concat(@root, ',', id)`;
    db.query(sql, (err, resp) => {
        if(cb) {
            cb(resp[0]);
        } else {
            clientResponse.send(resp[0]);
        }
    })
};

findOneTask = (clientResponse, taskObj, obj) => {
    db.query(`SELECT * from tasks WHERE tasks.id = "${taskObj.taskid}"`, (err, resp) => {
        obj.task = resp[0];
        clientResponse.send(obj);
    })
}

projectOfTask = (clientResponse, taskObj) => {
    // given a task id, find all their tasks, then from the list of tasks of a task go up the chain and find the root. group by root id to get rid of duplicates
    let sql = `select MIN(id) as parent from (select
  @parent:=parentid as parentid, name, id
from
  (select @parent:="${taskObj.taskid}") actual
join
  (select * from tasks order by id desc) total
where
  @parent=id) ours`;
    db.query(sql, (err, resp) => {
        clientResponse.send(JSON.stringify(resp[0]));
    });
};


module.exports = {
    createNewTask: createNewTask,
    updateActualHours: updateActualHours,
    findAllChildTasks: findAllChildTasks,
    markTaskAsComplete: markTaskAsComplete ,
    markTaskAsInProgress: markTaskAsInProgress,
    deleteTask: deleteTask,
    allTasks: allTasks,
    budgetVsActual: budgetVsActual,
    projectOfTask: projectOfTask


}
