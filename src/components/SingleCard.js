import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disable }) {

  const handleClick = () => {
    if (!disable) {
      handleChoice(card)
    }

  }

  return (
    <div className='card'>
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt="Frente da carta" />
        <img
          className='back'
          src="/img/cover.png"
          alt="Verso da carta"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
