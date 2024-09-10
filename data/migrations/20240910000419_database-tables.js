
exports.up = function(knex, Promise) {//eslint-disable-line
    return knex.schema.createTable('projects', tbl => {
        tbl.increments('project_id');
        tbl.text('project_name', 128)
            .notNullable();
        tbl.text('project_description', 128);
        tbl.integer('project_completed')       
    })
    .createTable('resources', tbl => {
        tbl.increments('resource_id');
        tbl.text('resource_name')
            .notNullable()
            .unique();
        tbl.text('resource_description');
    })
    .createTable('tasks', tbl => {
        tbl.increments('task_id');
        tbl.text('task_description', 128)
            .notNullable();
        tbl.text('task_notes', 128);
        tbl.integer('task_completed');
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects');
    })
    .createTable('project_resources', tbl => {
        //tbl.increments('project_resources_id');
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources');
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects');
        tbl.primary(['resource_id', 'project_id'])

    })
};


exports.down = function(knex, Promise) {//eslint-disable-line
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
