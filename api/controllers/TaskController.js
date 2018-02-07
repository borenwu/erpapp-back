/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const CheckService = require('../services/checkService')

module.exports = {

  create: function (req,res) {
    let companyId = req.param('company_id')
    let clientName = req.param('client_name')
    let taskDate = req.param('task_date')
    let taskName = req.param('task_name')
    let desc = req.param('desc') || ''
    let volume = Number(req.param('volume')) || 0.0
    let price = Number(req.param('price')) || 0.0
    let sale = Number(req.param('sale')) || 0.0
    let maker = req.param('maker')
    let make_time = new Date()


    if (!clientId) {
      return res.badRequest({err: 'Invlaid client_id'});
    }

    CheckService.checkClientName(companyId,clientName)
      .then(_client => {
        return Task.create({
          task_date: taskDate,
          task_name:taskName,
          desc: desc,
          volume:volume,
          price:price,
          sale:sale,
          client: _client.id,
          maker:maker,
          make_time:make_time
        });
      })
      .then(_task => {
        if (!_task) throw new Error('Unable to create new client')
        return res.ok(_task)
      })
      .catch(err => res.serverError(err.message));
  },

  delete: function (req, res) {
    let companyId = req.param('company_id')
    let clientName = req.param('client_name')
    let taskId = req.param('task_id')

    CheckService.checkClientName(companyId,clientName)
      .then(_client => {
        return Task.destroy({id: taskId, client_id: _client.id})
      })
      .then(_task => {
        if (!_task || _task.length === 0) return res.notFound({err: 'No task found in our record'});
        return res.ok(`Task is deleted with name ${_task.task_name}`);
      })
  },

  listAllTasks: function (req, res) {
    let companyId = req.param('company_id')
    let clientName = req.param('client_name')

    CheckService.checkClientName(companyId,clientName)
      .then(_client => {
        return Task.find({client_id: _client.id})
      })
      .then(_tasks => {
        if (!_tasks || _tasks.length === 0) {
          throw new Error('No task found');
        }
        return res.ok(_tasks);
      })
      .catch(err => res.serverError(err));
  },

  updateSale: function (req, res) {
    let companyId = req.param('company_id')
    let clientName = req.param('client_name')
    let taskId = req.param('task_id')
    let price = req.param('price')
    let sale = req.param('sale')
    let checker = req.param('checker')
    let check_time = new Date()

    CheckService.checkCompanyName(companyId,clientName)
      .then(_client => {
        return Task.findOne({id: taskId, client_id: _client.id})
      })
      .then(_task => {
        if (!_task[0] || _task[0].length === 0) return res.notFound({err: 'No task found'});
        _task.price = price
        _task.sale = sale
        _task.checker = checker
        _task.check_time = check_time
        _task.save()
        return res.ok(_task);
      })
      .catch(err => res.serverError(err))
  },
};

