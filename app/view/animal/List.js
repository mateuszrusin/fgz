Ext.define('Fgz.view.animal.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.animal.List',
    title: 'Zwierzęta',
    store: 'Animals',
    frame: true,
    columnLines: true,
    iconCls: 'icon-animals',
    selType: 'checkboxmodel',
    selModel: {
        mode: 'MULTI'
    },
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1
    }],
    features: [{
        ftype: 'searching',
        searchText: 'Szukaj',
        selectAllText: 'Szukaj wszędzie',
        position: 'top',
        width: 150,
        align: 'right',
        minChars: 2,
        mode: 'local'
    },{
        id: 'type',
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({rows.length})',
        hideGroupedHeader: false,
        enableGroupingMenu: true
    }],
    columns: [{
        text: 'ID',
        width: 20,
        sortable: true,
        dataIndex: 'id',
        hideable: false
    }, {
        header: 'Imię',
        flex: 1,
        sortable: true,
        dataIndex: 'name',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    }, {
        header: 'Imię2',
        flex: 1,
        sortable: true,
        dataIndex: 'name2',
        editor: {
            xtype: 'textfield',
            allowBlank: true
        }
    }, {
        header: 'Data urodzenia',
        width: 100,
        sortable: true,
        dataIndex: 'birth',
        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
        field: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: 'Płeć',
        width: 75,
        sortable: true,
        dataIndex: 'sex',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            switch(value) {
                case 0: return '?';
                case 1: return 'K';
                case 2: return 'M';
            }
        },
        editor: {
            xtype: 'combobox',
            typeAhead: false,
            editable: false,
            triggerAction: 'all',
            displayField: 'name',
            valueField: 'id',
            store: 'Sexes'
        }
    }, {
        header: 'Rasa',
        width: 175,
        sortable: true,
        dataIndex: 'id_breed',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            if (item = Ext.getStore('Breeds').getById(record.getData().id_breed)) {
                return item.getData().name;
            } else {
                return record.getData().breed;
            }
        },
        editor: {
            xtype: 'combobox',
            flex: 1,
            typeAhead: false,
            editable: false,
            displayField: 'name',
            valueField: 'id',
            store: 'Breeds',
            listeners: {
                collapse: function(obj, eOpts) {
                    obj.getStore().clearFilter();
                },
                expand: function(obj, eOpts) {
                    obj.getStore().filter([{
                        fn: function(record) {
                            return record.getData().id_type == Fgz.tab.animal.getSelectionModel().getSelection().pop().get('id_type');
                        }
                    }]);
                }
            }
        }
    }, {
        header: 'Odrobaczenie',
        width: 75,
        sortable: true,
        dataIndex: 'deworming',
        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
        field: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: 'Szczepienie',
        width: 75,
        sortable: true,
        dataIndex: 'immunization',
        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
        field: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: 'Dom tymczasowy',
        flex: 1,
        sortable: true,
        dataIndex: 'id_temp',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            if (value) {
                if (item = Ext.getStore('Temps').getById(value)) {
                    return item.getData().name + ' ' + item.getData().surname + ', ' + item.getData().address;
                }
            }
            return '';
        },
        editor: {
            xtype: 'combobox',
            flex: 1,
            typeAhead: false,
            editable: false,
            valueField: 'id',
            store: 'Temps',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<li class="x-boundlist-item" unselectable="on" role="option">',
                '<tpl if="name">{name} {surname}, {address}</tpl>',
                '</li>',
                '</tpl>'
            ),
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<tpl if="name">{name} {surname}, {address}</tpl>',
                '</tpl>'
            ),
            listeners: {
                select: function( combo, records, eOpts ) {

                }
            }
        }
    }, {
        header: 'Dom stały',
        flex: 1,
        sortable: true,
        dataIndex: 'id_house',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            if (value) {
                if (item = Ext.getStore('Houses').getById(value)) {
                    return item.getData().name + ' ' + item.getData().surname + ', ' + item.getData().address;
                }
            }
            return '';
        },
        editor: {
            xtype: 'combobox',
            flex: 1,
            typeAhead: false,
            editable: false,
            valueField: 'id',
            store: 'Houses',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<li class="x-boundlist-item" unselectable="on" role="option">',
                '<tpl if="name">{name} {surname}, {address}</tpl>',
                '</li>',
                '</tpl>'
            ),
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<tpl if="name">{name} {surname}, {address}</tpl>',
                '</tpl>'
            )
        }
    }, {
        header: 'Opis',
        id: 'animalListDesc',
        width: 75,
        align: 'center',
        sortable: false,
        groupable: false,
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return '<img src="/html/img/application_view_list.png" alt="" />';
        },
        listeners: {
            'click': function( grid, record, item, index, e, eOpts) {
                Ext.create('Ext.window.Window', {
                    title: 'Opis',
                    height: '80%',
                    width: '80%',
                    items: [{
                        xtype     : 'textareafield',
                        grow      : false,
                        fieldLabel: '',
                        labelAlign: 'top',
                        labelSeparator: '',
                        width: '100%',
                        height: '80%',
                        listeners: {
                            afterrender: function(obj, eOpts ) {
                                obj.setHeight(obj.up('window').getHeight() * 0.8);
                                obj.setValue(grid.getStore().getById(grid.getSelectionModel().getSelection().pop().getData().id).getData().description);
                            }
                        }
                    },{
                        xtype: 'button',
                        text: 'Zapisz',
                        margin: '0 10px 0 10px',
                        handler: function(obj, event) {
                            Ext.Ajax.request({
                                url: '/animals',
                                method : 'PUT',
                                params: {
                                    id: grid.getSelectionModel().getSelection().pop().getData().id,
                                    description: obj.up('window').down('textarea').getValue()
                                },
                                success: function(response){
                                    Ext.Msg.show({
                                        title:'OK',
                                        msg: 'Dane zapisane poprawnie',
                                        icon: Ext.Msg.INFO,
                                        buttons: Ext.Msg.OK
                                    });
                                    grid.getStore().reload();
                                }
                            });
                        }
                    },{
                        xtype: 'button',
                        text: 'Zamknij',
                        handler: function(obj, event) {
                            obj.up('window').close()
                        }
                    }]
                }).show();
            }
        }
    }, {
        header: 'Ogłoszenia',
        width: 75,
        align: 'center',
        sortable: false,
        groupable: false,
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return '<img src="/html/img/pen.gif" alt="" />';
        },
        listeners: {
            'click': function( grid, record, item, index, e, eOpts) {
                Ext.create('Ext.window.Window', {
                    title: 'Ogłoszenia ',
                    height: '80%',
                    width: '80%',
                    items: [
                        Ext.create('Ext.tab.Panel', {
                            activeTab: 0,
                            bodyPadding: 10,
                            tabPosition: 'top',
                            layout: 'fit',
                            height: '100%',
                            items: [
//                                Fgz.createAnnouncementTab('announcement_tablica','OLX - Tablica'),
//                                Fgz.createAnnouncementTab('announcement_gumtree','Gumtree'),
//                                Fgz.createAnnouncementTab('announcement_facebook','Facebook')
                            ]
                        })
                    ]
                }).show();
            }
        }
    }, {
        id: 'photo',
        header: 'Zdjęcia',
        width: 75,
        align: 'center',
        sortable: false,
        groupable: false,
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view){
            return '<img src="/html/img/image.png" alt="" />';
        },
        listeners: {
            'click': function( grid, record, item, index, e, eOpts) {
                Ext.create('Ext.window.Window', {
                    title: 'Zdjęcia - ' + eOpts.getData().name,
                    height: '80%',
                    width: '80%',
                    layout: 'fit',
                    items: [
                        Ext.create('Fgz.component.Album', {
                            folder: eOpts.getData().id
                        })
                    ]
                }).show();
            }
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Usuń zaznaczone',
            tooltip:'Usuń zaznaczone zwierzaki',
            iconCls:'remove',
            handler: function() {
                Ext.getStore('Animals').remove(this.up('grid').getSelectionModel().getSelection());
            }
        },{
            text:'Dodaj...',
            tooltip:'Dodaj nowego zwierzaka',
            iconCls:'add',
            handler: function() {
                Ext.create('Ext.Window', {
                    title: 'Dodaj nowego zwierzaka',
                    width: 400,
                    height: '80%',
                    plain: true,
                    headerPosition: 'top',
                    layout: 'fit',
                    items: Ext.create('Ext.form.Panel', {
                        url: 'animals/',
                        frame: true,
                        bodyPadding: 5,

                        fieldDefaults: {
                            labelAlign: 'left',
                            labelWidth: 90,
                            anchor: '100%'
                        },

                        items: [{
                            xtype: 'textfield',
                            name: 'name',
                            fieldLabel: 'Imię',
                            allowBlank: false
                        }, {
                            xtype: 'textfield',
                            name: 'name2',
                            fieldLabel: 'Imię2',
                            allowBlank: true
                        },{
                            xtype: 'datefield',
                            name: 'birth',
                            fieldLabel: 'Data urodzenia',
                            format: 'Y-m-d'
                        }, {
                            xtype: 'combobox',
                            name: 'sex',
                            fieldLabel: 'Płeć',
                            store: 'Sexes',
                            typeAhead: false,
                            editable: false,
                            triggerAction: 'all',
                            displayField: 'name',
                            valueField: 'id',
                            value: 0
                        }, {
                            xtype: 'combobox',
                            name: 'id_type',
                            fieldLabel: 'Rodzaj',
                            store: 'Types',
                            typeAhead: false,
                            editable: false,
                            triggerAction: 'all',
                            displayField: 'name',
                            valueField: 'id'
                        }, {
                            xtype: 'combobox',
                            name: 'id_breed',
                            fieldLabel: 'Rasa',
                            store: 'Breeds',
                            typeAhead: false,
                            editable: false,
                            triggerAction: 'all',
                            displayField: 'name',
                            valueField: 'id',
                            listeners: {
                                collapse: function(obj, eOpts) {
                                    obj.getStore().clearFilter();
                                },
                                expand: function(obj, eOpts) {
                                    obj.getStore().filter([{
                                        fn: function(record) {
                                            return record.getData().id_type == obj.up('form').getForm().findField('id_type').getValue();
                                        }
                                    }]);
                                }
                            }
                        }, {
                            xtype: 'combobox',
                            name: 'id_temp',
                            fieldLabel: 'Dom tymczasowy',
                            store: 'Temps',
                            typeAhead: false,
                            editable: false,
                            triggerAction: 'all',
                            valueField: 'id',
                            tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<li class="x-boundlist-item" unselectable="on" role="option">{name} {surname}</li>',
                                '</tpl>'
                            ),
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{name} {surname}',
                                '</tpl>'
                            )
                        }],
                        buttons: ['->', {
                            formBind: true,
                            disabled: true,
                            text: 'Zapisz',
                            width: 140,
                            align: "right",
                            handler: function(obj) {
                                var form = obj.findParentByType('form').getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        failure: function(form, action) {
                                            switch (action.response.status) {
                                                case 201: {
                                                    obj.findParentByType('window').close();
                                                    Ext.getStore('Animals').reload();
                                                    Ext.Msg.show({
                                                        title:'OK',
                                                        msg: 'Dane zapisane poprawnie',
                                                        icon: Ext.Msg.INFO,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                    break;
                                                }
                                                case 204: {
                                                    break;
                                                }
                                                case 404: {
                                                    break;
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }, {
                            text: 'Anuluj',
                            handler: function() {
                                this.up('.window').close();
                            }
                        }],
                        listeners: {
                            submit: function(obj, eOpts) {
                                console.log(obj);
                            }
                        }
                    })
                }).show();
            }
        }]
    }]
});