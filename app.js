var settings = require('./settings')
var fs = require('fs');
var JSONStream = require('JSONStream');
var request = require('request');

// The json zootool bookmark file should be supplied as a command line argument
var ztfile=process.argv[2];

var parser = JSONStream.parse([true]);

var file = fs.createReadStream(ztfile);

file.pipe(parser);

parser.on('data',function(data) {
	console.log(data.title);
	var url='https://api.pinboard.in/v1/posts/add?auth_token='+settings.api_token;
	if (data.url) { //There should always be a URL, but if not, don't process this one
		url+='&url='+encodeURIComponent(data.url);
		if (data.title) {
			url+='&description='+encodeURIComponent(data.title);
			} 
		if (data.added) {
			var added = new Date(data.added*1000);
			var utc=added.getUTCFullYear()+"-"+added.getUTCMonth()+"-"+added.getUTCMonth()+"T"+added.getUTCHours()+":"+added.getUTCMinutes()+":"+added.getUTCSeconds()+"Z";
			url+='&dt='+encodeURIComponent(utc);
			}	
		if (data.public&&data.public=='y') {
			url+='&shared=yes';
			} else {
			url+='&shared=no';
			}
		if (data.description) {
			url+='&extended='+encodeURIComponent(data.description);
			}
		if (data.tags) {
			url+='&tags='+encodeURIComponent(data.tags.toString());
			}	
		request(url,function (error, response, body) {
				if (error) {
					console.log("Error: "+error+"\n");
					}
				if (response.statusCode != 200) {
					console.log("HTTP Response Code: "+response.statusCode+"\n");
					}
				console.log(body+"\n\n");
			});
		parser.pause(); //pinboard requires a 3 second delay between calls
		setTimeout(function() {parser.resume();},3000);
		}		
});

