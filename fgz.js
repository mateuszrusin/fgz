Ext.Loader.setConfig({
    enabled: true
});
Ext.require([
    'Ext.grid.feature.Searching'
]);
Ext.tip.QuickTipManager.init();

Ext.application({
    name: 'Fgz',
    autoCreateViewport: false,
    controllers: [
        'Animals'
    ],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: Ext.create('Ext.panel.Panel', {
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        Ext.create('Ext.Img', {
                            src: '/html/img/fgz.png'
                        }),
                        '->',
                        Ext.create('Ext.container.Container', {
                            id: 'topheader',
                            html: 'Zwierzęta',
                            margin: '0 15 0 0',
                            cls: 'topheader',
                            style: {
                                height: '90px',
                                lineHeight: '90px'
                            }
                        })]
                }],
                layout: 'fit',
                items: [
                    Ext.create('Ext.tab.Panel', {
                        activeTab: 0,
                        bodyPadding: 10,
                        tabPosition: 'top',
                        items: {
                            xtype: 'animal.List'
                        },
                        listeners: {
                            beforetabchange: function(tabs, newTab, oldTab) {
                                //Ext.getCmp('topheader').update(newTab.title);
                            }
                        }
                    })
                ]
            })
        });
    }
});