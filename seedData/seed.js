const db = require('../Database/dbConnection.js');


let userData = [
    {
        username: 'richsong003',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Simple_light_bulb_graphic.png'
    },
    {
        username: 'austenesus',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Simple_light_bulb_graphic.png'
    },
    {
        username: 'jardini.alex',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Simple_light_bulb_graphic.png'
    },
    {
        username: 'ham-d',
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Simple_light_bulb_graphic.png'
    } 

];



let rootTask = {
    name: 'root task',
    description: 'root task description',
    budget_hours: 30,
    owner: 1
};

let taskData = [
    {
        name: "child of root",
        description: 'description of child task',
        budget_hours: 20,
        owner: 1,
        parentid: 1,

    },
    {
        name: 'child of root',
        description: 'description of child task',
        budget_hours: 10,
        owner: 1,
        parentid: 2,

    },
    {
        name: "child of first child",
        description: 'description of first child',
        budget_hours: 10,
        owner: 1,
        parentid: 3,

    },
    {
        name: 'child of second child',
        description: 'description of child of child',
        budget_hours: 4,
        owner: 1,
        parentid: 1,

    }, 
    {
        name: 'third child in chain',
        description: 'sometimes i thought we\'d never make it',
        budget_hours: 2,
        owner: 1,
        parentid: 1
    },
    {
        name: 'child of second',
        description: 'last child',
        budget_hours: 2,
        owner: 1,
        parentid: 2

    },
    {
        name: 'child of root',
        desription: 'last child',
        budget_hours: 3,
        owner: 1,
        parentid: 1
    }
];

let users_tasks = [
    {
        userid: 2,
        taskid: 4
    },
    {
        userid: 2,
        taskid: 3
    },
    {
        userid: 2,
        taskid: 2
    },
    {
        userid: 3,
        taskid: 2
    },
    {
        userid: 3,
        taskid: 3
    },
    {
        userid: 4,
        taskid: 2
    },
    {
        userid: 4,
        taskid: 3
    }
]


createNewProject = (clientResponse, taskObj) => {
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner) VALUES ("${taskObj.name}", "${taskObj.description}","${taskObj.budget_hours}", "${taskObj.owner}");`;
    db.query(sql, (err, resp) => {
        count++;
        if (err) {
            console.log('something terrible happened');
            console.log(err);
            process.exit();
        }
        if (count === totalSeeds) {
            process.exit();
        }
        console.log('created new Project');
        taskData.forEach((task, i) => {
            createNewTask(null, task);
        });
        //clientResponse.send(resp.insertId);
    });
};

createNewTask = (clientResponse, taskObj) => {
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner, parentid) VALUES ("${taskObj.name}", "${taskObj.description}", "${taskObj.budget_hours}", "${taskObj.owner}", "${taskObj.parentid}");`;
    db.query(sql, (err, resp) => {
        count++;
        taskCounter++;
        if (err) {
            console.log(err);
            console.log('error seeding Task');
            process.exit();
        } else {
            console.log('Task seeded');
        }
        if(taskCounter === totalTasks) {
            users_tasks.forEach((packet, i) => {
                giveUserNewTask(null, packet);
            })
        }
        if (count === totalSeeds) {
            process.exit();
        }
        //clientResponse.send(resp);
    });
};

createNewUser = (clientResponse, userObj) => {
    let sql = `INSERT INTO users (username, image) VALUES ("${userObj.username}", "${userObj.image}");`;
    db.query(sql, (err, res) => {
        count++;
        userCounter++;
        if (err) {
            console.log('error seeding user');
            
        } else {
            console.log('User seeded');
        }
        if(count === totalSeeds) {
            process.exit();
        }
        if(userCounter === totalUsers) {
            createNewProject(null, rootTask);
        }
    });
};

giveUserNewTask = (clientResponse, userTaskObj) => {
    let sql = `INSERT INTO users_tasks (user_id, tasks_id) VALUES ("${userTaskObj.userid}", "${userTaskObj.taskid}")`;
    db.query(sql, (err, resp) => {
        count++;
        if (err) {
            console.log(err);
            console.log('error giving task to user');
            if (count === totalSeeds) {
                process.exit();
            }
        } else {
            console.log('task given to user');
            if (count === totalSeeds) {
                console.log('inside user new task');
                process.exit();
            }
        }
        //clientResponse.send(resp.insertId);
    });
};

var totalSeeds = users_tasks.length + userData.length + taskData.length;

var count = 0;

var totalUsers = userData.length;
var userCounter = 0;

var totalTasks = taskData.length;
var taskCounter = 0;

userData.forEach((user, i) => createNewUser(null, user));

findAllTasksOfUser = (clientResponse, userObj) => {
    let sql = `SELECT tasks.name, tasks.description, tasks.budget_hours, tasks.actual_hours, tasks.parentid, users_tasks.difficulty, tasks.owner, tasks.status FROM users 
    INNER JOIN users_tasks ON users.id = users_tasks.user_id 
    INNER JOIN tasks ON users_tasks.tasks_id = tasks.id
    WHERE users.id = "${userObj.id}";`; 

    db.query(sql, (err, resp) => {
        console.log(err);
        console.log(resp);
        //clientResponse.send(resp);
    });
};



//findAllTasksOfUser(null, {id: 2});










