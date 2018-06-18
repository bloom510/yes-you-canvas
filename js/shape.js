
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
           
        
        this.createPolarSpace(this.radius)
        
    }
    //draws a square around our circle
    createContainer(radius){
        const C = this.computeCentroid()
   
        const diameter = this.diameter;
        const x = C.x - this.radius;
        const y = C.y - this.radius;

        this.context.strokeRect(x,y,this.diameter, this.diameter);
        
        // this.context.moveTo(x, y)
        // this.context.lineTo(x + diameter, y)

        // this.context.moveTo(x, y + diameter)
        // this.context.lineTo(x, y)

        // this.context.moveTo(x + diameter, y + diameter)
        // this.context.lineTo(x, y + diameter)
        
        // this.context.moveTo(x + diameter, y + diameter)
        // this.context.lineTo(x + diameter, y)
         
         this.context.stroke()

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

    updateRadius(scale){ 
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
            this.radius = scale;
            this.diameter = this.radius * 2;
            this.createPolarSpace(scale)
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