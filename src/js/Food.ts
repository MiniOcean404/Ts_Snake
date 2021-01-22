class Food{
  element:HTMLElement
  stage:HTMLElement

  constructor(){
    this.element = document.getElementById('food')!;
    this.stage = document.getElementById('stage')
  }

  get X():number{
    return this.element.offsetLeft
  }

  get Y():number{
    return this.element.offsetTop
  }

  changePositon(){
    const foodWidth = this.element.offsetWidth
    // 保证是事物宽高的倍数
    const diatanceX = this.radom(this.stage.clientWidth/foodWidth,0)*foodWidth
    const diatanceY = this.radom(this.stage.clientHeight/foodWidth,0)*foodWidth
    
    this.element.style.left = diatanceX+'px'
    this.element.style.top = diatanceY+'px'
  }

  radom(max:number,min:number):number{
    const radomNumber:number = Math.random()
    const difference:number = max - min
    const int:number =  (Math.floor(radomNumber * difference))+min 
    return int
  }
}

export default Food