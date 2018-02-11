const CheckService = {

  checkCompanyName: function(companyName) {

        // Something.findOne(criteria).exec(function (err, record) {

        // });

        return new Promise((resolve, reject) => {
            Company.findOne({ company_name: companyName })
                .then((_company,err) => {
                    if (err) reject(err)
                    if (!_company) reject(new Error('Unable to find client record'))               
                    resolve(_company)
                })
        })
  },

  checkClientName:function (company_id,clientName) {
    return new Promise((resolve,reject)=>{
      Client.findOne({client_name:clientName,company_id:company_id})
        .then((_client,err) =>{
          if (err) reject(err)
          if (!_client) reject(new Error('Unable to find client record'))
          else resolve(_client)
        })
    })
  }
};


module.exports = CheckService;
