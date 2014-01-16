                var circle = function (){ //Tell the world
                //console.log("onmousedown")

                //when clicked 
                    console.log(event.type);
                    while (onmousedown){console.log('take a dump')}

                    //count dots 'n shit
                    num++;
                    console.log("you've made "+num+" dots");
                    

                    //onmousemove is firing every time, 
                    //but with the coords for where you clicked,
                    //not current pos 
                    //I need vars to update on onmousemove, 
                    

                    //pulling vars above canvas.onmousemove
                    //didn't solve the problem
                    
                    //get mouse coords for draw placement

                    //these update when event is passes from mouse event in hmtl 
                    //and don't get passed into it again
                    var x = event.clientX;
                    var y = event.clientY;
                    
                    //draw the circle 
                    ctx.beginPath();
                           //x-pos, y-pos, diam, chunk missing?, circumference
                    ctx.arc(x,y,20,0,2*Math.PI);
                    ctx.fillStyle=userColor;
                    ctx.fill();
                    //on mouse move still fires after you stop holding mouse down
                //clicking starts it though


                //canvas.onmousemove = null;
                //did not stop onmousemove from firing
                }







var msdwn = function(event){
                console.log(event.type);
                
                var x = event.clientX;
                var y = event.clientY;
                mousedwn=true;
                
               }
            var msup = function (event) {
                // body...
                var mousedwn=false;
            }

            do {

                //draw the circle 
                ctx.beginPath();
                       //x-pos, y-pos, diam, start angle, end angle
                ctx.arc(x,y,20,0,2*Math.PI);
                ctx.fillStyle=userColor;
                ctx.fill();
            }
            while (mousedwn=true);









                console.log(event);
                if (event.type="mousedown"){
                    mousedwn=true;
                }
                else if (event.type='mouseup'){
                    mousedwn=false;
                }
            

                while (mousedwn=true){
                    var x = event.clientX;
                    var y = event.clientY;
                    
                    //draw the circle 
                    ctx.beginPath();
                           //x-pos, y-pos, diam, chunk missing?, circumference
                    ctx.arc(x,y,20,0,2*Math.PI);
                    ctx.fillStyle=userColor;
                    ctx.fill();
                }