Ext.define('Fgz.model.Temp', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'desc', type: 'string'}
    ]
});