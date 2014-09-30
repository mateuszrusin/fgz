Ext.define('Fgz.store.Breeds', {
    extend: 'Fgz.store.Rest',
    model: 'Fgz.model.Breed',
    groupField: 'type',
    proxy: {
        url: 'breeds',
        type: 'rest',
        headers: {
            'Content-Type': 'application/xml'
        }
    }
});