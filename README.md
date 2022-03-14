# Introduction

`abi-loader` is an interface for loading asynchronous scripts.

This script makes asynchronous javascript loading simple and easy.
It is possible to load scripts in pre-defined order by setting script dependencies.

# Usage

The script must be loaded synchronously before any other script or included as inline script in the head section of your web page.
Example of including the file abi-loader.min.js in the head section:

```html
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 <script src="./src/abi-loader.min.js"></script>
</head>
```

For example, we want to load jquery asynchronously and after it loads the dependent plugins.

```html
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 <script src="./src/abi-loader.min.js"></script>
 <script async src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" onLoad="abi_done('jquery')"></script>
</head>
```

The function `abi_done()` registers the download of the jquery script under the name `"jquery"`.
Then anywhere we can call the function `abi_onload` that performs an action as soon as the downloading of files from the list finishes.

```html
<script>
 abi_onload('jquery', function(){
  alert('jQuery is loaded!');
 });
</script>
```

You can wait for multiple files to load by specifying a space-seprated list of required modules.

```html
<script>
 abi_onload('jquery load-images', function(){
  alert('jQuery and load-images scripts are loaded!');
 });
</script>
```

If you need to wait until the DOM is loaded before loading the scripts, use the reserved word `dom`:

```html
<script>
 abi_onload('jquery dom', function(){
  alert('jQuery and DOM are loaded!');
 });
</script>
```

You can asynchronously load another script:

```html
<script>
 abi_onload('jquery', function(){
  loadScript('https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js', 'jQueryMobile');
 });

 abi_onload('jQueryMobile', function(){
  alert('jQuery Mobile is loaded!');
 });
</script>
```

You can use callback function in `loadScript` function:

```html
<script>
 abi_onload('jquery', function(){
  loadScript('https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js', 'jQueryMobile', function(){
   alert('jQuery Mobile is loaded!');
  });
 });
</script>
```

You can also load CSS files asynchronously and make other scripts depend on it.
To do this, the CSS file must be loaded like this:

```html
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
 <script src="./src/abi-loader.min.js"></script>
 <script async src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" onLoad="abi_done('jquery')"></script>
 <link rel="stylesheet" href="main.css" media="none" onload="this.onload=null;this.media='all';abi_done('main.css');" />
</head>
```

Now you can execute the code when the jQuery and main.css files are loaded:

```html
<script>
 abi_onload('jquery main.css', function(){
   alert('jQuery and main.css are loaded!');
 });
</script>
```

As an extra feature, the script adds classes to the html tag to make coding simple. For example:

```html
<html lang="en" id="zombler" class="webp font-roboto w2 no-wide medium">
```

List of classes:

* .webp - The browser supports webp
* .no-webp - The browser no supports webp
* .font-{roboto} - Each externally loaded font adds a class with the name of the font as soon as it is loaded.
* .w1 - Window width `<=` 480px
* .w2 - 480px `<` Window width `<=` 768px
* .w3 - 768px `<` Window width `<=` 1024px
* .w4 - 1024px `<` Window width `<=` 1280px
* .w5 - Window width `>` 1280px
* .no-wide - Window width `<=` 768px
* .wide - Window width `>` 768px
* .small - Window width `<=` 480px
* .medium - 480px `<` Window width `<=` 1024px
* .large - Window width `>` 1024px

Use these classes in your css files as shown below:

```css
html.w1 div.btn {
  background:blue;
}
html.w2 div.btn {
  background:red;
}
html.w3 div.btn {
  background:grey;
}
```

# Author

Thank you for your interest in my library. I look forward to getting feedback from you.

Regards
Alexander Momot
https://www.zombler.com

# License

MIT





