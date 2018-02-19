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


};


module.exports = CheckService;
