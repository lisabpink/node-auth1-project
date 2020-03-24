
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Lisa', password: '1234'},
        {id: 2, username: 'Lucas', password: '5678'},
        {id: 3, username: 'Lacey', password: '4321'}
      ]);
    
};
