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
    let sql = `DELETE FROM users WHERE users.id = "${userObj.userid}"`;
    db.query(sql, (err, resp) => {
        clientResponse.end();
    })
}

findAllTasksOfUser = (clientResponse, userObj) => {
    let sql = `SELECT users.username, tasks.name, tasks.description, tasks.budget_hours, tasks.actual_hours, tasks.parentid, users_tasks.difficulty, tasks.owner, tasks.status FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.userid}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};

findProjectOfTask = (userObj, cb) => {
    // given a user id, find all their tasks, then from the list of tasks of a user go up the chain and find the root. group by root id to get rid of duplicates
    let sql = `select MIN(id) as parent from (select 
  @parent:=parentid as parentid, name, id
from
  (select @parent:="${userObj.userid}") actual
join 
  (select * from tasks order by id desc) total
where 
  @parent=id) ours`;
    db.query(sql, (err, resp) => {
        //console.log(resp, 'proj by task');
        cb(resp[0].parent);
    });
};


allProjectsByUser = (clientResponse, userObj) => {
    let sql = `SELECT tasks.id FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.userid}";`; 

    db.query(sql, (err, resp) => {
        //console.log(resp);
        var amountofTasks = resp.length;
        var count = 0;
        var projList = [];
        
        resp.forEach(task => {

            findProjectOfTask(task, (parent) => {
                count++;
                //console.log(parent);
                if (projList.indexOf(parent) === -1) {
                    projList.push(parent);
                } 
                if (count === amountofTasks) {
                    var amountOfProj = projList.length;
                    var counter = 0;
                    var projData = [];
                    projList.forEach(proj => {
                        db.query(`select * from tasks where id = "${proj}"`, (err, resp) => {
                            counter++;
                            if(resp) {
                                projData.push(resp[0]);
                            }
                            if(counter === amountOfProj) {
                                clientResponse.send(projData);
                            }
                        })
                    });
            
                }
            });
        });
    });
};

findAllChildTasks = (taskObj, cb) => {
    let sql = `select  id, name, parentid
from    (select * from tasks
         order by parentid, id) tasks_sorted,
        (select @pv := '${taskObj.taskid}')temp
where   find_in_set(parentid, @pv) > 0 
and     @pv := concat(@pv, ',', id);`;

    db.query(sql, (err, resp) => {
        console.log(resp);
    });
};

findAllTasksOfOwner = (clientResponse, ownerObj) => {
    let sql = `SELECT * FROM tasks WHERE tasks.owner = "${userObj.userid}";`; 

    db.query(sql, (err, resp) => {
        clientResponse.send(resp);
    });
};


getUserInfo = (clientResponse, userObj) => {
    let sql = `SELECT * from users WHERE users.username = ?`;
    console.log(userObj, 'userobj');
    db.query(sql, [userObj.username], (err, resp) => {
        if(resp){
            clientResponse.send(resp[0]);
        } else {
            clientResponse.send(resp);
        }
    })
}

openTasksOfUser = (clientResponse, userObj) => {
    let sql = `SELECT * from users INNER JOIN 
    users_tasks ON users.id = users_tasks.user_id INNER JOIN tasks ON users_tasks.tasks_id = tasks.id WHERE users.id = "${userObj.userid}" AND tasks.status IN (-1,0);`;
    db.query(sql, (err, resp) => {

        clientResponse.send(resp);
    })
};

module.exports = {
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    findAllTasksOfUser: findAllTasksOfUser,
    findAllTasksOfOwner: findAllTasksOfOwner,
    allProjectsByUser: allProjectsByUser,
    allUsers: allUsers,
    getUserInfo: getUserInfo,
    openTasksOfUser: openTasksOfUser
}