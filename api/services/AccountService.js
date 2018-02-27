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
          .then(account => {
            _client.receivable = Number(_client.receivable) - Number(amount)
            _client.save()
          })

      })
  },


  accountPayableDr: function (companyId, supplierName, op_name, amount) {
    CheckService.checkSupplierName(companyId, supplierName)
      .then(_supplier => {
        Account.create({
          op_date: new Date(),
          op_name: op_name,
          direction: '借',
          amount: amount,
          supplier: _supplier.id
        })
          .then(account => {
            _supplier.payable = Number(_supplier.payable) - Number(amount)
            _supplier.save()
          })
      })
  },

  accountPayableCr: function (companyId, supplierName, op_name, amount) {
    CheckService.checkClientName(companyId, supplierName)
      .then(_supplier => {
        Account.create({
          op_date: new Date(),
          op_name: op_name,
          direction: '贷',
          amount: amount,
          client: _supplier.id
        })
          .then(account => {
            _supplier.payable = Number(_supplier.payable) + Number(amount)
            _supplier.save()
          })
      })
  }
}

module.exports = AccountService;
