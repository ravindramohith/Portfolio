var canvas = document.querySelector('#canvas');
console.log(canvas)
// canvas.height = parseFloat(canvas.parentElement.style.height.slice(0, -2))
// canvas.width = parseFloat(canvas.parentElement.style.width.slice(0, -2))
canvas.width = window.innerWidth *0.8
canvas.height = window.innerHeight
var c = canvas.getContext('2d');
let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 100) * (canvas.width / 100)
}

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})


class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.dirX = -this.dirX
        }
        if (this.y > canvas.height || this.y < 0) {
            this.dirY = -this.dirY
        }
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10
            }
        }
        this.x += this.dirX
        this.y += this.dirY
        this.draw()
    }
}

function init() {
    particlesArray = []
    len = (canvas.width * canvas.height) / 7000
    for (var i = 0; i < len; i++) {
        let size = (Math.random() * 5) + 1
        let x = (Math.random() * ((innerWidth *0.8 - size * 2) - (size * 2)) + (size * 2))
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + (size * 2))
        let dirX = (Math.random() * 1.5) - parseFloat(1.5/2)
        let dirY = (Math.random() * 1.5) - parseFloat(1.5/2)
        let choice = Math.floor(Math.random() * 2);
        let color;
        let opacity = 0.3
        if (choice) {
            color = 'rgba(253, 33, 85,' + opacity + ')'
        }
        else {
            color = 'rgba(8, 253, 216,' + opacity + ')'
        }
        particlesArray.push(new Particle(x, y, dirX, dirY, size, color))
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth *0.8, innerHeight);
    for (let particle of particlesArray) {
        particle.update();
    }
    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        let opacity = 0
        for (let b = 0; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y))
            if (distance < (canvas.width / 6) * (canvas.height / 6)) {
                opacity = (1 - (distance / 20000))*0.3
                let choice = Math.floor(Math.random() * 2);
                if (choice) {
                    c.strokeStyle = 'rgba(253, 33, 85,' + opacity + ')';
                }
                else {
                    c.strokeStyle = 'rgba(8, 253, 216,' + opacity + ')';
                }
                c.lineWidth = 1;
                c.beginPath();
                c.moveTo(particlesArray[a].x, particlesArray[a].y);
                c.lineTo(particlesArray[b].x, particlesArray[b].y);
                c.stroke();
            }
        }
    }
}

window.addEventListener('resize', function () {
    canvas.width = this.innerWidth *0.8
    canvas.height = this.innerHeight
    mouse.radius = (canvas.height / 80) * (canvas.width / 80)
    init();
})

window.addEventListener('mouseout', function () {
    mouse.x = undefined
    mouse.y = undefined
})

init();
// var s = screen.getContext('2d');
// s.beginPath();
// s.moveTo(100, 100);
// s.lineTo(300, 300);
// s.strokeStyle = "red";
// s.stroke()
animate();
// c.fillStyle = 'blue';
// c.fillRect(100, 100, 100, 100)


// for (var i = 0; i < 2400; i++) {
    //     c.beginPath();
    //     c.arc(Math.random() * window.innerWidth *0.8, Math.random() * window.innerHeight, 30, 0, Math.PI * 2, false);
    //     c.strokeStyle = 'blue';
    //     c.stroke();
    // }
    
    // var mouse = {
        //     x: undefined,
        //     y: undefined
        // }
        
// colorArray = ['#08fdd8', '#08fdd8', '#08fdd8', '#08fdd8', '#08fdd8']

// window.addEventListener("mousemove", function (event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

// function Circle(x, y, r, dx, dy, color) {
//     this.x = x;
//     this.y = y;
//     this.dx = dx;
//     this.dy = dy;
//     this.r = r;
//     color = color
//     this.draw = function () {
//         c.beginPath()
//         c.arc(x, y, r, 0, Math.PI * 2, false);
//         c.strokeStyle = color;
//         c.stroke();
//         c.fillStyle = color;
//         c.fill();
//     }
//     this.update = function () {
//         if (x + r > window.innerWidth *0.8 || x - r < 0) {
//             dx = -dx;
//         }
//         if (y + r > window.innerHeight || y - r < 0) {
//             dy = -dy;
//         }
//         x += dx;
//         y += dy;
//         if (mouse.x - x < 50 && mouse.x - x > -50 && mouse.y - y < 50 && mouse.y - y > -50) {
//             if (r < 20) {
//                 r += 1
//             }
//         } else if (r >0) {
//             r -= 1
//         }
//         this.draw()
//     }
// }

// var circleArray = []
// for (var i = 0; i < 200; i++) {
//     var x = Math.random() * innerWidth *0.8
//     var y = Math.random() * innerHeight
//     var r = Math.random() * 0
//     var dx = (Math.random() - 0.5) * 4
//     var dy = (Math.random() - 0.5) * 4
//     var color = colorArray[Math.floor(Math.random() * 5)]
//     var circle = new Circle(x, y, r, dx, dy, color);
//     circleArray.push(circle);
// }
// // circle.draw();
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, window.innerWidth *0.8, window.innerHeight)
//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].draw();
//         circleArray[i].update(dx, dy);
//     }
// }

// animate();
// // for (var i = 0; i < 2; i++) {
// //     animate();
// // }
