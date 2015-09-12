var gpio = require('pi-gpio');
var now = require('performance-now');

//echo
gpio.open(15, 'input', function(err){
	console.log(err);
	gpio.read(15, function(err, value){
		if(err) throw err;

		console.log(value);
	})
})

//trigger
gpio.open(14, 'output', function(err){
	console.log(err);
	gpio.write(14, 0, function(){
		console.log('set trigger to 0');
	});
	setTimeout(function(){
		var start = now(); 
		gpio.write(14, 1, function(){
			var end = now();
			console.log('set trigger to 1 for ' + (end-start) + ' micro seconds');
			gpio.write(14, 0, function(){
				console.log('set trigger to 0');
			});
			gpio.close(14);
		});
	}, 1000);
	
});

