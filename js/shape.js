
class Shape {
    constructor(context, x, y, radius, name){
        this.context = context;
        this.canvas = canvas;
        this.name = name;
        this.radius = 50,
        this.diameter = 100,
        this.x = x,
        this.y = y,
        this.vertices = []

        this.node = function(x, y, radius){
                this.radius = radius;
                this.diameter = 2*this.radius;
                this.x = x;
                this.y = y;
            };
           
        this.container = {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            startX: 0,
            startY: 0
        }
        
        this.createPolarSpace(this.radius)
        
    }
    //draws a square around our circle
    createContainer(radius){
        
        /*TODO:
          1. Create a container object storing its own width, height, and xy coords
          2. Scale it according to the mouse position:

            // rect.w += rect.startX-mouseX;
            // rect.h += rect.startY-mouseY;
            // rect.startX = mouseX;
            // rect.startY = mouseY;

        */

        const C = this.computeCentroid()       
        const diameter = (radius * 2)
        const x = C.x - this.radius;
        const y = C.y - this.radius;

        this.context.beginPath();
        this.context.strokeRect(x, y, diameter, diameter);
        this.context.stroke()
        this.context.closePath();

    }
    //Creates nodes along the perimeter of a circle so we can subdivide and thus circumscribe polygons
    createPolarSpace(radius){
        for (let i = 0; i < 12; i++) {
            let interval = (Math.PI * 2) / 12;
            let radianAngle = interval * (i + 9);
      
            let x = Math.round(this.x + this.radius * Math.cos(radianAngle));
            let y = Math.round(this.y + this.radius * Math.sin(radianAngle));
      
            let node = new this.node(x, y, radius)
            this.radius = radius;
            this.vertices.push(node);
          }

          for(let j = 0; j < this.vertices.length; j++){
            this.plotDot(this.vertices[j].x, this.vertices[j].y);
          }

          this.createContainer(this.radius)
    }

    updateRadius(radius){ 
        //had a rough minimally function version using the centroid previously
        // const C = this.computeCentroid()

        const clearPrevious = (coords) => {
            this.context.beginPath();
            this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.context.fill()   
            this.context.closePath();
        }

        const update = (coords) => {       
            this.context.strokeStyle = 'white'
            // this.radius = distance;
            this.createPolarSpace(radius)
            // this.polarSpace.vertices[coords].x = (scale * (this.polarSpace.vertices[coords].x - C.x) + C.x);
            // this.polarSpace.vertices[coords].y = (scale * (this.polarSpace.vertices[coords].y - C.y) + C.y);
        }

        
        for(let i = 0; i < this.vertices.length; i++){
            clearPrevious(i)
        }
        
        update()
       
    }

    plotDot(x, y) {
        this.context.beginPath();
        this.context.arc(x, y, 0.5, 0, Math.PI * 2);
        this.context.stroke();
        this.context.closePath();
      }

    //A simple centroid finder algorithm. Should be tested on a variety of polygons to determine algorithm choice
    computeCentroid(){
        let sumX = 0, sumY = 0, i = 0;
        for(i; i < this.vertices.length; i++){
            sumX += this.vertices[i].x;
            sumY += this.vertices[i].y;
        }
        const C = { x: sumX / this.vertices.length, y: sumY / this.vertices.length };
        return C;    
    }

    ngon(){
        console.log('n-gon generator goes here')
    }
 

}