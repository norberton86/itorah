
//http://tlrwebapi.3nom.com/api/iTorahHome

export class Home {

    Table:Array<Block>;
    Table1:Array<Speaker>;
    Table2:Array<Lectures>;
}


export class Block
{
   Count:number;
   Site:string;
}

export class Speaker
{

spkr_id: number;
Speaker:string;

}

export class Lectures
{
      ShiurID: number;
      SortOrder: number;
      Title: string;
      Speaker:string;
      RunTime: string;
      url: string;
      MediaType: string;
      PicUrl:string;
}

export class ReadNow
{
    
  title: string
  content: string
}