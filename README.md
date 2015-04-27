# Dynamic rows (jQuery plugin)

This plugin allows to create dynamic rows in a form. 
Simply template your row in an extra container and run this plugin on its jQuery selector.
You can find a simple demo [here](http://demo.maiolo.net/dynamic-rows-plugin/).

## Basic initialization

```
$("#your-container-id").dynamicRows(your-options);
```

## Defaults & Editable Options

Although the defaults are clearly targeted to work with Bootstrap 3.3, the plugin is fully customizable.

```
{
    buttonClassAdd         : 'btn btn-default',
    buttonClassRemove      : 'btn btn-danger',
    buttonContentAdd       : "<span class='glyphicon glyphicon-plus'></span>",
    buttonContentRemove    : "<span class='glyphicon glyphicon-remove'></span>",
    buttonContainerClass   : 'buttonContainer',
    minRows                : 1,
    maxRows                : 5
}
```


