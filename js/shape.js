
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
    }
    //draws a square around our circle
    createContainer(radius){
   
        const diameter = radius * 2;
        this.container.width = diameter * 2;
        this.container.height = diameter * 2;
        this.container.startX = window.mouse.x - diameter;
        this.container.startY = window.mouse.y - diameter;

        this.context.beginPath();
        this.context.strokeRect(this.container.startX, this.container.startY, diameter, diameter);
        this.context.stroke();
        this.context.closePath();


    }


    //Creates nodes along the perimeter of a circle so we can subdivide and thus circumscribe polygons
    createPolarSpace(radius){

        this.vertices = [];
        
        this.x = window.mouse.x - this.radius;
        this.y = window.mouse.y; 

        for (let i = 0; i < 1000; i++) {
            let interval = (Math.PI * 2) / 1000;
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

          this.createContainer(this.radius) //input mouse coords instead of radius
    }

    updateRadius(radius){ 

        const clearPrevious = (coords) => {
            this.context.beginPath();
            this.context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.context.fill()   
            this.context.closePath();
        }

        const update = (coords) => {       
            this.context.strokeStyle = 'white'
            this.radius = radius;
            this.createPolarSpace(radius)

        }

        clearPrevious()
        update()
       
    }

    plotDot(x, y) {
        this.context.beginPath();
        this.context.arc(x, y - this.radius, 0.5, 0, Math.PI * 2); //mouse
        this.context.stroke();
        this.context.closePath();
      }

    //A simple centroid finder algorithm. Should be tested on a variety of polygons to determine algorithm choice
    computeCentroid(vertices){
        let sumX = 0, sumY = 0, i = 0;
        for(i; i < vertices.length; i++){
            sumX += vertices[i].x;
            sumY += vertices[i].y;
        }
        const C = { x: sumX / vertices.length, y: sumY / vertices.length };
        return C;    
    }

    ngon(){
        console.log('n-gon generator goes here')
    }
 

}