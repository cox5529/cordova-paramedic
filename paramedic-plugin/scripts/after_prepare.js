#!/usr/bin/env node

function addAttribute(data, key, value, element) {
  var attribute = key + '="' + value + '"';
  if (data.indexOf(attribute) < 0) {
    data = data.replace('<' + element, '<' + element + ' ' + attribute + ' ');
  }

  return data;
}

module.exports = function (context) {
  let fs = require('fs'),
    path = require('path');

  // android platform directory
  let platformAndroidDir = path.join(context.opts.projectRoot, 'platforms/android');

  // android app module directory
  let platformAndroidAppModuleDir = path.join(platformAndroidDir, 'app');

  // android manifest file
  let androidManifestFile = path.join(platformAndroidAppModuleDir, 'src/main/AndroidManifest.xml');

  if (fs.existsSync(androidManifestFile)) {
    fs.readFile(androidManifestFile, 'UTF-8', function (err, data) {
      if (err) {
        throw new Error('Unable to find AndroidManifest.xml: ' + err);
      }

      data = addAttribute(data, 'android:requestLegacyExternalStorage', 'true', 'application');

      data = addAttribute(data, 'android:usesCleartextTraffic', 'true', 'application');

      fs.writeFile(androidManifestFile, data, 'UTF-8', function (err) {
        if (err) throw new Error('Unable to write into AndroidManifest.xml: ' + err);
      });
    });
  }
};
