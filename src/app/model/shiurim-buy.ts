export class ShiurimBuy {
  id: number
  quantity: number
  price: number
}

export class ShiurimBuyTable extends ShiurimBuy {
  count: number = 1


  constructor(s: ShiurimBuy) {
    super()
    this.id = s.id
    this.quantity = s.quantity
    this.price = s.price
  }

  Total() {
    return this.count * this.price
  }



}


export class creditsTable {
  shiurimBalance: number
  dollarBalance: number
  orderHistory: Array<History>=[]
}

export class History {

  id:number
  date: Date
  price: number
  description:string

}