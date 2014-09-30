Ext.require([
    'Ext.org.ImageView'
]);

Ext.define('Fgz.component.Album', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.component.album',
    requires: 'Ext.layout.container.Border',
    layout: 'border',
    folder: null,
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
                title: 'Podgląd',
                region: 'west',
                padding: '0 5px 0 0',
                width: '50%',
                height: '100%',
                id : 'displaypanel',
                items: {
                    xtype: 'component',
                    id: 'displayimage',
                    style: {
                        textAlign: 'center'
                    }
                }
            },
            {
                xtype: 'panel',
                title: 'Zdjęcia',
                layout: 'fit',
                region: 'center',
                padding: '0 0 0 5px',
                items: {
                    xtype: 'imageview',
                    listeners: {
                        beforerender: function(obj, eOpts) {
                            var id = obj.up('panel').up('panel').folder;
                            obj.getStore().getProxy().url = '/animals/' + id;
                            obj.getStore().load();
                        },
                        itemclick: function (view, record, item, index, e) {

                            var img = Ext.getCmp('bigimage');
                            if (img) img.destroy();

                            displaypanel = Ext.getCmp('displaypanel');

                            img = Ext.create('Ext.Img', {
                                id: 'bigimage',
                                src: record.getData().path,
                                renderTo: 'displayimage',
                                listeners: {
                                    beforerender: function(img, eOpts) {
                                        if (record.getData().width > record.getData().height) {
                                            var h = (displaypanel.getWidth() * record.getData().height) /  record.getData().width;
                                            img.setWidth(displaypanel.getWidth());
                                            img.setHeight(h);
                                            img.setMargin((displaypanel.getHeight() - displaypanel.getHeader().getHeight() - h) / 2 + ' 0 0 0');
                                        } else {
                                            img.setHeight(displaypanel.getHeight() - displaypanel.getHeader().getHeight());
                                        }
                                    }
                                }
                            });

                        },
                        refresh: function(obj, eOpts) {

                        }
                    },
                    trackOver: true
                },
                dockedItems: Ext.create('Ext.form.Panel', {
                    width: 200,
                    frame: true,
                    bodyPadding: '10 10 0',

                    defaults: {
                        anchor: '100%',
                        allowBlank: false,
                        msgTarget: 'side',
                        labelWidth: 50
                    },

                    items: [{
                        xtype: 'filefield',
                        id: 'form-file',
                        emptyText: 'Wybierz zdjęcie',
                        fieldLabel: 'Zdjęcie',
                        name: 'photo',
                        buttonText: 'Wybierz zdjęcie...'
                    }],

                    buttons: [{
                        text: 'Zapisz',
                        handler: function(){
                            var form = this.up('form').getForm();
                            var store = Ext.getCmp('Ext.org.ImageView').getStore();
                            if(form.isValid()){
                                form.submit({
                                    url: '/animal/upload/' + Ext.getCmp('Ext.org.OrgPanel').folder,
                                    waitMsg: 'Ładowanie zdjęcia...',
                                    failure: function(form, action) {
                                        var result = Ext.decode(action.response.responseText);
                                        store.add(result.data);
                                    }

                                });

                            }
                            store.reload();
                        }
                    },{
                        iconCls: 'icon-download',
                        text: 'Pobierz wszystkie',
                        handler: function() {
                            document.location.href = '/animal/pack/' + Ext.getCmp('Ext.org.OrgPanel').folder;
                        }
                    }]
                })
            }
        ];
        this.callParent(arguments);
    }
})