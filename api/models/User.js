module.exports = {

  tableName: "users",

  attributes: {
    user_name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    login: {type:'boolean'},
    company : { model :'company', columnName:'company_id', required:true}
    // posts: {
    //   collection: 'post',
    //   via: 'user'
    // }
  }
};
