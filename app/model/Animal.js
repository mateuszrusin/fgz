Ext.define('Fgz.model.Animal', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'id_type', type: 'int'},
        {name: 'id_breed', type: 'int'},
        {name: 'id_temp', type: 'int'},
        {name: 'id_house', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'name2', type: 'string'},
        {name: 'sex', type: 'int'},
        {name: 'birth', type: 'date', dateFormat:'c'},
        {name: 'color', type: 'string'},
        {name: 'announcement_tablica', type: 'string'},
        {name: 'announcement_gumtree', type: 'string'},
        {name: 'announcement_facebook', type: 'string'},
        {name: 'deworming', type: 'date', dateFormat:'c'},
        {name: 'immunization', type: 'date', dateFormat:'c'},
        {name: 'description', type: 'text'},
        {name: 'type', type: 'string', mapping: 'type.name'},
        {name: 'breed', type: 'string', mapping: 'breed.name'}
    ]
});