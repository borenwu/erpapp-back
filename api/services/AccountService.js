const CheckService = require('./checkService')

const AccountService = {

  accountReceivableDr: function (companyId, clientName, op_name, amount) {
    CheckService.checkClientName(companyId, clientName)
      .then(_client => {
        Account.create({
          op_date: new Date(),
          op_name: op_name,
          direction: '借',
          amount: amount,
          client: _client.id
        })
          .then(account => {
            _client.receivable = Number(_client.receivable) + Number(amount)
            _client.save()
          })
      })
  },

  accountReceivableCr: function (companyId, clientName, op_name, amount) {
    CheckService.checkClientName(companyId, clientName)
      .then(_client => {
        Account.create({
          op_date: new Date(),
          op_name: op_name,
          direction: '贷',
          amount: amount,
          client: _client.id
        })
        _client.receivable = Number(_client.receivable) - Number(amount)
        _client.save()
      })
  }
}

module.exports = AccountService;
