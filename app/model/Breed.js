Ext.define('Fgz.model.Breed', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        { name:'id', type:'int' },
        { name:'id_type', type:'int' },
        { name:'name', type:'string' }
    ]
});