const CheckService = {

  checkCompanyName: function(companyName) {
        return new Promise((resolve, reject) => {
            Company.findOne({ company_name: companyName })
                .then(_company => {
                    if (!_company) reject(new Error('Unable to find company record'))
                    else resolve(_company)
                })
        })
  },

  checkClientName:function (company_id,clientName) {
    return new Promise((resolve,reject)=>{
      Client.findOne({client_name:clientName,company_id:company_id})
        .then(_client =>{
          if (!_client) reject(new Error('Unable to find client record'))
          else resolve(_client)
        })
    })
  }
};


module.exports = CheckService;
