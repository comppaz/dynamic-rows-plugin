;(function ( $, window, document, undefined ) {

    var pluginName = 'dynamicRows',
        defaults = {

            buttonClassAdd         : 'btn btn-default',
            buttonClassRemove      : 'btn btn-danger',
            buttonContentAdd       : "<span class='glyphicon glyphicon-plus'></span>",
            buttonContentRemove    : "<span class='glyphicon glyphicon-remove'></span>",
            buttonContainerClass   : 'buttonContainer',
            minRows                : 1,
            maxRows                : 5

        };

    function DynamicRows( element, options ) {

        this.$element       = $(element);
        this.options        = $.extend( {}, defaults, options) ;
        this._defaults      = defaults;
        this._name          = pluginName;

        this.rowTemplate    = this.$element.html();
        this.numRows        = 1;

        this.init();

    }

    DynamicRows.prototype.init = function () {

        $("." + this.options.buttonContainerClass)
            .append(this.generateAddButton());

    };
    DynamicRows.prototype.generateAddButton = function(){
        return $("<button type='button' class='" + this.options.buttonClassAdd + "'></button>")
                    .html(this.options.buttonContentAdd)
                    .on('click', this.callbackAddRow.bind(this));
    };

    DynamicRows.prototype.generateDeleteButton = function(){
        return $("<button type='button' class='" + this.options.buttonClassRemove + "'></button>")
                    .html(this.options.buttonContentRemove)
                    .on('click', this.callbackRemoveRow.bind(this));
    };

    DynamicRows.prototype.callbackAddRow  = function(event){

        var currentRow = $(this.$element.children('div')[this.numRows - 1]);
            newRow = $(this.rowTemplate).attr('data-row-num', this.numRows + 1);

        // Replace add button with remove button in the current row
        currentRow
              .children('.' + this.options.buttonContainerClass)
              .html(this.generateDeleteButton());

        // Insert an add button to new row
        newRow
              .children('.' + this.options.buttonContainerClass)
              .append(this.generateAddButton());

        this.$element.append(newRow);

        this.numRows++;

    };

    DynamicRows.prototype.callbackRemoveRow  = function(event){

        var currentRow = $(event.target).parents("div[data-row-num]");

        currentRow.remove();

        this.$element
                .children('div')
                .last()
                .children('.' + this.options.buttonContainerClass)
                .html(this.generateAddButton());

        this.numRows--;

    };

    DynamicRows.prototype.readjustRowNums   = function(){
        var num = 1;
        this.$element
            .children('div[data-row-num]')
            .each(function(i,el){
                $(el).data('row-num', num);
                num++;
            });
        return num;
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new DynamicRows( this, options ));
            }
        });
    }

})( jQuery, window, document );