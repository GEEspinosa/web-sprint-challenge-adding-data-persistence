exports.seed = function(knex, Promise) {//eslint-disable-line
  return knex('project_resources').truncate()
    .then(function () {
      return knex('project_resources').insert([
        {resource_id: 1, project_id: 1}
      ])
    })
};