/*
Reformat Shape class to function as a robust n-gon generator
that works by circumscribing a circle with a radius determined
by mouse distance.
*/
class Shape {
    constructor(context, x, y, radius, name){
        if(!this.context) this.context = context;
        if(!this.canvas) this.canvas = canvas;
        this.name = name;
        

        this.polarSpace = {
            node: function(x, y, radius){
                this.radius = radius;
                this.diameter = 2*this.radius;
                this.x = x;
                this.y = y;
            },
            radius: radius,
            x: x,
            y: y,
            vertices: []
        }
        this.createPolarSpace()
        
    }
    createContainer(){
        const C = this.computeCentroid()
        const diameter = (this.polarSpace.radius * 2)
        const x = C.x - this.polarSpace.radius;
        const y = C.y - this.polarSpace.radius;
        
        this.context.moveTo(x, y)
        this.context.lineTo(x + diameter, y)

        this.context.moveTo(x, y + diameter)
        this.context.lineTo(x, y)

        this.context.moveTo(x + diameter, y + diameter)
        this.context.lineTo(x, y + diameter)
        
        this.context.moveTo(x + diameter, y + diameter)
        this.context.lineTo(x + diameter, y)
         
         this.context.stroke()

    }
    //Creates nodes along the perimeter of a circle so we can subdivide and thus circumscribe polygons
    createPolarSpace(){
        for (let i = 0; i < 12; i++) {
            let interval = (Math.PI * 2) / 12;
            let radianAngle = interval * (i + 10);
      
            let x = Math.round(this.polarSpace.x + this.polarSpace.radius * Math.cos(radianAngle));
            let y = Math.round(this.polarSpace.y + this.polarSpace.radius * Math.sin(radianAngle));
      
            let node = new this.polarSpace.node(x, y, 50)
            this.polarSpace.radius = 50;
            this.polarSpace.vertices.push(node);
          }

          for(let j = 0; j < this.polarSpace.vertices.length; j++){
            this.plotDot(this.polarSpace.vertices[j].x, this.polarSpace.vertices[j].y);
            
          }

    }
    
    //Updates the radius of our polar space
    updateRadius(scale){ 
        console.log('rad upd')
        const C = this.computeCentroid()

        const clearPrevious = (coords) => {
            this.context.strokeStyle = 'black'
            this.context.beginPath();
            this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.context.fill()   
            this.context.closePath();
        }

        const update = (coords) => {          
            this.context.strokeStyle = 'white'
            this.polarSpace.vertices[coords].x = scale * (this.polarSpace.vertices[coords].x - C.x) + C.x;
            this.polarSpace.vertices[coords].y = scale * (this.polarSpace.vertices[coords].y - C.y) + C.y;
            this.polarSpace.radius = this.polarSpace.radius * scale;
            this.polarSpace.diameter = this.polarSpace.diameter * scale;
        }
        
        //update dimensions in memory
        for(let i = 0; i < this.polarSpace.vertices.length; i++){
            clearPrevious(i)
            update(i)
        }

        //re-plot dots
        for(let j = 0; j < this.polarSpace.vertices.length; j++){
            this.plotDot(this.polarSpace.vertices[j].x, this.polarSpace.vertices[j].y);
                                    
        }
        
       
    }

    plotDot(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, 0.5, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
        
      }

    //Computes the center of an n-gon. Should be tested on a variety of polygons to determine algorithm choice
    computeCentroid(){
        let sumX = 0, sumY = 0, i = 0;
        for(i; i < this.polarSpace.vertices.length; i++){
            sumX += this.polarSpace.vertices[i].x;
            sumY += this.polarSpace.vertices[i].y;
        }
        const C = { x: sumX / this.polarSpace.vertices.length, y: sumY / this.polarSpace.vertices.length };
        return C;    
    }

     //draw a dot given the center of a polygon from computeCentroid()
     showCentroid(C){
        const context = this.context;
        context.beginPath();
        context.arc(C.x,C.y,3,0,2*Math.PI);
        context.fill();
        context.closePath();
    }

    ngon(){
        console.log('n-gon generator goes here')
    }
 

}


//Interesting old stuff below:
// ngon(sides, radius){      
//     const context = this.context;
//     context.beginPath();
    
//     //compute the radius of a circle given drag distance
//     //circumscribe n-gon inside the circle

//     // for (let i = 0; i < vertices.length; i++){
//     //     for(let j = 0; j < Object.keys(vertices[i]).length; j += 2){
//     //         if(i === 0){
//     //             context.moveTo(vertices[i][Object.keys(vertices[i])[j]], vertices[i][Object.keys(vertices[i])[j + 1]] );            
//     //         } else {
//     //             context.lineTo(vertices[i][Object.keys(vertices[i])[j]], vertices[i][Object.keys(vertices[i])[j + 1]] );                       
//     //             if(i === vertices.length - 1 ) {
//     //                 context.lineTo(vertices[0][Object.keys(vertices[0])[0]], vertices[0][Object.keys(vertices[0])[1]] )
//     //             }
//     //         }
//     //     }
//     // }
// }