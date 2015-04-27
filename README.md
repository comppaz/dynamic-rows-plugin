# Dynamic rows (jQuery plugin)

This plugin allows to create dynamic rows in a form.
Simply template your row in an extra container and run this plugin on its jQuery selector.
You can find a simple demo [here](http://demo.maiolo.net/dynamic-rows-plugin/).

## Basic initialization
### HTML
```
<form class="form-horizontal">
	<div id = "main">
		<div class="row" data-row-num = "1">
			<div class="col-md-3">
				<label for="firstName[]" class="col-md-5">
					First Name
				</label>
				<div class="col-md-7">
					<input type="text" name="firstName[]" class="form-control" placeholder="First Name"/>
				</div>
			</div>
			<div class="col-md-3">
				<label for="lastName[]" class="col-md-5">
					Last Name
				</label>
				<div class="col-md-7">
					<input type="text" name="lastName[]" class="form-control" placeholder="Last Name"/>
				</div>
			</div>
			<div class="col-md-4 buttonContainer">

			</div>
		</div>
	</div>
</form>
```
### JavaScript
```
$("#main").dynamicRows(your-options);
```

## Defaults & Editable Options

Although the defaults are clearly targeted to work with Bootstrap 3.3, the plugin is fully customizable.

```
{
    buttonClassAdd         : 'btn btn-default', // string
    buttonClassRemove      : 'btn btn-danger',  // string
    buttonContentAdd       : "<span class='glyphicon glyphicon-plus'></span>", // string
    buttonContentRemove    : "<span class='glyphicon glyphicon-remove'></span>", // string
    buttonContainerClass   : 'buttonContainer', // string
    onInitCompleted        : "", // function
    onRowAdded             : "", // function
    onRowRemoved           : "", // function
    minRows                : 1,  // number
    maxRows                : 5,  // number

}
```


