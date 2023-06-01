import '../scss/score.scss'

type ScoreProps = {
  moves: number,
  bestScore: number
}

const Score = ({moves, bestScore}: ScoreProps) => {
  return (
    <div className="score-container">
      <div className="score">
        <div>
          <span>Moves: </span> {moves}
        </div>
        <div>
          {localStorage.getItem('bestScore') && (
            <div>
              <span>Best score: </span>{bestScore} 
            </div>
          )}
        </div>
        <div>
          <button onClick={() => {window.location.reload()}}>RESTART</button>
        </div>
      </div>
    </div>
  )
}

export default Score