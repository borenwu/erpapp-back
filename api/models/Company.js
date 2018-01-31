module.exports = {

  tableName: "company",

  attributes: {
    company_name: {type: 'string', required: true},
    secret: {type: 'string', required: true},

    users: {
      collection: 'user',
      via: 'company'
    }
  }
};
