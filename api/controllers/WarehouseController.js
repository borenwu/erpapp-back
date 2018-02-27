/**
 * WarehouseController
 *
 * @description :: Server-side logic for managing Supliers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const CheckService = require('../services/checkService')

module.exports = {

  createItem:function () {
    let companyId = req.param('company_id')
    let supplierName = req.param('supplier_name')
    let itemName = req.param('item_name')
    let itemTyple = req.param('item_type')
    let desc = req.param('desc')
    let unit = req.param('unit')
    let balance = req.param('balance')

    CheckService.checkSupplierName(companyId, supplierName)
      .then(_supplier => {
        return WarehouseItem.create({
          item_name:itemName,
          item_type:itemTyple,
          desc:desc,
          unit:unit,
          balance:balance,
          supplier:_supplier.id,
          company:companyId
        })
      })
      .then(_warehouseItem=>{
        if (!_warehouseItem) throw new Error('Unable to create new warehouse item')
        _warehouseItem.supplier_name = supplierName
        return res.ok(_warehouseItem)
      })
      .catch(err => res.serverError(err.message));
  },

  deleteItem:function () {
    let companyId = req.param('company_id')
    let supplierName = req.param('supplier_name')
    let warehouseItemId = req.param('item_id')

    CheckService.checkSupplierName(companyId,supplierName)
      .then(_supplier =>{
        return WarehouseItem.destroy({id: warehouseItemId, supplier_id: _supplier.id})
      })
      .then(_warehouseItem => {
        if (!_warehouseItem || _warehouseItem.length === 0) return res.notFound({err: 'No warehouse item found in our record'});
        return res.ok({status:200,msg:'delete ok'});
      })
  },

  deleteItemById: function (req, res) {
    let warehouseItemId = req.params.id

    WarehouseItem.destroy({ id: warehouseItemId })
      .then(_warehouseItem => {
        if (!_warehouseItem || _warehouseItem.length === 0) return res.notFound({ err: 'No warehouse item found in our record' });
        return res.ok({status:200,msg:'delete ok'});
      })
  },

  updateItem: function (req, res) {
    let warehouseItemId = req.param('item_id')
    let companyId = req.param('company_id')
    let supplierName = req.param('supplier_name')
    let itemName = req.param('item_name')
    let itemType = req.param('item_type')
    let desc = req.param('desc')
    let unit = Number(req.param('unit'))
    let balance = req.param('balance')

    if (!warehouseItemId) return res.badRequest({ err: 'warehouse item id is missing' });

    let warehouseItem = {};

    if(itemName){
      warehouseItem.item_name = itemName
    }
    if(itemType){
      warehouseItem.item_type = itemType
    }
    if(desc){
      warehouseItem.desc = desc
    }
    if(unit){
      warehouseItem.unit = unit
    }
    if(balance){
      warehouseItem.balance = balance
    }

    CheckService.checkSupplierName(companyId,supplierName)
      .then(_supplier => {
        return WarehouseItem.update({id: warehouseItemId, supplier_id: _supplier.id},warehouseItem)
      })
      .then(_warehouseItem => {
        if (!_warehouseItem[0] || _warehouseItem[0].length === 0) return res.notFound({err: 'No warehouse item found in our record'});
        WarehouseItem.findOne({id:_warehouseItem[0].id}).populate('supplier')
          .then((warehouseItem,err)=>{
            if (err) {
              return res.serverError(err);
            }
            warehouseItem.supplier_name = warehouseItem.supplier.supplier_name
            warehouseItem.supplier_id = warehouseItem.supplier.id
            return res.ok(warehouseItem);
          })
      })
      .catch(err => res.serverError(err))
  },

  listAllItemsByCompany:function (req,res) {
    // console.log('listAllTasksByCompany')
    let companyId = req.param('company_id')

    WarehouseItem.find({company_id:companyId}).populate('supplier')
      .then(_warehouseItems =>{
        if (!_warehouseItems ) {
          throw new Error('No warehouse item found');
        }
        if(_warehouseItems.length === 0){
          return res.ok({status:201,msg:'tasks empty'});
        }
        _warehouseItems.map(i=>{
          i.supplier_name = i.supplier.supplier_name
          i.supplier_id = i.supplier.id
        })
        return res.ok(_warehouseItems);
      })
      .catch(err => res.serverError(err));
  },

  listAllItemsBySupplier: function (req, res) {
    let companyId = req.param('company_id')
    let supplierName = req.param('client_name')

    CheckService.checkSupplierName(companyId,supplierName)
      .then(_supplier => {
        return WarehouseItem.find({supplier_id: _supplier.id}).populate('supplier')
      })
      .then(_warehouseItems => {
        if (!_warehouseItems || _warehouseItems.length === 0) {
          throw new Error('No warehouse item found');
        }
        _warehouseItems.map(i=>{
          i.supplier_name = i.supplier.supplier_name
          i.supplier_id = i.supplier.id
        })
        return res.ok(_warehouseItems);
      })
      .catch(err => res.serverError(err));
  },


}
