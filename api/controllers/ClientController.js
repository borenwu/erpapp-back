/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const CompanyService = require('../services/companyService')

module.exports = {

  create: function (req, res) {
    let companyName = req.param('company_name')
    let clientName = req.param('client_name')
    let desc = req.param('desc') || ''
    let receivable = Number(req.param('receivable')) || 0.0

    if (!companyName) {
      return res.badRequest({err: 'Invalid company_name'});
    }

    if (!clientName) {
      return res.badRequest({err: 'Invlaid user_name'});
    }


    CompanyService.checkCompanyName(companyName)
      .then(_company => {
        ops = [
          {
            date:'2018-1-2',
            op:'dr',
            amount: 30.0
          },
          {
            date:'2018-1-3',
            op:'dr',
            amount: 31.0
          },
          {
            date:'2018-1-4',
            op:'dr',
            amount: 32.0
          },

        ]
        return Client.create({
          client_name: clientName,
          desc:desc,
          receivable:receivable,
          company: _company.id,
          account_operation:ops
        });

      })
      .then(_client => {
        if (!_client) throw new Error('Unable to create new client')
        return res.ok(_client)
      })
      .catch(err => res.serverError(err.message));
  },

  delete: function (req, res) {
    let companyName = req.param('company_name')
    let clientName = req.param('client_name')
    let clientId = req.param('client_id') || ''

    CompanyService.checkCompanyName(companyName)
      .then(_company => {
        return Client.destroy({client_name: clientName, company_id: _company.id})
      })
      .then(_client => {
        if (!_client || _client.length === 0) return res.notFound({err: 'No client found in our record'});
        return res.ok(`Post is deleted with name ${clientName}`);
      })
  },

  listAllClients: function (req, res) {
    let companyName = req.param('company_name')
    CompanyService.checkCompanyName(companyName)
      .then(_company => {
        return Client.find({company_id: _company.id})
      })
      .then(_clients => {
        if (!_clients || _clients.length === 0) {
          throw new Error('No post found');
        }
        return res.ok(_clients);
      })
      .catch(err => res.serverError(err));
  },

  update: function (req, res) {
    let clientName = req.param('client_name')
    let clientId = req.param('client_id') || ''
    let desc = req.param('desc') || ''
    let receivable = Number(req.param('receivable')) || 0.0

    if (!clientId) return res.badRequest({err: 'client id is missing'});

    let client = {};

    if (clientName) {
      client.client_name = clientName;
    }
    if (desc) {
      client.desc = desc;
    }

    Client.update({id: clientId}, client)
      .then(_client => {

        if (!_client[0] || _client[0].length === 0) return res.notFound({err: 'No client found'});

        return res.ok(_client);

      }).catch(err => res.serverError(err));
  }
};

