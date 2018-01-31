const bcrypt = require('bcrypt');

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
  },

  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function (values, cb) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(values.password, salt, function (err, hash) {
            if (err) return cb(err);
            values.password = hash;
            // 执行用户定义回调
            cb();
        });
    });
  },

};
