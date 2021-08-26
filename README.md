# Description
This package will be used to generate a JSON file with all your assets.
It will make easier to include your files on your system and also helps to control it version.

# To Install
To use it you will need to intall the package using the `npm`

`npm i @larods/assets-json --save-dev`

# How to use

After install you'll need to add the package into your js.

`const { assetsJson } = require('@larods/assets-json')`

After add it you can use the function to generate your `assets.json`

The function needs 2 parameters passed as object:
- `source` : defines the folder where the package will look into to build the json. It must to be the a [glob string](https://www.npmjs.com/package/glob)
- `dest` : The path of the directory where the `assets.json` will be saved.

# Example
```javascript
const { assetsJson } = require('@larods/assets-json');
assetsJson({
  source: './**/dist/**/*.+(css|js)',
  dest: './'
})
```

# JSON Sample
```json
[{
  "type": "style",
  "ver": "411248ad8aca994eedcca277229a60a3", //based on modification date
  "path": {
    "root": "",
    "dir": "dist/styles",
    "base": "main.css",
    "ext": ".css",
    "name": "main",
    "full_dir": "dist/styles/main.css"
  }
}, {
  "type": "script",
  "ver": "411248ad8aca994eedcca277229a60a3", //based on modification date
  "path": {
    "root": "",
    "dir": "dist/script",
    "base": "main.js",
    "ext": ".js",
    "name": "main",
    "full_dir": "dist/script/main.js"
  }
}]
```

# Using to add assets to WordPress
```php
add_action('wp_enqueue_scripts', function(){
  //Get the assets.json that is on theme root
  $assets_json_path = get_stylesheet_directory().'/assets.json';
  //Get theme URL
  $theme_uri = get_stylesheet_directory_uri();

  //Verify if the json file exists
  if(file_exists($assets_json_path)) {
    //Get the assets json
    $files = json_decode( file_get_contents($assets_json_path) );
    //Get files quantity to avoid use the count function on a loop
    $files_count = count($files);

    for ($i=0; $i < $files_count; $i++) {
      //Build the handle string to be used on enqueue function
      $handle = $files[$i]->path->name.$files[$i]->type;
      //Get file URL
      $src = $theme_uri.'/'.$files[$i]->path->full_dir;

      //Check if it's a style and enqueue it with the version
      if($files[$i]->type === 'style') {
        wp_enqueue_style($handle, $src, '', $files[$i]->ver);
      }
      //Check if it's a script and enqueue it
      elseif ($files[$i]->type === 'script') {
        wp_enqueue_script($handle, $src, ['jquery'], $files[$i]->ver);
      }
    }
  }
});
```

# TL;DR
- `npm i @larods/assets-json --save-dev`
- `const { assetsJson } = require('@larods/assets-json')`
- 2 parameters
  - `source` : defines the folder where the package will look into to build the json. It must to be the a [glob string](https://www.npmjs.com/package/glob)
  - `dest` : The path of the directory where the `assets.json` will be saved.

```javascript
const { assetsJson } = require('@larods/assets-json');
assetsJson({
  source: './**/dist/**/*.+(css|js)',
  dest: './'
})
```