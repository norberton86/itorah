export class ShiurimBuy {
  id: number
  quantity: number
  price: number
}

export  class ShiurimBuyTable extends ShiurimBuy {
  count: number = 1


  constructor(s: ShiurimBuy) {
    super()
    this.id = s.id
    this.quantity = s.quantity
    this.price = s.price
  }

  Total()
  {
    return this.count*this.price
  }



}

export class ShiurimBuyTableHistory extends ShiurimBuyTable
{
  date:Date

  constructor(s:ShiurimBuyTable,date:Date)
  {
    super({id:s.id,quantity:s.quantity,price:s.quantity})
    this.count=s.count
    this.date=date
  }

}