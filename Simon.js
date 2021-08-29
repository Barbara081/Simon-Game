const topoesquerda = document.querySelector('.topo-esquerdo-Painel')
const topodireita = document.querySelector('.topo-direita-Painel')
const baseesquerda = document.querySelector('.base-esquerdo-Painel')
const basedireita = document.querySelector('.base-direita-Painel')

const getRandomPainel = () => {
  const Painel = [topoesquerda, topodireita, baseesquerda, basedireita]
  return Painel[parseInt(Math.random() * Painel.length)]
}

const sequence = [getRandomPainel()]
let sequenceToGuess = [...sequence]

const flash = Painel => {
  return new Promise((resolve, reject) => {
    Painel.className += ' click'
    setTimeout(() => {
      Painel.className = Painel.className.replace(' click', '')
      setTimeout(() => {
        resolve()
      }, 250)
    }, 1000)
  })
}

let canClick = false

const PainelClicked = PainelClicked => {
  if (!canClick) return
  const expectedPanel = sequenceToGuess.shift()
  if (expectedPanel === PainelClicked) {
    if (sequenceToGuess.length === 0) {
      // start new round
      sequence.push(getRandomPainel())
      sequenceToGuess = [...sequence]
      startFlashing()
    }
  } else {
    // end game
    alert('game over')
  }
}

const startFlashing = async () => {
  canClick = false
  for (const Painel of sequence) {
    await flash(Painel)
  }
  canClick = true
}

startFlashing()
