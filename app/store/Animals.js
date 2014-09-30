Ext.define('Fgz.store.Animals', {
    extend: 'Fgz.store.Rest',
    model: 'Fgz.model.Animal',
    groupField: 'type',
    proxy: {
        url: 'animals',
        type: 'rest',
        headers: {
            'Content-Type': 'application/json'
        }
    }
});