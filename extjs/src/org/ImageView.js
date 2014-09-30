
Ext.define('Ext.org.ImageView', {
	id: 'Ext.org.ImageView',
    extend: 'Ext.view.View',
    alias : 'widget.imageview',
    tpl: [
        '<tpl for=".">',
            '<div class="thumb-wrap" style="float: left; margin: 10px; height: 80px;">',
                '<div class="thumb">',
                    '<img src="{mini}" style="width: 80px;"/>',
                '</div>',
            '</div>',
        '</tpl>'
    ],
    
    itemSelector: 'div.thumb-wrap',
    multiSelect: true,
    singleSelect: false,
    cls: 'x-image-view',
    autoScroll: true,
    store: Ext.create('Ext.data.Store', {
        buffered: false,
        autoLoad: false,
        fields: ['path', 'mini', 'width', 'height'],
        proxy: {
            type: 'ajax',
            url : '',
            reader: {
                type: 'json',
                root: 'photos'
            }
        }
    })
});