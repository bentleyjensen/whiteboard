//set up canvas context and size
var canvas=document.getElementById('makeCanvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

//mouse state variables and dot counter
var dots = 0;
var mousedwn = false;
var mousemve = false;

var dotSize = 15;


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

//function for actually picking a user color
var colorPicker= function (){
    //random number up to 6
    var random = Math.floor(Math.random()*6);

    if (!colorTaken[random]) {
        //get color data
        userColor = colors[random];
        var clrname = colorNames[random];


        colorTaken[random]=true;
        console.log((random+1), clrname, userColor);
    } else{
        colorPicker();
    }
}
function mouse (event) {
    // when the mouse is down, state is true
    if (event.type=='mousedown'){
        //Draw dots when you click instead of requiring mousemove to draw
        mousedwn=true;
        console.log("mousedwn=true");
        var x = event.clientX;
        var y = event.clientY;
        
        //draw the circle 
        ctx.beginPath();
               //x-pos, y-pos, diameter, start angle, end angle in radians
        ctx.arc(x,y,dotSize,0,2*Math.PI);
        ctx.fillStyle=userColor;
        ctx.fill();
    } //when you let go, it's false
        else if (event.type=='mouseup'){
            mousedwn=false;
            console.log("mousedwn=false");
        }
}
function diam (diam) {
    // body...
    if (diam>0){
        dotSize = diam;
    }
}
var circle = function (event){ 
    //check mouse state
    if (mousedwn){
        //when mouse moves AND is down
        
        
        //count dots 'n poop
        dots++;
        if (dots%10==0) { 
            console.log(event.type);
            console.log("you've made "+dots+" dots");
        };
        var x = event.clientX;
        var y = event.clientY;
        
        //draw the circle 
        ctx.beginPath();
               //x-pos, y-pos, diameter, start angle, end angle in radians
        ctx.arc(x,y,dotSize,0,2*Math.PI);
        ctx.fillStyle=userColor;
        ctx.fill();
        //THROW AN EVENT HERE FOR SOMETHING TO PICK UP
    }

}