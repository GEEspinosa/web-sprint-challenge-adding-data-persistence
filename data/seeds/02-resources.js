exports.seed = function(knex, Promise) {//eslint-disable-line
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        {resource_name: 'foo', resource_description: 'foo description'},
      ])
    })
};
