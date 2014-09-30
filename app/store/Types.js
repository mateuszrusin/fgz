Ext.define('Fgz.store.Types', {
    extend: 'Ext.data.Store',
    model: 'Fgz.model.Type',
    fields: ['id', 'name'],
    data: [
        {id:1, name: "Pies"},
        {id:2, name: "Kot"}
    ],
    proxy: {
        type: 'memory'
    }
});