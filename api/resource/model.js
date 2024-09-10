// build your `Resource` model here
const db = require('../../data/dbConfig.js');

async function getResources () {
    const rows = db('resources as r')
        .select('*')
    return rows
}

async function postResource (resource) {
    const rowId = await db('resources as r').insert({
        resource_name: resource.resource_name,
        resource_description: resource.resource_description
    })
    const getNewResource = await db('resources')
        .select('*')
        .where('resources.resource_id', rowId[0])
    return getNewResource[0]
}

module.exports = {
    getResources,
    postResource
}