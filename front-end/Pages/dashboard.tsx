import baseClasses from '@components/Themes/layout.module.scss'
import stylemodulescss from 'dist/css/style.module.scss'
import Phaser from 'phaser'
import React, { FunctionComponent } from 'react'

import Start from './Scenes/Start'

import Container from '@mui/material/Container'
import Game from './Scenes/Game'

const Dashboard: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const [lang, setlang] = React.useState<any>('en')
  const theme = { ...baseClasses, ...stylemodulescss }
  const config_MrrpauN6: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'MrrpauN6',

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    width: 1200,
    height: 800,

    scene: [new Start(), new Game()],

    physics: {
      default: 'arcade',
      arcade: {
        debug: false,

        gravity: { x: 0, y: 0 },
      },
    },
    dom: {
      createContainer: true,
    },
  }
  React.useEffect(() => {
    new Phaser.Game(config_MrrpauN6)
  }, [])

  // Theme selection

  React.useEffect(() => {
    if (typeof langStrings !== 'undefined') {
      setlang(langStrings[localStorage.getItem('aptugolang') || 'en'])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <Container className={theme.container} maxWidth="md">
          <div id="MrrpauN6" className={theme.phaser}></div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Dashboard
