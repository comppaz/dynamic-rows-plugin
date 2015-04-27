/**
 * dynamicRows jQuery plugin
 *
 * Detailed documentation & examples can be found on https://github.com/comppaz/dynamic-rows-plugin.
 *
 * @author  Antonio Maiolo
 * @copyright 2015
 * @license http://opensource.org/licenses/mit-license.php . The MIT License (MIT).
 */
;(function ( $, window, document, undefined ) {

    var pluginName = 'dynamicRows',
        defaults = {

            buttonClassAdd         : 'btn btn-default',
            buttonClassRemove      : 'btn btn-danger',
            buttonContentAdd       : "<span class='glyphicon glyphicon-plus'></span>",
            buttonContentRemove    : "<span class='glyphicon glyphicon-remove'></span>",
            buttonContainerClass   : 'buttonContainer',
            onInitCompleted        : "",
            onRowAdded             : "",
            onRowRemoved           : "",
            minRows                : 1,
            maxRows                : 5

        };
    /**
     * Plugin Class
     * @param element {object}
     * @param options {object}
     */
    function DynamicRows( element, options ) {

        this.$element       = $(element);
        this.options        = $.extend( {}, defaults, options) ;
        this._defaults      = defaults;
        this._name          = pluginName;

        this.rowTemplate    = this.$element.html();
        this.numRows        = 1;

        this.init();

    }
    /**
     * Init function appending an add button to the first row.
     */
    DynamicRows.prototype.init = function () {

        $("." + this.options.buttonContainerClass)
            .append(this.generateAddButton());

        if(typeof this.options.onInitCompleted === "function"){
            this.options.onInitCompleted.call(this, this.numRows);
        }

    };

    /**
     * Generates a button for adding new rows. Uses html code passed as option.
     * @return {object}
     */
    DynamicRows.prototype.generateAddButton = function(){
        return $("<button type='button' class='" + this.options.buttonClassAdd + "'></button>")
                    .html(this.options.buttonContentAdd)
                    .on('click', this.callbackAddRow.bind(this));
    };

    /**
     * Generates a button for removing rows. Uses html code passed as option.
     * @return {object}
     */
    DynamicRows.prototype.generateDeleteButton = function(){
        return $("<button type='button' class='" + this.options.buttonClassRemove + "'></button>")
                    .html(this.options.buttonContentRemove)
                    .on('click', this.callbackRemoveRow.bind(this));
    };

    /**
     * Callback that is attached to every add button.
     * Replaces button in the current row and inserts new row.
     *
     * @param event {object}
     * @return {void}
     */
    DynamicRows.prototype.callbackAddRow  = function(event){

        if(this.numRows === this.options.maxRows){
            return;
        }

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

        if(typeof this.options.onRowAdded === "function"){
            this.options.onRowAdded.call(this, newRow, this.numRows);
        }

        this.numRows++;

    };

    /**
     * Callback that is attached to the remove buttons.
     * Removes row, replaces previous button and recalculates row numbers.
     * @param event {object}
     * @return {void}
     */
    DynamicRows.prototype.callbackRemoveRow  = function(event){

        if(this.numRows === this.options.minRows){
            return;
        }

        var currentRow = $(event.target).parents("div[data-row-num]");

        currentRow.remove();

        this.$element
                .children('div')
                .last()
                .children('.' + this.options.buttonContainerClass)
                .html(this.generateAddButton());

        this.readjustRowNums();

        if(typeof this.options.onRowRemoved === "function"){
            this.options.onRowRemoved.call(this, currentRow, this.numRows);
        }
    };

    /**
     * Recalculate the row number for the data attribute.
     * @return {number}
     */
    DynamicRows.prototype.readjustRowNums   = function(){
        var num = 1;
        this.$element
            .children('div[data-row-num]')
            .each(function(i,el){
                $(el).attr('data-row-num', num);
                num++;
            });
        this.numRows = num - 1;
        return num;
    }

    /**
     * Attach plugin to jQuery interface.
     * @param options {object}
     * @return {object}
     */
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new DynamicRows( this, options ));
            }
        });
    }

})( jQuery, window, document );