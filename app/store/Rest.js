Ext.define('Fgz.store.Rest', {
    extend: 'Ext.data.Store',
    autoSync: true,
    autoLoad: true,
    sorters: {property: 'name', direction: 'ASC'},
    listeners: {
        update: function(store, operation, eOpts) {
            Ext.Msg.show({
               title:'OK',
               msg: 'Dane zapisane poprawnie',
               icon: Ext.Msg.INFO,
               buttons: Ext.Msg.OK
            });
        },
        remove: function(store, operation, eOpts) {
            Ext.Msg.show({
                title:'OK',
                msg: 'Dane usunięte poprawnie',
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
        }
    }
});