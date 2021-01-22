class ScorePanel {
  score = 0
  level = 1
  scoreEl: HTMLElement
  levelEl: HTMLElement
  maxLevel: number
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEl = document.getElementById('score')
    this.levelEl = document.getElementById('level')

    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  addScore(): void {
    this.score++
    
    this.scoreEl.innerHTML = this.score + ''

    if (this.score % this.upScore === 0) this.upLevel()
  }

  upLevel() {
    if (this.level < this.maxLevel) {
      this.level++
      this.levelEl.innerHTML = this.level + ''
    } else {
      console.log('超过设置的关卡最大等级');
    }
  }
}

export default ScorePanel