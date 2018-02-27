const CheckService = {

  checkCompanyId: function (companyId) {
    return new Promise((resolve, reject) => {
      Company.findOne({id: companyId})
        .then((_company, err) => {
          if (err) reject(err)
          if (!_company) reject(new Error('Unable to find company record'))
          resolve(_company)
        })
    })
  },

  checkClientName: function (company_id, clientName) {
    return new Promise((resolve, reject) => {
      Client.findOne({client_name: clientName, company_id: company_id})
        .then((_client, err) => {
          if (err) reject(err)
          if (!_client) reject(new Error('Unable to find client record'))
          else resolve(_client)
        })
    })
  },

  checkClientId: function (company_id, clientId) {
    return new Promise((resolve, reject) => {
      Client.findOne({id: clientId, company_id: company_id})
        .then((_client, err) => {
          if (err) reject(err)
          if (!_client) reject(new Error('Unable to find client record'))
          else resolve(_client)
        })
    })
  },

  checkSupplierName: function (company_id, supplierName) {
    return new Promise((resolve, reject) => {
      Supplier.findOne({supplier_name: supplierName, company_id: company_id})
        .then((_supplier, err) => {
          if (err) reject(err)
          if (!_supplier) reject(new Error('Unable to find supplier record'))
          else resolve(_supplier)
        })
    })
  },

  checkSupplierId: function (company_id, supplierId) {
    return new Promise((resolve, reject) => {
      Supplier.findOne({id: supplierId, company_id: company_id})
        .then((_supplier, err) => {
          if (err) reject(err)
          if (!_supplier) reject(new Error('Unable to find supplier record'))
          else resolve(_supplier)
        })
    })
  },


};


module.exports = CheckService;
