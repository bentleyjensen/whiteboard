var primus = Primus.connect('adams-macbook-pro-8.local/draw');

primus.on('open', function () {
	console.log("Houston, we have liftoff.");
	primus.write("requestLog");
});

primus.on('data', function  (data) {
		console.log(data);
	if(data.type=='dot'){
		var xLog = data.xCoord;
	    var yLog = data.yCoord;
	    var userColorLog=data.color;
	    var dotSizeLog=data.diam;
	    
	    //draw the circle 
	    ctx.beginPath();
	           //x-pos, y-pos, diameter, start angle, end angle in radians
	    ctx.arc(xLog,yLog,dotSizeLog,0,2*Math.PI);
	    ctx.fillStyle=userColorLog;
	    ctx.fill();
	}
});