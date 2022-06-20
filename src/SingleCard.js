function SingleCard({flipped, card, handleChoice, disabled}){

    const onClickHandle = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return(
        <div className="card">
            <div className={flipped ? 'flipped' : ''}>
                <img src={card.src} className="front" />
                <img src='/img/cover.png' className="back" onClick={onClickHandle} />
            </div>
        </div>
    )
}

export default SingleCard;