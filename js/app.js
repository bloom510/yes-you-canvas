class Canvas {
    constructor(width, height) {
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.freehand = {
            draw_history: [],
            mousedown: false
        }
        this.context, this.namespace;
        
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.width = this.width;
        canvas.height = this.height;
        document.body.appendChild(canvas);
        this.context = canvas.getContext('2d');
        this.setup({
            strokeStyle: 'white',
            fillStyle: 'black',
            lineCap: 'round',
            lineWidth: '6'
        });
        this.getMousePos();
    } 

    setup(params){
        this.context.strokeStyle = params.strokeStyle;
        this.context.fillStyle = params.fillStyle;
        this.context.lineCap = params.lineCap;
        this.context.lineWidth = params.lineWidth;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    getMousePos(){
        const canvas = document.getElementById('canvas')
        const rect = canvas.getBoundingClientRect();

        canvas.addEventListener('mousedown', (e) => {
            this.context.moveTo(e.clientX - rect.left, e.clientY - rect.top)
            this.freehand.mousedown = true;
            // below creates a happy accident. you could generate some dope art by refining the n-gon generator and enabling mouse interactivity
            // this.polygon(this.draw_history)
        });

        canvas.addEventListener('mouseup', () => {
            this.freehand.mousedown = false;
        })

        canvas.addEventListener('mousemove', (e) => {
            if(this.freehand.mousedown){
                this.paint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        });
    }

    paint(coords){
        this.context.lineTo(coords.x, coords.y)
        this.context.stroke()
    }

    //generates shape for a given array of vertices. 
    //try and code up a n-gon generator.
    polygon(vertices){      
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



