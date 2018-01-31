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

    if (!companyName) {
      return res.badRequest({err: 'Invalid company_name'});
    }

    if (!userName) {
      return res.badRequest({err: 'Invlaid user_name'});
    }

    Company.findOne({company_name: companyName})
      .then(_company => {
        if (!_company) throw new Error('Unable to find company record');
        return _company;
      })
      .then(_company => {
        return User.create({
          user_name: userName,
          password: password,
          login: false,
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

    User.findOne({user_name: user_name, password: password})
      .populate('company')
      .then(_user => {

        if (!_user) throw new Error('user not found');

        _user.login = true
        _user.save()
        return res.ok(_user)
      })
      .catch(err => res.serverError(err));
  },

  logout: function (req, res) {
    let user_name = req.param('user_name')
    let password = req.param('password')
    let companyName = req.param('company_name')

    User.findOne({user_name: user_name, password: password})
      .populate('company')
      .then(_user => {

        if (!_user) throw new Error('user not found');

        _user.login = false
        _user.save()
        return res.ok(_user)
      })
      .catch(err => res.serverError(err));
  },
};

