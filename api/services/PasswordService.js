const bcrypt = require('bcrypt');

const PasswordService = {

  checkPassword: function (inputPassword, rightPassword) {
    console.log(inputPassword)
    console.log(rightPassword)
    console.log(bcrypt.compareSync(inputPassword, rightPassword))
    return bcrypt.compareSync(inputPassword, rightPassword)
  },


};


module.exports = PasswordService;
