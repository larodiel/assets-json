const glob = require("glob");
const md5  = require('md5');
const fs   = require('fs');
const path = require('path');

const assetsJson = ({source, dest = './'}) =>{
  glob(source, {ignore: [
        '/node_modules',
        './node_modules/**',
        './vendor/**',
        './bower_components/**'
      ]} , (err, files) => {
    if(err) throw err;

    const assets = [];

    console.log('\n\n')

    for (let i = 0; i < files.length; i++) {
      const version          = md5(fs.statSync(files[i]).mtime);
      const file_details     = path.parse(files[i]);
      let   type             = file_details.ext;
            file_details.dir = file_details.dir.replace('./', '');
            file_details.full_dir = `${file_details.dir}/${file_details.base}`

      if(file_details.ext.search(/.+(js|ts|mjs)/) !== -1) {
        type = 'script';
      } else if(file_details.ext.search(/.+(css|scss|less|stylus)/) !== -1) {
        type = 'style'
      } else if(file_details.ext.search(/.+(json|xml|jsonld|csv)/) !== -1) {
        type = 'data'
      } else if(file_details.ext.search(/.+(otf|ttf|eot|svg|woff|woff2)/) !== -1) {
        type = 'font'
      } else if(file_details.ext.search(/.+(jpg|png|gif|ico|jpeg|webp)/) !== -1) {
        type = 'image'
      } else if(file_details.ext.search(/.+(mov|mpeg|mp4|ogv|webm)/) !== -1) {
        type = 'video'
      } else if(file_details.ext.search(/.+(mp3|weba)/) !== -1) {
        type = 'audio'
      } else if(file_details.ext.search(/.+(pdf|doc|docx|txt|ppt|epub)/) !== -1) {
        type = 'document'
      } else if(file_details.ext.search(/.+(html|xhtml|htm)/) !== -1) {
        type = 'html'
      }

      assets.push({
        type: type,
        ver: version,
        path: file_details
      })

      console.log(`- Including the file ${file_details.base} on json`)
    }

    fs.writeFile(`${dest}assets.json`, JSON.stringify(assets), 'utf8', (err) => {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log('\n','Assets JSON has been saved.', '\n');
    });
  })
}

module.exports = {
  assetsJson
}
