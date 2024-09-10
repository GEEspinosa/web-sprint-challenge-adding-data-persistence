exports.seed = function(knex, Promise) {//eslint-disable-line
  return knex('tasks').truncate()
    .then(function () {
      return knex('tasks').insert([
        {task_description: 'baz', task_notes: 'baz notes', task_completed: 0, project_id: 1}
      ])
    })
};
