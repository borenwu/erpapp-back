/**
 * WarehouseOp.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "warehouseOps",

  attributes: {
    op_date: {type: 'date', required: true},
    unit:{type:'string',required:true},
    order:{type:'float',required:true},
    return:{type:'float',required:true},
    use:{type:'float',required:true},
    waste:{type:'float',required:true},

    warehouseItem: {model: 'warehouseItem', columnName: 'warehouseItem_id', required: true},
  }
};
