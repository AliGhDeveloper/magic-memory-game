import './App.css'
import {useEffect, useState} from 'react'
import SingleCard from './SingleCard'


const cardImages = [
  {src: '/img/helmet-1.png', matched: false},
  {src: '/img/potion-1.png', matched: false},
  {src: '/img/ring-1.png', matched: false},
  {src: '/img/scroll-1.png', matched: false},
  {src: '/img/shield-1.png', matched: false},
  {src: '/img/sword-1.png', matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState()

  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if( choiceOne.src === choiceTwo.src ){
        setCards(prevCards => {
          return (
            prevCards.map( card => {
              if( card.src === choiceOne.src ){
                return {...card, matched: true}
              } else {
                return card
              }
            }) 
          )
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  },[choiceOne, choiceTwo])


  const resetTurn = () =>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prev => prev + 1);
    setDisabled(false)
  }

  const shuffleCards = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0)
  }

  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => 
          <SingleCard disabled={disabled} flipped={card === choiceOne || card === choiceTwo || card.matched} key={card.id} handleChoice={handleChoice} card={card} />
        )}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App