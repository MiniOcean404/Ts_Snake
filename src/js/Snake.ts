class Snake {
  head: HTMLElement
  bodies: HTMLCollection
  element: HTMLElement
  constructor() {
    this.element = document.querySelector('#snake')
    this.head = this.element.children[0] as HTMLElement
    this.bodies = this.element.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  // 设置蛇的坐标
  set X(value: number) {
    // 可以解决bug
    if (this.X === value) {
      return;
    }
    // bug--存在转向时候第二个元素和第一个元素的位置相同
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      console.log((this.bodies[1] as HTMLElement).offsetLeft);

      if (value > this.X) {
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }
    
    this.checkHead()
    this.collision(value)
    // // 遍历完成后赋值头新的位置防止重复
    this.moveBody()
    this.head.style.left = value + 'px'
  }

  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }
    this.checkHead()
    this.collision(value)
    this.moveBody()
    this.head.style.top = value + 'px'
  }

  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + 'px';
      (this.bodies[i] as HTMLElement).style.top = Y + 'px';
    }
  }

  checkHead() {
    for (let i = 1; i < this.bodies.length; i++) {
      const bd = this.bodies[i] as HTMLElement
      if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
        throw new Error('自己撞了自己，游戏结束')
      }
    }
  }

  collision(value) {
    if (value < 0 || value > 290) {
      throw new Error('超出范围游戏结束')
    }
  }
}

export default Snake