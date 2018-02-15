/**
 * ClientController
 *
 * @description :: Server-side logic for managing Clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const CheckService = require('../services/checkService')

module.exports = {

  create: function (req, res) {
    let companyName = req.param('company_name')
    let clientName = req.param('client_name')
    let desc = req.param('desc') || ''
    let receivable = Number(req.param('receivable')) || 0.0

    if (!companyName) {
      return res.badRequest({ err: 'Invalid company_name' });
    }

    if (!clientName) {
      return res.badRequest({ err: 'Invlaid user_name' });
    }


    CheckService.checkCompanyName(companyName)
      .then(_company => {
        return Client.create({
          client_name: clientName,
          desc: desc,
          receivable: receivable,
          company: _company.id,
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
    let clientId = req.param('client_id')

    CheckService.checkCompanyName(companyName)
      .then(_company => {
        return Client.destroy({ id: clientId, company_id: _company.id })
      })
      .then(_client => {
        if (!_client || _client.length === 0) return res.notFound({ err: 'No client found in our record' });
        return res.ok(`Client is deleted with name ${_client.client_name}`);
      })
  },

  listAllClients: function (req, res) {
    let companyName = req.param('company_name')
    CheckService.checkCompanyName(companyName)
      .then(_company => {
        return Client.find({ company_id: _company.id })
      })
      .then(_clients => {
        if (!_clients || _clients.length === 0) {
          throw new Error('No client found');
        }
        return res.ok(_clients);
      })
      .catch(err => res.serverError(err));
  },

  update: function (req, res) {
    let companyName = req.param('company_name')
    let clientName = req.param('client_name')
    let clientId = req.param('client_id') || ''
    let desc = req.param('desc') || ''
    let receivable = Number(req.param('receivable')) || 0.0

    if (!clientId) return res.badRequest({ err: 'client id is missing' });

    let client = {};

    if (clientName) {
      client.client_name = clientName;
    }
    if (desc) {
      client.desc = desc;
    }
    if (receivable) {
      client.receivable = receivable;
    }


    CheckService.checkCompanyName(companyName)
      .then(_company => {
        return Client.update({ id: clientId, company_id: _company.id }, client)
      })
      .then(_client => {
        if (!_client[0] || _client[0].length === 0) return res.notFound({ err: 'No client found' });
        return res.ok(_client);
      })
      .catch(err => res.serverError(err))
  },


  updateById: function (req, res) {
    let clientId = req.param('client_id') || ''
    let clientName = req.param('client_name')
    let desc = req.param('desc') || ''
    let receivable = Number(req.param('receivable')) || 0.0

    if (!clientId) return res.badRequest({ err: 'client id is missing' });

    let client = {};

    if (clientName) {
      client.client_name = clientName
    }

    if (desc) {
      client.desc = desc;
    }
    if (receivable) {
      client.receivable = receivable;
    }

    Client.update({ id: clientId }, client)
      .then(_client => {
        if (!_client[0] || _client[0].length === 0) return res.notFound({ err: 'No client found' });
        console.log(_client.company_name)
        return res.ok(_client[0]);
      })
      .catch(err => res.serverError(err))
  },

  getClientById: function (req, res) {
    let clientId = req.params.id

    Client.findOne({ id: clientId }).populate('company')
      .then((_client, err) => {
        if (err) {
          return res.serverError(err);
        }
        if (!_client) {
          return res.notFound('Could not find client, sorry.');
        }


        _client.company_name = _client.company.company_name
        return res.ok(_client);
      })
  },

  deleteClientById: function (req, res) {
    let clientId = req.params.id

    Client.destroy({ id: clientId })
      .then(_client => {
        if (!_client || _client.length === 0) return res.notFound({ err: 'No client found in our record' });
        return res.ok({status:200,msg:'delete ok'});
      })
  },




};




