export class Home {

    Table:Array<Block>
    Table1:Array<Speaker>
    Table2:Array<Lectures>
    Table3:Array<SponsorDedicated>
}

export class SponsorDedicated{
  Sponsor:string
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
  dedication:string
}

export class Link
{
  ID: number
  Title: string
  Content:string
  AudioUrl:string
  Dedication:string
}

export class LinkEmunah{
    id: number
    title: string
    date: Date
    audioUrl: string
    content:string
}