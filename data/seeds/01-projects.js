exports.seed = function(knex, Promise) {//eslint-disable-line
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {project_name: 'bar', project_description: 'bar description', project_completed: 0},
      ])
    })
};