import Food from '@/js/Food';
import ScorePanel from '@/js/ScorePanel'
import Snake from '@/js/Snake';

class GameContol {
  food: Food
  snake: Snake
  scorePanel: ScorePanel
  direction: string = '39'
  isLive: boolean = true

  constructor() {
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
  }

  init() {
    document.addEventListener('keydown', this.keyDownHandle.bind(this))
    this.food.changePositon()
    this.run()
  }

  keyDownHandle(e) {
    this.direction = e.keyCode + ''
  }

  run() {
    let X = this.snake.X
    let Y = this.snake.Y


    const head = 10

    switch (this.direction) {
      case "37":
        X -= head
        break;
      case "38":
        Y -= head
        break;
      case "39":
        X += head
        break;
      case "40":
        Y += head
        break;
    }

    this.eatFood()

    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      console.log(error);
      this.isLive = false
    }

    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  eatFood() {
    if (this.snake.X == this.food.X && this.snake.Y == this.food.Y) {
      this.food.changePositon()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}

export default GameContol