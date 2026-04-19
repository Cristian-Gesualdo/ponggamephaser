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
}
