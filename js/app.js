//TODO: change scaling algorithm to respond to dragging the corner of the square, computing the new circle's radius via the square's area
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
            lineWidth: '1'
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
        let x, y, dist;
        
        canvas.addEventListener('mousedown', (e) => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
            this.context.moveTo(x, y)
            this.freehand.mousedown = true;
            this.newShape(x, y)
        });

        canvas.addEventListener('mouseup', () => {
            this.freehand.mousedown = false;
        })

        canvas.addEventListener('mousemove', (e) => {
            if(this.freehand.mousedown){
                // Math.max(min, Math.min(number, max));
                // dist = (Math.pow((e.clientX - rect.left) - x, 2) + Math.pow((e.clientY - rect.left) - y, 2) / this.width)
                // console.log(dist)
                (e.clientX - rect.left) >= x ? 
                this.global.shape.updateRadius(1.03) : this.global.shape.updateRadius(.9)

                // this.paint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        });
    }

    paint(coords){
        this.context.lineTo(coords.x, coords.y)
        this.context.stroke()
    }

    newShape(x, y){
        this.global.shape = new Shape(this.context, x, y, 50)
        this.global.shape.createContainer()
    }

}

window.addEventListener('load', () => {
    const canvas = new Canvas(window.innerWidth, window.innerHeight);
    canvas.init(); 
});

