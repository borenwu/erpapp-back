const CompanyService = {

  checkCompanyName: function(companyName) {
        return new Promise((resolve, reject) => {
            Company.findOne({ company_name: companyName })
                .then(_company => {
                    if (!_company) reject(new Error('Unable to find company record'))
                    else resolve(_company)
                })
        })
    }
};


module.exports = CompanyService;
