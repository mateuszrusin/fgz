Ext.define('Fgz.store.Houses', {
    extend: 'Fgz.store.Rest',
    model: 'Fgz.model.House',
    groupField: 'type',
    proxy: {
        url: 'houses',
        type: 'rest',
        headers: {
            'Content-Type': 'application/xml'
        }
    }
});