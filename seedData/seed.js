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



let rootTask = [{
    name: 'Renovate house',
    description: 'get on that LA real estate bubble',
    budget_hours: 30,
    owner: 1
}, 
{
    name: 'Upgrade from React to Backbone',
    description: 'sometimes going backwards is going forward',
    budget_hours: 100,
    owner: 2
}];

let taskData = [
    {
        name: "Fix Kitchen",
        description: 'in need of thorough repairs',
        budget_hours: 20,
        owner: 1,
        parentid: 1,

    },
    {
        name: 'install marble coutertops',
        description: 'marble rye, marble halvah, marble countertops',
        budget_hours: 10,
        owner: 1,
        parentid: 3,

    },
    {
        name: "properly seal new countertops",
        description: 'i want to be able to gaze into my own eyes while making lunch',
        budget_hours: 10,
        owner: 1,
        parentid: 4,

    },
    {
        name: 'build new room',
        description: 'to put all my swag',
        budget_hours: 4,
        owner: 1,
        parentid: 1,

    }, 
    {
        name: 'build swimming pool',
        description: 'its gonna be a hot one',
        budget_hours: 2,
        owner: 1,
        parentid: 1
    },
    {
        name: 'buy new kitchen appliances',
        description: 'refrigerator, stove, mixer',
        budget_hours: 2,
        owner: 1,
        parentid: 3

    },
    {
        name: 'fresh coat of paint',
        description: 'sherwin-williams, none of that cheap stuff',
        budget_hours: 3,
        owner: 1,
        parentid: 1
    },
    {
        name: 'Build models',
        description: 'backbone models',
        budget_hours: 10,
        owner: 2,
        parentid: 2
    },
    {
        name: 'Build Views',
        description: 'sick views',
        budget_hours: 5,
        owner: 2,
        parentid: 2
    },
    {
        name: 'fight off naysayers',
        description: 'have at thee',
        budget_hours: 5,
        owner: 2,
        parentid: 2
    }
    
];

let users_tasks = [
    {
        userid: 2,
        taskid: 5
    },
    {
        userid: 2,
        taskid: 4
    },
    {
        userid: 2,
        taskid: 2
    },
    {
        userid: 3,
        taskid: 3
    },
    {
        userid: 3,
        taskid: 4
    },
    {
        userid: 4,
        taskid: 3
    },
    {
        userid: 4,
        taskid: 4
    }, 
    {
        userid: 3,
        taskid: 10
    },
    {
        userid: 2,
        taskid: 10
    },
    {
        userid: 1,
        taskid: 12
    },
    {
        userid: 4,
        taskid: 11
    },
    {
        userid: 2,
        taskid: 11
    },
    {
        userid: 3,
        taskid: 11
    }
]


createNewProject = (clientResponse, taskObj) => {
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner) VALUES ("${taskObj.name}", "${taskObj.description}","${taskObj.budget_hours}", "${taskObj.owner}");`;
    db.query(sql, (err, resp) => {
        count++;
        projCounter++;
        if (err) {
            console.log('something terrible happened');
            console.log(err);
            process.exit();
        }
        if (count === totalSeeds) {
            process.exit();
        }
        console.log('created new Project');
        if(projCounter === totalProjs){

            taskData.forEach((task, i) => {
                createNewTask(null, task);
            });
        }
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
            rootTask.forEach(proj => createNewProject(null, proj));
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


var count = 0;

var totalUsers = userData.length;
var userCounter = 0;

var totalProjs = rootTask.length;
var projCounter = 0;

var totalTasks = taskData.length;
var taskCounter = 0;

var totalSeeds = users_tasks.length + userData.length + taskData.length + totalProjs;

userData.forEach((user, i) => createNewUser(null, user));












