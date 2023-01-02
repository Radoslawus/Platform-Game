const platform1 = new Image
platform1.src = './img/platform1.png'
const background = new Image
background.src = './img/background.png'
const ground1 = new Image
ground1.src = './img/ground1.png'
const tree1 = new Image
tree1.src = './img/tree1.png'
const tree2 = new Image
tree2.src = './img/tree2.png'
const cloud1 = new Image
cloud1.src = './img/cloudBig.png'
const cloud2 = new Image
cloud2.src = './img/cloudMedium.png'
const cloud3 = new Image
cloud3.src = './img/cloudSmall.png'
const playerRight = new Image
playerRight.src = './img/playerRight.png'
const playerLeft = new Image
playerLeft.src = './img/playerLeft.png'
const playerStandRight = new Image
playerStandRight.src = './img/playerStandRight.png'
const playerStandLeft = new Image
playerStandLeft.src = './img/playerStandLeft.png'
const winFlag = new Image
winFlag.src = './img/winFlag.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = .8
const rightBlock = 0.6 * canvas.width
const leftBlock = 0.4 * canvas.width
let numberOfGrounds = 12
let scrollOfset = 0
let groundPosition = -1000
let wind = .4
let level = 0

class Player {
    constructor() {
        this.jump = 15
        this.speed = 3.2
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 50
        this.height = 70
        this.frames = 0
        this.sprites = {
            stand: {
                right: playerStandRight,
                left: playerStandLeft
            },
            run: {
                right: playerRight,
                left: playerLeft
            }
        }
        this.image = this.sprites.stand.right
    }
    draw() {
        c.drawImage(this.image, 70 * this.frames, 0, 70, 85, this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.frames++
            if (this.frames > 8 && (this.image == this.sprites.run.right || this.image == this.sprites.run.left)) {
                this.frames = 0
            } else
        if ((this.image == this.sprites.stand.right || this.image == this.sprites.stand.left) && this.frames > 0) {
            this.frames = 0
        }
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        }
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y: y - image.height
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Decoration {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y: y - image.height
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Cloud {
    constructor({ x, y, image, speed }) {
        this.position = {
            x,
            y: y - image.height
        }
        this.image = image
        this.width = image.width
        this.height = image.height
        this.speed = speed
    }
    draw() {
        this.position.x = this.position.x + this.speed
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

let player = new Player()
let grounds = []
let decorations = []
let decoSpread = 200
let platforms = []
let clouds = []

function init(level) {
    player = new Player()
    grounds = []
    decorations = []
    clouds = []
    decoSpread = 200
    groundPosition = -1000
    platforms = []
    switch (level) {
        case 1:
            platforms = [
                new Platform({ x: 0, y: 1.05 * canvas.height, image: platform1 }),
                new Platform({ x: 195, y: 1.01 * canvas.height, image: platform1 }),
                new Platform({ x: 350, y: .87 * canvas.height, image: platform1 }),
                new Platform({ x: 450, y: .58 * canvas.height, image: platform1 }),
                new Platform({ x: 450, y: .72 * canvas.height, image: platform1 }),
                new Platform({ x: 620, y: .95 * canvas.height, image: platform1 }),
                new Platform({ x: 760, y: .55 * canvas.height, image: platform1 }),
                new Platform({ x: 930, y: .99 * canvas.height, image: platform1 }),
                new Platform({ x: 1020, y: .7 * canvas.height, image: platform1 }),
                new Platform({ x: 1150, y: .85 * canvas.height, image: platform1 }),
                new Platform({ x: 1350, y: .75 * canvas.height, image: platform1 }),
                new Platform({ x: 1580, y: .95 * canvas.height, image: platform1 }),
                new Platform({ x: 1850, y: 1.05 * canvas.height, image: platform1 }),
                new Platform({ x: 2140, y: 1.05 * canvas.height, image: platform1 }),
                new Platform({ x: 2440, y: 1.05 * canvas.height, image: platform1 }),
                new Platform({ x: 2600, y: .9 * canvas.height, image: platform1 }),
                new Platform({ x: 2410, y: .77 * canvas.height, image: platform1 }),
                new Platform({ x: 2170, y: .65 * canvas.height, image: platform1 }),
                new Platform({ x: 2190, y: .50 * canvas.height, image: platform1 }),
                new Platform({ x: 2480, y: .49 * canvas.height, image: platform1 }),
                new Platform({ x: 2450, y: .34 * canvas.height, image: platform1 }),
                new Platform({ x: 2780, y: .33 * canvas.height, image: platform1 }),
                new Platform({ x: 3100, y: .54 * canvas.height, image: platform1 }),
                new Platform({ x: 3400, y: .5 * canvas.height, image: platform1 }),
                new Platform({ x: 3730, y: .67 * canvas.height, image: platform1 }),
                new Platform({ x: 4000, y: .8 * canvas.height, image: platform1 }),
                new Platform({ x: 4220, y: .75 * canvas.height, image: platform1 }),
                new Platform({ x: 4250, y: .67 * canvas.height, image: winFlag }),
            ]
            break
        case 0:
            platforms = [
                new Platform({ x: 0, y: 1.01 * canvas.height, image: platform1 }),
                new Platform({ x: 300, y: .8 * canvas.height, image: platform1 }),
                new Platform({ x: 200, y: .95 * canvas.height, image: platform1 }),
                new Platform({ x: 580, y: .8 * canvas.height, image: platform1 }),
                new Platform({ x: 750, y: .7 * canvas.height, image: platform1 }),
                new Platform({ x: 450, y: .6 * canvas.height, image: platform1 }),
                new Platform({ x: 250, y: .46 * canvas.height, image: platform1 }),
                new Platform({ x: 950, y: .55 * canvas.height, image: platform1 }),
                new Platform({ x: 1250, y: .55 * canvas.height, image: platform1 }),
                new Platform({ x: 1570, y: .6 * canvas.height, image: platform1 }),
                new Platform({ x: 1800, y: .48 * canvas.height, image: platform1 }),
                new Platform({ x: 2100, y: .65 * canvas.height, image: platform1 }),
                new Platform({ x: 2400, y: .65 * canvas.height, image: platform1 }),
                new Platform({ x: 2730, y: .74 * canvas.height, image: platform1 }),
                new Platform({ x: 2750, y: .59 * canvas.height, image: platform1 }),
                new Platform({ x: 2710, y: .44 * canvas.height, image: platform1 }),
                new Platform({ x: 3000, y: .41 * canvas.height, image: platform1 }),
                new Platform({ x: 3310, y: .41 * canvas.height, image: platform1 }),
                new Platform({ x: 1850, y: .78 * canvas.height, image: platform1 }),
                new Platform({ x: 1800, y: .91 * canvas.height, image: platform1 }),
                new Platform({ x: 3555, y: .55 * canvas.height, image: platform1 }),
                new Platform({ x: 3770, y: .41 * canvas.height, image: platform1 }),
                new Platform({ x: 4130, y: .71 * canvas.height, image: platform1 }),
                new Platform({ x: 4250, y: .63 * canvas.height, image: winFlag }),
            ]
            break
        default:
            for (let i = 0; i <= numberOfGrounds; i++) {
                grounds.push(new Platform({ x: groundPosition, y: canvas.height, image: ground1 }))
                groundPosition = groundPosition + 400
            }
    }
    for (let i = 0; i <= numberOfGrounds; i++) {
        let randomNum = Math.random() * (600 - 100) + 100
        decorations.push(new Decoration({ x: decoSpread, y: canvas.height, image: tree1 }))
        decorations.push(new Decoration({ x: decoSpread + randomNum, y: .98 * canvas.height, image: tree2 }))
        decoSpread = (Math.random() * 8) * 100 + decoSpread
    }
    for (let i = 0; i <= 7; i++) {
        let randomNum = Math.random()
        let randomNum2 = Math.random() * 3 + 1
        if (Math.floor(randomNum2) == 1) {
            clouds.push(new Cloud({ x: canvas.width * randomNum, y: (canvas.height / 2) / randomNum2, image: cloud1, speed: wind }))
            clouds.push(new Cloud({ x: canvas.width * randomNum - canvas.width, y: (canvas.height / 2) / randomNum2, image: cloud1, speed: wind }))
        } else if (Math.floor(randomNum2) == 2) {
            clouds.push(new Cloud({ x: canvas.width * randomNum, y: (canvas.height / 2) / randomNum2, image: cloud2, speed: wind }))
            clouds.push(new Cloud({ x: canvas.width * randomNum - canvas.width, y: (canvas.height / 2) / randomNum2, image: cloud2, speed: wind }))
        } else {
            clouds.push(new Cloud({ x: canvas.width * randomNum, y: (canvas.height / 2) / randomNum2, image: cloud3, speed: wind }))
            clouds.push(new Cloud({ x: canvas.width * randomNum - canvas.width, y: (canvas.height / 2) / randomNum2, image: cloud3, speed: wind }))
        }
    }
}

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.drawImage(background, 0, 0, canvas.width, canvas.height)

    clouds.forEach(cloud => {
        cloud.draw()
    })
    decorations.forEach(decoration => {
        decoration.draw()
    })
    platforms.forEach(platform => {
        platform.draw()
    })
    grounds.forEach(ground => {
        ground.draw()
    })
    player.update()

    if ((keys.left.pressed && player.position.x > leftBlock) || (keys.left.pressed && scrollOfset <= 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    } else if (keys.right.pressed && player.position.x < rightBlock) {
        player.velocity.x = player.speed
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOfset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
            grounds.forEach(ground => {
                ground.position.x -= player.speed
            })
            decorations.forEach(decoration => {
                decoration.position.x -= player.speed / 8
            })
        } else if (keys.left.pressed && scrollOfset > 0) {
            scrollOfset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
            grounds.forEach(ground => {
                ground.position.x += player.speed
            })
            decorations.forEach(decoration => {
                decoration.position.x += player.speed / 8
            })
        }
    }
    // platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y + 10 && player.position.y + player.height + player.velocity.y >= platform.position.y + 10 && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
    grounds.forEach(ground => {
        if (player.position.y + player.height <= ground.position.y + 10 && player.position.y + player.height + player.velocity.y >= ground.position.y + 10 && player.position.x + player.width >= ground.position.x && player.position.x <= ground.position.x + ground.width) {
            player.velocity.y = 0
        }
    })

    // player animation
    if (keys.right.pressed && player.image != player.sprites.run.right) {
        player.image = player.sprites.run.right
        player.frames = 1
    } else if (keys.left.pressed && player.image != player.sprites.run.left) {
        player.image = player.sprites.run.left
        player.frames = 1
    }

    // win point
    if (scrollOfset > 3075) {
        console.log('win')
        scrollOfset = 0
        level++
        init(level)
    }

    // loose point
    if (player.position.y > canvas.height) {
        console.log('you loose')
        scrollOfset = 0
        level = 0
        init(level)
    }
}

init(level)
animate()

addEventListener('keydown', e => {
    if (e.key == 'ArrowRight') {
        keys.right.pressed = true
        player.image = player.sprites.run.right
    }
    if (e.key == 'ArrowLeft') {
        keys.left.pressed = true
        player.image = player.sprites.run.left
    }
})

addEventListener('keyup', e => {
    if (e.key == 'ArrowUp' && player.velocity.y == 0) player.velocity.y -= player.jump
    if (e.key == 'ArrowRight') {
        keys.right.pressed = false
        player.image = player.sprites.stand.right
    }
    if (e.key == 'ArrowLeft') {
        keys.left.pressed = false
        player.image = player.sprites.stand.left
    }
})


// for flag tests:
addEventListener('click', () => {
    console.log(scrollOfset)
})

// todo:
// - more levels?
// - win/loose modals
// - score