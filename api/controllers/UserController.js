const CheckService = require('../services/checkService')
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
    let company_id = req.param('company_id')
    let userName = req.param('user_name')
    let password = req.param('password')
    let level = req.param('level')

    if (!company_id) {
      return res.badRequest({err: 'Invalid company_id'});
    }

    if (!userName) {
      return res.badRequest({err: 'Invlaid user_name'});
    }


    CheckService.checkCompanyId(company_id)
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

  delete: function (req, res) {
    let company_id = req.param('company_id')
    let userName = req.param('user_name')
    let userId = req.param('user_id') || ''

    CheckService.checkCompanyId(company_id)
      .then(_company => {
        return User.destroy({id: userId, company_id: _company.id})
      })
      .then(_user => {
        if (!_user || _user.length === 0) return res.notFound({err: 'No user found in our record'});
        return res.ok({status:200,msg:'delete ok'});
      })
  },

  listAllUsers: function (req, res) {
    let company_id = req.param('company_id')
    CheckService.checkCompanyId(company_id)
      .then(_company => {
        return User.find({company_id: _company.id})
      })
      .then(_users => {
        if (!_users || _users.length === 0) {
          throw new Error('No user found');
        }
        return res.ok(_users);
      })
      .catch(err => res.serverError(err));
  },


  update: function (req, res) {
    let company_id = req.param('company_id')
    let userName = req.param('user_name')
    let userId = req.param('user_id')
    let level = req.param('level')

    if (!userId) return res.badRequest({err: 'user id is missing'});

    let user = {};

    if (userName) {
      user.user_name = userName;
    }
    if (level) {
      user.level = level;
    }

    CheckService.checkCompanyId(company_id)
      .then(_company=>{
        return User.update({id:userId,company_id:_company.id},user)
      })
      .then(_user=>{
        if (!_user[0] || _user[0].length === 0) return res.notFound({err: 'No user found'});
        return res.ok(_user[0]);
      })
      .catch(err=> res.serverError(err))
  },

  changePassword:function (req,res) {
    let company_id = req.param('company_id')
    let userId = req.param('user_id')
    let oldPassword = req.param('old_password')
    let newPassword = req.param('new_password')

    let user = {
      password:newPassword
    }

    CheckService.checkCompanyId(company_id)
      .then(_company=>{
        return User.findOne({company:_company.id, id: userId}).populate('company')
      })
      .then(_user=>{
        if (!_user) throw new Error('user not found')
        if (!PasswordService.checkPassword(oldPassword, _user.password)){
          return res.ok({status:404,msg:'old password is not right'})
        }
        else{
          User.update({id:_user.id,company_id:company_id},user)
            .then(_user=>{
              if (!_user[0] || _user[0].length === 0) return res.notFound({err: 'No user found'});
              return res.ok(_user[0]);
            })
        }
      })
      .catch(err=> res.serverError(err))
  },


  login: function (req, res) {
    let user_name = req.param('user_name')
    let password = req.param('password')
    let company_id = req.param('company_id')

    CheckService.checkCompanyId(company_id)
      .then(_company => {
        return User.findOne({company: _company.id, user_name: user_name}).populate('company')
      })
      .then(_user => {
        if (!_user) throw new Error('user not found')
        // PasswordService.checkPassword(password,_user.password)
        //   .then((err,res)=>{
        //     console.log(res)
        //   })
        if (!PasswordService.checkPassword(password, _user.password)){
          return res.ok({status:400,msg:'invalid password'})
        }else{
          _user.login = true
          _user.save()
          return res.ok(_user)
        }

      })
      .catch(err => res.serverError(err));
  },

  logout: function (req, res) {
    let user_name = req.param('user_name')
    let company_id = req.param('company_id')
    let userId = req.param('user_id')

    CheckService.checkCompanyId(company_id)
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

