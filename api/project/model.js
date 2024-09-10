// build your `Project` model here
const db = require('../../data/dbConfig.js');

async function getProjects () {
    const rows = await db('projects as p')
        .select('*');
    let result = [];
    for (let i = 0; i < rows.length; i++) {
        if (!rows[i].project_completed) {
            result.push({...rows[i], project_completed: false})
        } else {
            result.push({...rows[i], project_completed: true})
        }
    }
    return result;
}

async function postProject (project) {
    const row = await db('projects as p').insert({
        project_name: project.project_name,
        project_description: project.project_description,
        project_completed: project.project_completed
    });
    let getNewProject = await db('projects as p')
        .select('*')
        .where('p.project_id', row[0]);
    let result = [];
    if (!getNewProject[0].project_completed) {
        result.push({...getNewProject[0], project_completed: false})
    } else {
        result.push({...getNewProject[0], project_completed: true})
    }          
    return result[0];
}

module.exports = {
    getProjects,
    postProject
}