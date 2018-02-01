const bcrypt = require('bcrypt');


module.exports = {

  tableName: "users",

  attributes: {
    user_name: {type: 'string', required: true},
    password: {type: 'string', required: true},
    login: {type:'boolean'},
    level:{type: 'integer'},
    company : { model :'company', columnName:'company_id', required:true}
    // posts: {
    //   collection: 'post',
    //   via: 'user'
    // }
  },

  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password,10)
      .then(hash=>{
        values.password = hash
        cb()
      })
      .catch(err=>{
        cb(err)
      })
  },

}
