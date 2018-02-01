const CompanyService = require('../services/companyService')
const PasswordService = require('../services/PasswordService')

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `UserController.create()`
   */
  create: function (req, res) {
    let companyName = req.param('company_name')
    let userName = req.param('user_name')
    let password = req.param('password')
    let level = req.param('level')

    if (!companyName) {
      return res.badRequest({err: 'Invalid company_name'});
    }

    if (!userName) {
      return res.badRequest({err: 'Invlaid user_name'});
    }


    CompanyService.checkCompanyName(companyName)
      .then(_company => {
        return User.create({
          user_name: userName,
          password: password,
          login: false,
          level:level,
          company: _company.id
        });

      })
      .then(_user => {
        if (!_user) throw new Error('Unable to create new user')
        return res.ok(_user)
      })
      .catch(err => res.serverError(err.message));
  },

  login: function (req, res) {
    let user_name = req.param('user_name')
    let password = req.param('password')
    let companyName = req.param('company_name')

    CompanyService.checkCompanyName(companyName)
      .then(_company => {
        return User.findOne({company: _company.id, user_name: user_name}).populate('company')
      })
      .then(_user => {
        if (!_user) throw new Error('user not found')
        if (!PasswordService.checkPassword(password, _user.password)) throw new Error('Invalid Password')

        _user.login = true
        _user.save()
        return res.ok(_user)
      })
      .catch(err => res.serverError(err));
  },

  logout: function (req, res) {
    let user_name = req.param('user_name')
    let companyName = req.param('company_name')
    let userId = req.param('user_id')

    CompanyService.checkCompanyName(companyName)
      .then(_company => {
        return User.findOne({company: _company.id, user_name: user_name}).populate('company')
      })
      .then(_user => {
        if (!_user) throw new Error('user not found');

        _user.login = false
        _user.save()
        return res.ok(_user)
      })
      .catch(err => res.serverError(err));
  },
};

