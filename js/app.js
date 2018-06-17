//TODO: change scaling algorithm to respond to dragging the corner of the square, computing the new circle's radius via the square's area
class Canvas {
    constructor(width, height) {
        this.global = {}; 
        this.width = width;
        this.height = height;
        this.mouse = {
                down: false,
                prevX: 0,
                prevY: 0,
                x: 0,
                y: 0
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
            lineWidth: '0.5'
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

    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) - Math.pow(y2 - y1, 2))
    }

    getMousePos(){
        const canvas = document.getElementById('canvas')
        const rect = canvas.getBoundingClientRect();
        let x, y, dist;
        
        canvas.addEventListener('mousedown', (e) => {

            this.mouse.prevX = x;
            this.mouse.prevY = y;

            this.context.moveTo(x, y)
            this.mouse.down = true;
            this.newShape(x, y)
        });

        canvas.addEventListener('mouseup', () => {
            this.mouse.down = false;
        })

        canvas.addEventListener('mousemove', (e) => {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;

            if(this.mouse.down){
               this.mouse.x = x;
               this.mouse.y = y;
               console.log('draggin')
               let dist = this.getDistance(this.mouse.prevX, this.mouse.prevY, x, y);
               this.global.shape.updateRadius(dist)

                // console.log(this.getDistance(x, y, ))
                // (e.clientX - rect.left) >= x ? 
                // this.global.shape.updateRadius(1.03) : this.global.shape.updateRadius(.9)

                // this.paint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        });
    }

    paint(coords){
        this.context.lineTo(coords.x, coords.y)
        this.context.stroke()
    }

    newShape(x, y){
        this.global.shape = new Shape(this.context, x - 50, y - 50, 50)
    }

}

window.addEventListener('load', () => {
    const canvas = new Canvas(window.innerWidth, window.innerHeight);
    canvas.init(); 
});

