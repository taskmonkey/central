const db = require('../Database/dbConnection.js');


let userData = [
    {
        username: 'richsong003',
        image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'
    },
    {
        username: 'austenesus',
        image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'
    },
    {
        username: 'jardini.alex',
        image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'
    },
    {
        username: 'ham-d',
        image: 'https://avatars2.githubusercontent.com/u/11185264?v=4&s=400'
    }

];



let rootTask = [{
    name: 'Renovate house',
    description: 'get on that LA real estate bubble',
    budget_hours: 30,
    owner: 1,
    assignee: "{ username: 'ham-d', image: 'https://avatars2.githubusercontent.com/u/11185264?v=4&s=400'}"
},
{
    name: 'Upgrade from React to Backbone',
    description: 'sometimes going backwards is going forward',
    budget_hours: 100,
    owner: 2,
    assignee: "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}"
}];

let taskData = [
    {
        name: "Fix Kitchen",
        description: 'in need of thorough repairs',
        budget_hours: 20,
        owner: 1,
        parentid: 1,
        assignee: "{username: 'austenesus', image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'}"
    },
    {
        name: 'install marble coutertops',
        description: 'marble rye, marble halvah, marble countertops',
        budget_hours: 10,
        owner: 1,
        parentid: 3,
        assignee: "{username: 'richsong003', image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'}"
    },
    {
        name: "paint the interior",
        description: 'warm and inviting colors',
        budget_hours: 10,
        owner: 1,
        parentid: 1,
        assignee: "{username: 'richsong003', image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'}"
    },
    {
        name: 'build new room',
        description: 'to put all my swag',
        budget_hours: 4,
        owner: 1,
        parentid: 1,
        assignee: "{username: 'austenesus', image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'}"
    },
    {
        name: 'build swimming pool',
        description: 'its gonna be a hot one',
        budget_hours: 2,
        owner: 1,
        parentid: 1,
        assignee: "{ username: 'ham-d', image: 'https://avatars2.githubusercontent.com/u/11185264?v=4&s=400'}"
    },
    {
        name: 'buy new kitchen appliances',
        description: 'refrigerator, stove, mixer',
        budget_hours: 2,
        owner: 1,
        parentid: 3,
        assignee: "{ username: 'ham-d', image: 'https://avatars2.githubusercontent.com/u/11185264?v=4&s=400'}"
    },
    {
        name: 'cover all fixtures ',
        description: 'insert crappy pun here',
        budget_hours: 3,
        owner: 1,
        parentid: 5,
        assignee: "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}"
    },
    {
        name: 'Build models',
        description: 'backbone models',
        budget_hours: 10,
        owner: 2,
        parentid: 2,
        assignee: "{ username: 'ham-d', image: 'https://avatars2.githubusercontent.com/u/11185264?v=4&s=400'}"
    },
    {
        name: 'Build Views',
        description: 'sick views',
        budget_hours: 5,
        owner: 2,
        parentid: 2,
        assignee: "{username: 'austenesus', image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'}"
    },
    {
        name: 'fight off naysayers',
        description: 'have at thee',
        budget_hours: 5,
        owner: 2,
        parentid: 2,
        assignee: "{username: 'richsong003', image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'}"
    },
    {
        name: 'HR precourse',
        description: 'I am one with the for loop',
        budget_hours: 80,
        owner: 4,
        parentid: null,
        assignee: "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}"
    },
    {
        name: 'underscore',
        description: '_.contains danger',
        budget_hours: 5,
        owner: 4,
        parentid: 13,
        assignee: "{username: 'richsong003', image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'}"
    },
    {
        name: 'part 1',
        description: 're-implement some handy functions',
        budget_hours: 5,
        owner: 2,
        parentid: 14,
        assignee: "{username: 'richsong003', image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'}"
    },
    {
        name: 'part2',
        description: 're-implement some handy functions',
        budget_hours: 5,
        owner: 2,
        parentid: 14,
        assignee: "{username: 'austenesus', image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'}"
    },
    {
        name: '_.memo-ize',
        description: 'I\'ll remember this',
        budget_hours: 1,
        owner: 4,
        parentid: 16,
        assignee: "{username: 'austenesus', image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'}"
    },
    {
        name: 'recursion',
        description: 'recursion',
        budget_hours: 10,
        owner: 4,
        parentid: 13,
        assignee: "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}"
    },
    {
        name: 'parseJSON',
        description: 'Use recursive descent parser',
        budget_hours: 5,
        owner: 2,
        parentid: 18,
        assignee: "{username: 'richsong003', image: 'https://veekun.com/dex/media/pokemon/dream-world/568.svg'}"
    },
    {
        name: 'stringifyJSON',
        description: 'don\'t forget the double quotes',
        budget_hours: 2,
        owner: 2,
        parentid: 18,
        assignee: "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}"
    },
    {
        name: 'twittler',
        description: 'make twitter, also HTML is hard',
        budget_hours: 12,
        owner: 2,
        parentid: 13,
        assignee: "{username: 'jardini.alex', image: 'https://cdn.bulbagarden.net/upload/c/c4/569Garbodor.png'}"
    },
    {
        name: '_.once',
        description: 'Return a function that can be called at most one time',
        budget_hours: 1,
        owner: 4,
        parentid: 16,
        assignee: "{username: 'austenesus', image: 'https://avatars0.githubusercontent.com/u/27669434?v=4&s=400'}"
    },

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
        userid: 1,
        taskid: 1
    },
    {
        userid: 3,
        taskid: 11
    },
    {
        userid: 1,
        taskid: 14
    },
    {
        userid: 2,
        taskid: 15
    },
    {
        userid: 3,
        taskid: 16
    },
    {
        userid: 4,
        taskid: 17
    },
    {
        userid: 1,
        taskid: 16
    },
    {
        userid: 2,
        taskid: 18
    },
    {
        userid: 3,
        taskid: 15
    },
    {
        userid: 4,
        taskid: 14
    }
]


createNewProject = (clientResponse, taskObj) => {
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner, assignee) VALUES ("${taskObj.name}", "${taskObj.description}","${taskObj.budget_hours}", "${taskObj.owner}", "${taskObj.assignee}");`;
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
    let sql = `INSERT INTO tasks (name, description, budget_hours, owner, parentid, assignee) VALUES (?, ?, ?, ?, ?, ?);`;
    db.query(sql, [taskObj.name, taskObj.description, taskObj.budget_hours, taskObj.owner, taskObj.parentid, taskObj.assignee], (err, resp) => {
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
                console.log('successfully seeded data');
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
