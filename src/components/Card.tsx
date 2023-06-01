
import classnames from 'classnames' // library 'classnames' need to install
import '../scss/card.scss'

type CardProps = {
  image: string,
  onClick: (id: number) => void,
  id: number,
  isInactive: boolean,
  isFlipped: boolean,
  isDisabled: boolean
}

const Card = ({image, id,isDisabled, isFlipped, isInactive, onClick} : CardProps) => {

  const backSide = './images/backside.png'

  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(id)
  }

  return (
    <div 
      className={classnames('card', {
        'is-flipped': isFlipped,
        'is-inactive': isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face">
        <img src={backSide} alt="card backside" />
      </div>
      <div className="card-face card-back-face">
        <img src={image} alt="card" />
      </div>

    </div>
  )
}

export default Card