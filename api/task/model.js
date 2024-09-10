// build your `Task` model here
const db = require('../../data/dbConfig.js')

async function getTasks () {
    const rows = await db('tasks as t')
        .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')
        .leftJoin('projects as p', 't.project_id', '=', 'p.project_id')
    let result = [];
    for (let i = 0; i < rows.length; i++) {
        if (!rows[i].task_completed) {
            result.push({...rows[i], task_completed: false})
        } else {
            result.push({...rows[i], task_completed: true})
        }
    }
    return result;
}

async function postTask (task) {
    const rowId = await db('tasks as t').insert({
        task_id: task.task_id,
        task_description: task.task_description,
        task_notes: task.task_notes,
        task_completed: task.task_completed,
        project_id: task.project_id
    })
    const newTask = await db('tasks')
        .select('tasks.*')
        .where('tasks.task_id', '=', rowId[0])
    let result = [];  
    if (!newTask[0].task_completed) {
        result.push({...newTask[0], task_completed: false})
    } else {
        result.push({...newTask[0], task_completed: true})
    }
    return result[0]
}

module.exports = {
    getTasks,
    postTask
}