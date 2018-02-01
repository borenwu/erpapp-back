/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "tasks",

  attributes: {
    task_date: {type: 'date', required: true},
    task_name: {type: 'string', required: true},
    desc: {type: 'string'},
    volume: {type: 'float', required: true, default: 0.0},
    price: {type: 'float', required: true, default: 0.0},
    sale: {type: 'float', required: true, default: 0.0},

    client: {model: 'client', columnName: 'client_id', required: true},
  }
};
