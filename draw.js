//set up canvas context and size
var canvas=document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var primus = Primus.connect('adams-macbook-pro-8.local/draw');

primus.on('open', function () {
    console.log("Houston, we have liftoff.");
    primus.write("requestLog");
});

primus.on('data', function  (data) {
        console.log(data);
    if(data.id=='dot'){
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
    if (data=='erased!') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
});

//mouse state variables and dot counter
var dots = 0;
var mousedwn = false;
var mousemve = false;

var dotSize = 15;
var userColor;
var me;

console.log("You're connected!:D");

//array of possible user colors
var colors = [
    "#FF0000", 
    "#008000", 
    "#0000FF", 
    "#FFA500", 
    "#00FFFF", 
    "#FF00FF"
];

//color names to print to console for reference
var colorNames = [
    "Red",
    "Green",
    "Blue",
    "Orange",
    "Cyan",
    "Magenta"
]

//keep track of taken colors for collaborative
var colorTaken = [
    false,
    false,
    false,
    false,
    false,
    false
]

function colorMore () {
    // body...
    colorTaken = [
    false,
    false,
    false,
    false,
    false,
    false
    ]
}

function erase () {
    primus.write('erase');
}
//function for actually picking a user color
var colorPicker= function (number){

    //consider regular expression here for hex input


    //take a number between 0-5 inclusive
    if (number<6&&number>=0){
        userColor = colors[number];
        var clrname = colorNames[number];

        //colorTaken[number]=true;
        console.log((number), clrname, userColor);
    } else if (number>=6) {
        number = number%6;
        userColor = colors[number];
        var clrname = colorNames[number];

        //colorTaken[number]=true;
        console.log((number), clrname, userColor);
    }else if (number===undefined){
        //random number up to 6
        var random = Math.floor(Math.random()*6);

        //if the taken value is false, proceed to set color vars
        if (!colorTaken[random]) {
            //set color data
            userColor = colors[random];
            var clrname = colorNames[random];


            colorTaken[random]=true;
            console.log((random), clrname, userColor);
        } else{
            colorPicker();
        } 
    } else {
        console.log('Only 0-5 \(which includes 0-5\)');
    }
} 

//track mouse events to keep mouse state up to date
function mouseButt (event) {
    // when the mouse is down, state is true
    if (event.type=='mousedown'){
        //Draw dots when you click instead of requiring mousemove to draw
        mousedwn=true;
        console.log("mousedwn=true");
        //count dots 'n poop
        dots++;
        //tell them how many dots if it's a multiple of ten
        if (dots%10==0) { 
            console.log(event.type);
            console.log("you've made "+dots+" dots");
        };
        var x = event.clientX;
        var y = event.clientY;

        //tell the server the awesome thing you accomplished!
        primus.write(
            {id: 'dot', 
            color: userColor, 
            xCoord: x, 
            yCoord: y, 
            diam: dotSize});
    } //when you let go, it's false
        else if (event.type=='mouseup'){
            mousedwn=false;
            console.log("mousedwn=false");
        }
}

//change dot size
function diam (num) {
    // body...
    if (num>0){
        dotSize = num;
    }else{
        console.log("Something bad happened. I need a number that is greater than zero.");
    }
}

//draw circles
var circle = function (event){ 
    //check mouse state
    if (mousedwn){
        //when mouse moves AND is down
        
        
        //count dots 'n poop
        dots++;
        //tell them how many dots if it's a multiple of ten
        if (dots%10==0) { 
            console.log(event.type);
            console.log("you've made "+dots+" dots");
        };
        var x = event.clientX;
        var y = event.clientY;
        //tell the server the awesome thing you accomplished!
        primus.write(
            {id: 'dot', 
            color: userColor, 
            xCoord: x, 
            yCoord: y, 
            diam: dotSize});
    }

}