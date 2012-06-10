/**
 * S3Conduit.js
 *  
 * Phonegap S3Conduit plugin
 *
 */

var S3Conduit = function(){};

S3Conduit.prototype.upload = function(types, success, fail) {
      return cordova.exec(success, fail, "S3Conduit", "upload", options);
};

Cordova.addConstructor(function()  {
	if(!window.plugins) {
		window.plugins = {};
	}
	window.plugins.s3conduit = new S3Conduit();
});
