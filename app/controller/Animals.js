Ext.define('Fgz.controller.Animals', {
    extend:'Ext.app.Controller',
    views: [
        'animal.List'
    ],
    stores: [
        'Animals',
        'Breeds',
        'Temps',
        'Sexes',
        'Houses',
        'Types',
        'Logs'
    ],
    models: [
        'Animal',
        'Breed',
        'Temp',
        'House',
        'Log'
    ],
    init: function() {
        this.control({
            'animal.List':  {
                render: this.onPanelRendered
            }
        });

        this.application.on({
           //Event handlers
        });
     },
     onPanelRendered: function() {
        console.log('The panel LIST was rendered');
     }
});