const bcrypt = require('bcrypt');

const PasswordService = {

  checkPassword: function (inputPassword, rightPassword) {
    return bcrypt.compare(inputPassword, rightPassword)
  },


};


module.exports = PasswordService;
