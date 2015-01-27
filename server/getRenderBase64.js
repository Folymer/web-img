var phantom = require('phantom');
var fs = require('fs');

var tempFileName = 'chapter_tmp';
var format = 'png';
var tempFileFullName = tempFileName+'.'+format;

function getRenderBase64(url, callback, viewportSize, imgSize){
	phantom.create(function (ph) {
		ph.createPage(function (page) {
			page.set('viewportSize', viewportSize);
			page.open(url, function (status) {
				page.render(tempFileFullName, {format: format, quality: '100'}, function () {
					ph.exit();
					require('lwip').open(tempFileFullName, function(err, image){
						image.batch()
							.crop(0, 0,viewportSize.width, viewportSize.height)
							.contain(imgSize.width, imgSize.height)
							.toBuffer(format, function(err, buffer){
								callback(new Buffer(buffer).toString('base64'));
							})
					});
				});
			});
		});
	}, {
	  dnodeOpts: {
	    weak: false
	  }
	});
}

module.exports = getRenderBase64;