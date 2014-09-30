Ext.define('Fgz.store.Sexes', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data: [
        {id:0, name: "?"},
        {id:1, name: "K"},
        {id:2, name: "M"}
    ],
    proxy: {
        type: 'memory'
    }
});