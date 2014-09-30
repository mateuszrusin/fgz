Ext.define('Fgz.store.Temps', {
    extend: 'Fgz.store.Rest',
    model: 'Fgz.model.Temp',
    groupField: 'type',
    proxy: {
        url: 'temps',
        type: 'rest',
        headers: {
            'Content-Type': 'application/xml'
        }
    }
});