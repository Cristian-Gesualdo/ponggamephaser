import Phaser from 'phaser'

export default class Game extends Phaser.Scene {
  puntosA: number

  puntosB: number

  textoPuntosA: any

  textoPuntosB: any

  ball: any

  bluePaddle: any

  violetPaddle: any

  wallBottom: any

  wallTop: any

  fail: any

  win: any

  beep: any

  keys: any

  fullScreen: any

  constructor() {
    super({ key: 'Game' })
  }

  preload() {
    this.load.audio('win', '/win.wav')

    this.load.audio('fail', '/fail.mp3')

    this.load.audio('beep', '/beep.mp3')

    this.load.image('wall', '/img/wall.png')

    this.load.image('violetPaddle', '/img/violet_paddle.png')

    this.load.image('bluePaddle', '/img/blue_paddle.png')

    this.load.image('ball', '/img/ball2.png')

    this.load.image('stadium', '/img/Stadium.png')

    this.load.image('fullScreen', '/img/lineLight28.png')
  }
  create() {
    this.add.image(600, 400, 'stadium').setDisplaySize(1200, 800)

    this.puntosA = 0

    this.puntosB = 0

    this.textoPuntosA = this.add.text( 300, 40, `Puntos Jugador A: ${this.puntosA}`, {
      fontSize: '35px',
      fontStyle: 'bold',
      fontFamily: 'Arial Black',
      color: '#fff',
      align: 'center',
    })
    .setOrigin(0.5)

    this.textoPuntosB = this.add.text( this.cameras.main.width - 300, 40, `Puntos Jugador B: ${this.puntosB}`, {
      fontSize: '35px',
      fontStyle: 'bold',
      fontFamily: 'Arial Black',
      color: '#fff',
      align: 'center',
    })
    .setOrigin(0.5)

    this.ball = this.physics.add
      .sprite(601, 400, 'ball')

      .setPushable(true)
      .setBounce(1.005)

      .setScale(1.5, 1.5)

      .setName('SceneSprite')

    this.ball.setCircle(8, 0, 0)

    if (!this.sys.game.device.os.desktop) {
      if (this.scale.isFullscreen) {
        setTimeout(() => {
          this.ball.setVelocity(300, 0)
        }, 1000)
      }
    } else {
      setTimeout(() => {
        this.ball.setVelocity(300, 0)
      }, 500)
    }

    this.bluePaddle = this.physics.add
      .sprite(1070, 400, 'bluePaddle')

      .setPushable(false)

      .setScale(2, 2)

      .setName('SceneSprite')

    this.violetPaddle = this.physics.add
      .sprite(130, 400, 'violetPaddle')

      .setPushable(false)

      .setScale(2, 2)

      .setName('SceneSprite')

    this.wallBottom = this.physics.add
      .sprite(600, 800, 'wall')
      .setCollideWorldBounds(true)
      .setImmovable(true)
      .setPushable(false)

      .setScale(2, 2)

      .setName('SceneSprite')

    this.wallTop = this.physics.add
      .sprite(600, 2, 'wall')
      .setCollideWorldBounds(true)
      .setImmovable(true)
      .setPushable(false)

      .setScale(2, 2)

      .setName('SceneSprite')

    this.fail = this.sound.add('fail', { loop: false, volume: 0.1 })

    this.win = this.sound.add('win', { loop: false, volume: 0.1 })

    this.beep = this.sound.add('beep', { loop: false, volume: 0.3 })

    this.keys = this.input.keyboard.addKeys('S,W,down,up')

    this.physics.add.collider(this.ball, this.bluePaddle, this.cambiarDireccion, null, this)
    this.physics.add.collider(this.ball, this.violetPaddle, this.cambiarDireccion, null, this)
    this.physics.add.collider(this.ball, this.wallBottom, null, null, this)
    this.physics.add.collider(this.ball, this.wallTop, null, null, this)
    this.physics.add.collider(this.bluePaddle, this.wallTop, null, null, this)
    this.physics.add.collider(this.bluePaddle, this.wallBottom, null, null, this)
    this.physics.add.collider(this.violetPaddle, this.wallTop, null, null, this)
    this.physics.add.collider(this.violetPaddle, this.wallBottom, null, null, this)

    // Control táctil multitoch
    this.input.addPointer(3)

    if (!this.sys.game.device.os.desktop) {
      this.fullScreen = this.add.image(603, 40, 'fullScreen')
        .setInteractive()
        .setScale(1.2, 1.2)
        .setName('SceneSprite')

      this.fullScreen.on('pointerup', async () => {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen()
          try {
            if (screen.orientation && screen.orientation.unlock) {
              screen.orientation.unlock()
            }
          } catch (e) {}
        } else {
          this.scale.startFullscreen()
          try {
            // Se le solicita al navegador forzar la vista horizontal
            if (screen.orientation && screen.orientation.lock) {
              await screen.orientation.lock('landscape')
            }
          } catch (e) {
            // Fallará silenciosamente si el dispositivo no lo permite (ej: iOS)
          }
        }
      })
    }

  }
  update() {
    // Ganar o perder
    if (this.puntosB === 5 || this.puntosA === 5) {
      this.scene.pause()

      if (!this.win.isPlaying) {
        this.win.play()
      }

      setTimeout(() => {
        this.scene.start('Start')
      }, 3000)
      if (this.puntosB === 5) {
        this.add.text(this.cameras.main.width / 2, + this.cameras.main.height / 2, `¡Ganó el Jugador B!`, {
          fontSize: '80px',
          fontStyle: 'bold',
          fontFamily: 'Arial Black',
          color: '#FF603D',
          align: 'center',
        })
        .setOrigin(0.5)
      }

      if (this.puntosA === 5) {
        this.add.text(this.cameras.main.width / 2, + this.cameras.main.height / 2, `¡Ganó el Jugador A!`, {
          fontSize: '80px',
          fontStyle: 'bold',
          fontFamily: 'Arial Black',
          color: '#FF603D',
          align: 'center',
        }) 
        .setOrigin(0.5)
      }
    }

    // Anotar puntos
    if (this.ball.x < 0 || this.ball.x > 1200) {
      if (this.ball.x > 300) {
        this.textoPuntosA.setText(`Puntos Jugador A: ${(this.puntosA += 1)}`)

        setTimeout(() => {
          this.ball.setVelocity(300, 0)
        }, 1000)
      }

      if (this.ball.x < 300) {
        this.textoPuntosB.setText(`Puntos Jugador B: ${(this.puntosB += 1)}`)

        setTimeout(() => {
          this.ball.setVelocity(-300, 0)
        }, 500)
      }

      if (this.puntosB < 5 && this.puntosA < 5) {
        if (!this.fail.isPlaying) {
          this.fail.play()
        }
      }

      this.ball.setVelocity(0, 0)

      setTimeout(() => {
        this.ball.setPosition(601, 400)
      }, 1)
    }

    // Resetear movimiento cada frame
    this.bluePaddle.setVelocityY(0)
    this.violetPaddle.setVelocityY(0)

    // Movimiento de las paletas
    if (this.keys.down.isDown) {
      this.bluePaddle.setVelocityY(180)
    } else if (this.keys.up.isDown) {
      this.bluePaddle.setVelocityY(-180)
    } else {
      this.bluePaddle.setVelocityY(0)
    }

    if (this.keys.S.isDown) {
      this.violetPaddle.setVelocityY(180)
    } else if (this.keys.W.isDown) {
      this.violetPaddle.setVelocityY(-180)
    } else {
      this.violetPaddle.setVelocityY(0)
    }

    // Iterar todos los dedos activos
    this.input.manager.pointers.forEach((pointer: any) => {
      if (!pointer.isDown) return

      if (pointer.x > this.physics.world.bounds.width / 2) {
        // Jugador derecho
        if (pointer.y > this.physics.world.bounds.height / 2) {
          this.bluePaddle.setVelocityY(180)
        } else {
          this.bluePaddle.setVelocityY(-180)
        }
      } else {
        // Jugador izquierdo
        if (pointer.y > this.physics.world.bounds.height / 2) {
          this.violetPaddle.setVelocityY(180)
        } else {
          this.violetPaddle.setVelocityY(-180)
        }
      }
    })
  }

  // Cambiar dirección de la pelota
  cambiarDireccion() {
    if (!this.beep.isPlaying) {
      this.beep.play()
    }
    let velocidadX = this.ball.body.velocity.x
    velocidadX *= 1.005

    this.ball.setVelocity(velocidadX, 400 * (Math.random() - 0.5))
  }
}
