class Shape {
    constructor(context, vertices){
        //theoretically could accept an array of coordinates as an argument
        if(!this.context) this.context = context;
        this.vertices = [];
        for (let i = 0; i < vertices.length; i += 2){
            this.vertices.push({x: vertices[i], y: vertices[i + 1]})
        }

    }

    //draws a rectangle given a set of coordinates
    rect(canvas, vertices){
        const context = canvas.context;
        context.fillRect(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y);
    }
        
    //Compputes the center of an n-gon. Should be tested on a variety of polygons to determine algorithm choice
    computeCentroid(){
        let sumX = 0, sumY = 0, i = 0;
        for(i; i < this.vertices.length; i++){
            sumX += this.vertices[i].x;
            sumY += this.vertices[i].y;
        }
        const C = { x: sumX / this.vertices.length, y: sumY / this.vertices.length };
        return C;    
    }

     //draw a dot given the center of a polygon from computeCentroid()
     showCentroid(canvas, C){
        const context = canvas.context;
        canvas.context.beginPath();
        canvas.context.arc(C.x,C.y,3,0,2*Math.PI);
        canvas.context.fill();
        canvas.context.closePath();
    }
      
    //Enlarges or reduces to scale for any Polygon given its centroid
    dilate(canvas, scale){
        const C = this.computeCentroid()
        for(let i = 0; i < this.vertices.length; i++){
            this.vertices[i].x = scale * (this.vertices[i].x - C.x) + C.x;
            this.vertices[i].y = scale * (this.vertices[i].y - C.y) + C.y;
        }
        canvas.draw(this.vertices);
    }
 
}
