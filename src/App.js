import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

// Imagens das cartas
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]



function App() {
  // Armzena as escolhas feitas pelo player
  const [choice1, setChoice1] = useState(null)
  const [choice2, setChoice2] = useState(null)

  // Armazenar as cartas
  const [cards, setCards] = useState([])
  // Armazena a quantidade de turnos
  const [turn, setTurn] = useState(0)
  // Disable das cartas
  const [disable, setDisable] = useState(false)

  // Finalizar o turno
  const endTurn = () => {
    setChoice1(null)
    setChoice2(null)
    setTurn(prevTurns => prevTurns + 1)
  }

  // Embaralhar as cartas
  const shuffleCards = () => {

    setChoice1(null)
    setChoice2(null)

    // Adiciona 2 vezes todas as cartas
    const shuffledCards = [...cardImages, ...cardImages]
      // Embaralha as cartas
      .sort(() => Math.random() - 0.5)
      // Adiciona um ID aleatório para as cartas
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCards)
    setTurn(0)
  }

  //Organiza as escolhas
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }

  // Compara as escolhas de cartas
  useEffect(() => {
    if (choice1 && choice2) {
      setDisable(true)

      if (choice1.src === choice2.src) {

        // Adicionando o atributo matched para a carta que foi acertada
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return { ...card, matched: true }
            }
            else {
              return card
            }
          })
        })

        endTurn()
      } else {
        setTimeout(() => endTurn(), 1000)
      }
      setDisable(false)

    }
  }, [choice2])


  return (
    <div className="App">

      <h1>Jogo da Memória</h1>
      <button onClick={shuffleCards} >Novo Jogo</button>

      <div className='card-grid'>
        {cards.map((card) => (

          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice1 || card === choice2 || card.matched}
            disable={disable}
          />

        ))}
      </div>

      <p>Número de turnos: {turn}</p>

    </div>
  );
}

export default App;
