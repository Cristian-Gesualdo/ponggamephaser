import Phaser from 'phaser'

export default class Start extends Phaser.Scene {
  constructor() {
    super({ key: 'Start' })
  }

  preload() {
    this.load.image('fondoStart', '/img/PongStart2.jpeg')

    this.load.image('btnStartStart', '/img/btn_start2.png')
  }
  create() {
    this.add.image(600, 400, 'fondoStart').setDisplaySize(1200, 800)

    if (this.sys.game.device.os.desktop) {
      this.add
        .image(600, 150, 'btnStartStart')
        .setDisplaySize(200, 200)
        .setInteractive()
        .on('pointerdown', (e) => {
          this.scene.start('Game')
        })
        .on('pointerover', () => {
          document.body.style.cursor = 'pointer'
        })
        .on('pointerout', () => {
          document.body.style.cursor = 'default'
        })
    }

    if (!this.sys.game.device.os.desktop) {
      this.add
      .image(600, 150, 'btnStartStart')
      .setDisplaySize(200, 200)
      .setInteractive()
      .on('pointerup', async () => {
          this.scale.startFullscreen()
          try {
            // Se le solicita al navegador forzar la vista horizontal
            if (screen.orientation && screen.orientation.lock) {
              await screen.orientation.lock('landscape')
              this.scene.start('Game')
            }
          } catch (e) {
            // Fallará silenciosamente si el dispositivo no lo permite (ej: iOS)
          }
      })
    }      
  }
}
