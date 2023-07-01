class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        maxFrames = 1,
        offset = { x: 0, y: 0 }

    }) {
        this.position = position
        this.width = 100
        this.height = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.maxFrames = maxFrames
        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }


    draw() {
        
        c.drawImage(
            this.image,
            this.currentFrame * (this.image.width / this.maxFrames),
            0,
            this.image.width / this.maxFrames,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.maxFrames) * this.scale,
            this.image.height * this.scale
            )

    }

    animateFrame() {
        if(!this.dead)
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.currentFrame < this.maxFrames - 1) {
                this.currentFrame++
            } else {
                this.currentFrame = 0
            }
        }
    }

    update() {
        
        this.draw()
        this.animateFrame()
    }

}

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        offsetAtk,
        color = 'red',
        imageSrc,
        scale = 1,
        maxFrames = 1,
        offset = { x: 0, y: 0 },
        sprites


    }) {

        super({
            position,
            imageSrc,
            scale,
            maxFrames,
            offset

        })


        this.velocity = velocity

        this.width = 50
        this.height = 150

        this.color = color

        this.lastKey
        this.isAttackin
        this.health = 100

        this.currentFrame = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false

        for( let sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }


        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },

            offset: {
                x: offsetAtk,
                y:-45
            },
            width: 200,
            height: 50,
        }


    }

    draw() {
        super.draw()
        this.animateFrame()
        
        //attack box
    }

    update() {
        this.draw()
        this.animateFrame()


        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y

       

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        //gravity function
        if (this.height + this.position.y + this.velocity.y >= canvas.height - 78) {
            this.velocity.y = 0
            this.position.y = 348.40
        
        } else this.velocity.y += gravity
      
    }


    attack() {
        this.switchSprite('attack1')
        this.isAttackin = true
    }

    takeHit() {
        this.health -= 10 
        if( this.health <= 0 ) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }

    switchSprite(sprite) {
    if(this.image === this.sprites.death.image ) {
        if(this.currentFrame === this.sprites.death.maxFrames - 1) this.dead = true
        return
    }
    
    if(this.image === this.sprites.attack1.image  && 
    this.currentFrame < this.sprites.attack1.maxFrames -1) return

    if(this.image === this.sprites.takeHit.image  
    && this.currentFrame < this.sprites.takeHit.maxFrames -1) return

        switch (sprite) {
    
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.maxFrames = this.sprites.idle.maxFrames
                    this.currentFrame = 0
                }
            break
            case 'run':
                if(this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.maxFrames = this.sprites.run.maxFrames
                    this.currentFrame = 0
                    
                }
            break
            case 'jump':
                if(this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.maxFrames = this.sprites.jump.maxFrames
                    this.currentFrame = 0
                }
            break
            case 'fall':
                if(this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.maxFrames = this.sprites.fall.maxFrames
                    this.currentFrame = 0
                }
            break
            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.maxFrames = this.sprites.attack1.maxFrames
                    this.currentFrame = 0
                }
                break

            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.maxFrames = this.sprites.takeHit.maxFrames
                    this.currentFrame = 0
                }    
            break
            case 'death':
                if(this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.maxFrames = this.sprites.death.maxFrames
                    this.currentFrame = 0
                }    
            break
        }
    }
}