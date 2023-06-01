import { useEffect, useRef, useState } from "react"
import Card from "./Card"
import '../scss/board.scss'

type BoardProps = {
  setMoves: React.Dispatch<React.SetStateAction<number>>,
  finishGameCallback: () => void,
  cardIds: number[]
}

const Board = ({cardIds, finishGameCallback, setMoves}: BoardProps) => {
  const [openCards, setOpenCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<number[]>([])
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const timeout = useRef<NodeJS.Timeout>(setTimeout(() => {}))

  const disable = () => {
    setShouldDisableAllCards(true)
  }

  const enable = () => {
    setShouldDisableAllCards(false)
  }

  const checkCompletion = () => {
    if (clearedCards.length === cardIds.length) {
      finishGameCallback()
    }
  }

  const evaluate = () => {
    const [first, second] = openCards
    enable()

    // ckeck if first card is equal to second
    if ((first % 6 + 1) === (second % 6 + 1)) {
      setClearedCards(prev => [...prev, first, second])
      setOpenCards([])
      return
    }

    // flip the card back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([])
    }, 500)
  }

  const handleCardClick = (id: number) => {
    if (openCards.length === 1) {
      // in this case we have alredy selected one card
      // this means that we are finishing a move
      setOpenCards(prev => [...prev, id])
      setMoves(moves => moves + 1)
      disable()
    } else {
      // in this case this is the first card we select
      clearTimeout(timeout.current)
      setOpenCards([id])
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let timeout: NodeJS.Timeout = setTimeout(() => {})
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 400)
    }
    return () => {
      clearTimeout(timeout)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCards])

  useEffect(() => {
    checkCompletion()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearedCards])

  const checkIsFlipped = (id: number) => {
    return clearedCards.includes(id) || openCards.includes(id)
  }
  
  const checkIsInactive = (id: number) => {
    return clearedCards.includes(id)
  }

  return (
    <div className={'board'}>
      {cardIds.map(index => {
        return <Card 
          key={index}
          image={`/images/${index % 6 + 1}.png`}
          id={index}
          isDisabled={shouldDisableAllCards}
          isInactive={checkIsInactive(index)}
          isFlipped={checkIsFlipped(index)}
          onClick={handleCardClick}
        />
      })}
    </div>
  )
}

export default Board