Ext.define('Fgz.model.Log', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'id', type:'int' },
        { name:'item', type:'string' },
        { name:'date', type:'datetime' }
    ]
});