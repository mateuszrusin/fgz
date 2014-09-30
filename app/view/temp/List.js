Ext.define('Fgz.view.temp.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.temp.List',
    title: 'Domy tymczasowe',
    store: 'Temps',
    frame: true,
    columnLines: true,
    iconCls: 'icon-temp',
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
        header: 'Nazwisko',
        flex: 1,
        sortable: true,
        dataIndex: 'surname',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    }, {
        header: 'Ulica',
        flex: 1,
        sortable: true,
        dataIndex: 'address',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    }, {
        header: 'Kod',
        flex: 1,
        sortable: true,
        dataIndex: 'code',
        validFlag : true,
        editor: {
            xtype: 'textfield',
            allowBlank: false,
            maxLength: 6,
            validator: function(value) {
                return /[0-9]{2}-[0-9]{3}/.test(value);
            }
        }
    }, {
        header: 'Miasto',
        flex: 1,
        sortable: true,
        dataIndex: 'city',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    }, {
        header: 'Telefon',
        flex: 1,
        sortable: true,
        dataIndex: 'phone',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        }
    }, {
        header: 'Informacje',
        flex: 1,
        sortable: true,
        dataIndex: 'desc',
        editor: {
            xtype     : 'textareafield',
            grow      : true,
            allowBlank: true
        }
    }, {
        header: 'Mapa',
        width: 75,
        align: 'center',
        sortable: true,
        dataIndex: 'id_breed',
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            return '<img src="/html/img/map.png" alt="" />';
        },
        listeners: {
            click: function() {

                var address  = Fgz.tab.temp.getSelectionModel().getSelection().pop().getData();

                Ext.create('Ext.Window', {
                    id: 'mapa',
                    title: 'Lokalizacja',
                    width: 400,
                    height: '80%',
                    plain: true,
                    headerPosition: 'top',
                    layout: 'fit',
                    items: [{
                        xtype: 'gmappanel',
                        center: {
                            geoCodeAddr: address.code + ' ' + address.city + ',' + address.address,
                            marker: {
                                title: address.name + ' ' + address.surname + ', ' + address.address
                            }
                        }
                    }]
                }).show();

            }
        }
    }],
    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            text: 'Usuń zaznaczone',
            tooltip:'Usuń zaznaczone domy tymczasowe',
            iconCls:'remove',
            handler: function() {
                Ext.getCmp('Fgz.grid.temps').getStore().remove(grid.getSelectionModel().getSelection());
            }
        },{
            text:'Dodaj...',
            tooltip:'Dodaj nowy dom tymczasowy',
            iconCls:'add',
            handler: function() {
                Ext.create('Ext.Window', {
                    title: 'Dodaj nowy dom tymczasowy',
                    width: 400,
                    height: '80%',
                    plain: true,
                    headerPosition: 'top',
                    layout: 'fit',
                    items: Ext.create('Ext.form.Panel', {
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
                            fieldLabel: 'Imię'
                        }, {
                            xtype: 'textfield',
                            name: 'surname',
                            fieldLabel: 'Nazwisko'
                        }, {
                            xtype: 'textfield',
                            name: 'address',
                            fieldLabel: 'Adres'
                        }, {
                            xtype: 'textfield',
                            name: 'code',
                            fieldLabel: 'Kod',
                            allowBlank: true,
                            regex : /^\d{2}-\d{3}$/,
                            regexText: "Format!!!"
                        }, {
                            xtype: 'textfield',
                            name: 'city',
                            fieldLabel: 'Miejscowość'
                        }, {
                            xtype: 'textfield',
                            name: 'phone',
                            fieldLabel: 'Telefon'
                        }, {
                            xtype: 'textareafield',
                            name: 'desc',
                            fieldLabel: 'Uwagi'
                        }],
                        buttons: ['->', {
                            formBind: true,
                            disabled: true,
                            text: 'Zapisz',
                            width: 140,
                            align: "right",
                            handler: function() {
                                var form = this.up('form').getForm();
                                if (form.isValid()) {
                                    form.submit({
                                        clientValidation: true,
                                        url: '/temp/create',
                                        success: function(form, action) {
                                            Fgz.store.temp.sort({"property":"id","direction":"ASC"});
                                            Fgz.store.temp.reload();
                                            Fgz.tab.temp.getView().refresh();
                                            form.owner.ownerCt.close();
                                            Ext.Msg.show({
                                                title:'OK',
                                                msg: 'Dane zapisane poprawnie',
                                                icon: Ext.Msg.INFO,
                                                buttons: Ext.Msg.OK
                                            });
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.show({
                                                title:'OK',
                                                msg: 'Błąd',
                                                icon: Ext.Msg.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                        }
                                    });
                                } else {
                                    alert('Błąd');
                                }
                            }
                        }, {
                            text: 'Anuluj',
                            handler: function() {
                                this.up('.window').close();
                            }
                        }]
                    })
                }).show();
            }
        }]
    }],
    listeners: {
        afterrender: function(obj, eOpts) {

        }
    },
    viewConfig: {
        getRowClass: function(record, index) {
            if (record.get('id') == 0) {
                return 'display-false';
            }
        }
    }
});