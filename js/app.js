class Canvas {
    constructor(width, height) {
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.context, this.namespace;
        
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        this.context = canvas.getContext('2d');
        this.setup();
    } 

    setup(parameters){
        //code setup to accept an object containing parameters
        this.context.strokeStyle = 'white';
        this.context.fillStyle = 'black';
        this.context.lineCap = 'round'
        this.context.fillRect(0, 0, this.width, this.height);
    }

    //for linework or doodles. can theoretically be made to pick up mouse coordinates, so test that.
    //try and code up a n-gon generator.
    draw(vertices){      
        const context = this.context;
        context.beginPath();
    
        for (let i = 0; i < vertices.length; i++){
            for(let j = 0; j < Object.keys(vertices[i]).length; j += 2){
                if(i === 0){
                    context.moveTo(vertices[i][Object.keys(vertices[i])[j]], vertices[i][Object.keys(vertices[i])[j + 1]] );            
                } else {
                    context.lineTo(vertices[i][Object.keys(vertices[i])[j]], vertices[i][Object.keys(vertices[i])[j + 1]] );                       
                    if(i === vertices.length - 1 ) {
                        context.lineTo(vertices[0][Object.keys(vertices[0])[0]], vertices[0][Object.keys(vertices[0])[1]] )
                    }
                }
            }
          
        }
        context.closePath(); 
        context.stroke(); 
    }

}

window.addEventListener('load', () => {
    const canvas = new Canvas(window.innerWidth, window.innerHeight);
    canvas.init();
});


    /*
    //free-code a triangle
    let a_triangle = [60, canvas.height / 2, 116, (canvas.height/2) - 70, 172, canvas.height / 2]
    canvas.global.triangle = new Shape(canvas.context, a_triangle)
    canvas.draw(canvas.global.triangle.vertices)

    //show the centroid of said triangle (needs testing with other polygons and geometries to see if we need a different choice of algorithm)
    let centroid = canvas.global.triangle.computeCentroid(canvas.global.triangle.vertices)
    canvas.showCentroid(centroid)

    //A simple rectangle.
    let a_rectangle =  [20,20,150,100];
    canvas.global.rectangle = new Shape(canvas.context, a_rectangle)
    canvas.draw(canvas.global.rectangle.vertices)
    */



