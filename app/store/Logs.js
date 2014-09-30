Ext.define('Fgz.store.Logs', {
    extend: 'Ext.data.Store',
    model: 'Fgz.model.Log',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'cnt'
        },
        url: '/logs',
        simpleSortMode: true
    },
    autoSync: false,
    autoLoad: false,
    pageSize: 200,
    remoteSort: true,
    buffered: true
});