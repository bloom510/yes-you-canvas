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

            this.newShape(e.clientX - rect.left, e.clientY - rect.top)

        });

        canvas.addEventListener('mouseup', () => {
            this.freehand.mousedown = false;
        })

        canvas.addEventListener('mousemove', (e) => {
            if(this.freehand.mousedown){
                this.global.shape.updateRadius(1.01)
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
    }

}

window.addEventListener('load', () => {
    const canvas = new Canvas(window.innerWidth, window.innerHeight);
    canvas.init(); 
});

