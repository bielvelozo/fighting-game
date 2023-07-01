const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }

}



const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc:'./assets/finalbcg1.png',
    width: canvas.width,
    height: canvas.height

})

const shop = new Sprite({
    position: {
        x: 700,
        y: 178
    },
    imageSrc:'./assets/shop_anim.png',
    scale: 2.5 ,
    maxFrames: 6


})

const player = new Fighter({
    position: {
        x: 150,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },

    offsetAtk: -50,

    imageSrc: './assets/samurai1/Idle.png',
    maxFrames: 8,
    scale: 2.5 ,
    offset: {
        x: 215,
        y: 157
    },

    sprites: {
        idle:{
            imageSrc:'./assets/samurai1/Idle.png',
            maxFrames: 8
        },

        run:{
            imageSrc:'./assets/samurai1/Run.png',
            maxFrames: 8,
            
        },

        jump: {
            imageSrc:'./assets/samurai1/Jump.png',
            maxFrames: 2,
            
        },

        fall:{
            imageSrc:'./assets/samurai1/Fall.png',
            maxFrames: 2,
        },

        attack1: {
            imageSrc:'./assets/samurai1/Attack1.png',
            maxFrames: 6,
        },

        takeHit: {
            imageSrc:'./assets/samurai1/Take hit.png',
            maxFrames: 4 ,
        },

        death: {
            imageSrc:'./assets/samurai1/Death.png',
            maxFrames: 6 ,
        }
    }

})

player.draw()

const enemy = new Fighter({
    position: {
        x: 800,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },

    offsetAtk: 180,
        

    imageSrc: './assets/samurai2/Idle.png',
    maxFrames: 4,
    scale: 2.5 ,
    offset: {
        x: 215,
        y: 169
    },

    sprites: {
        idle:{
            imageSrc:'./assets/samurai2/Idle.png',
            maxFrames: 4
        },

        run:{
            imageSrc:'./assets/samurai2/Run.png',
            maxFrames: 4,
            
        },

        jump: {
            imageSrc:'./assets/samurai2/Jump.png',
            maxFrames: 2,
            
        },

        fall:{
            imageSrc:'./assets/samurai2/Fall.png',
            maxFrames: 2,
        },

        attack1: {
            imageSrc:'./assets/samurai2/Attack1.png',
            maxFrames: 4,
        },

        takeHit: {
            imageSrc:'./assets/samurai2/Take hit.png',
            maxFrames: 3,
        },

        death: {
            imageSrc:'./assets/samurai2/Death.png',
            maxFrames: 7 ,
        }
    }

})
enemy.draw()



function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update() 
    shop.update()

    c.fillStyle = "rgba(255, 255, 255 , 0.13)"
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    enemy.update()
    player.velocity.x = 0
    enemy.velocity.x = 0
    
    

    let time  = 100
    // player movement    
    if (keys.d.pressed && player.lastKey === 'd' && player.position.x != 965) {
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else if (keys.a.pressed && player.lastKey === 'a' && player.position.x != 0) {
        player.velocity.x = -5
        player.switchSprite('run')
    }
    
    else if (keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y = -13
        setTimeout(() => {
            keys.w.pressed = false
        }, time)
        
    } else {
        player.switchSprite('idle')
    }
    
    if(player.velocity.y < 0 ) {
        player.switchSprite('jump')
    } else if ( player.velocity.y > 0 ) {
        player.switchSprite('fall')
    }



    // enemy movement
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x != 965) {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }
    else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x != 0) {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }
    else if (keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp') {
        enemy.velocity.y = -13
        setTimeout(() => {
            keys.ArrowUp.pressed = false
        }, time)

        
    } else {
        enemy.switchSprite('idle')
    }

    if(enemy.velocity.y < 0 ) {
        enemy.switchSprite('jump')
    } else if ( enemy.velocity.y > 0 ) {
        enemy.switchSprite('fall')
    }


    //detect for atk collision
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) && player.isAttackin 
       && player.currentFrame === 4
       
       ) {
        enemy.takeHit()
        player.isAttackin = false

        gsap.to('#enemy-health', {
            width: enemy.health + '%'
        })
        
    }

    // if player misses
    if (player.isAttackin && player.currentFrame === 4){
        player.isAttackin = false
    }


    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    })  && enemy.isAttackin
        && enemy.currentFrame === 2

    ) {
        enemy.isAttackin = false
        player.takeHit()
        gsap.to('#player-health', {
            width: player.health + '%'
        })
    }

    // if enemy misses
    if (enemy.isAttackin && enemy.currentFrame === 2){
        enemy.isAttackin = false
    }

    //end game based on healt 
    
    if(enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player , enemy , timerID})
    }

    // detect for collision
    if(player.position.x === 965 && keys.d.pressed) {
        player.position.x = 965
        keys.d.pressed = false
    }
        


}



decreaseTimer()
animate()

window.addEventListener('keydown', (event) => {
    //player keys
    if(!player.dead)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break

        case 'w':
            if(player.velocity.y === 0){
                keys.w.pressed = true
                player.lastKey = 'w'
            }
            break

        case ' ':
            player.attack()
          
            break
        }

        // enemy keys
        if(!enemy.dead)
        switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break

        case 'ArrowUp':
            if(enemy.velocity.y === 0){
                keys.ArrowUp.pressed = true
                enemy.lastKey = 'ArrowUp'
            }
            break

        case 'ArrowDown':
            enemy.attack()
            break
        
        }

})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        //player keys
        case 'd':
            keys.d.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 'w':
            keys.w.pressed = false
            break     


    }

    switch (event.key) {
        //enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break    
    }
})
