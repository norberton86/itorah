
export class Shiurim {
    sourceID:number
    id:string
    title: string
    dateRecorded: Date
    length: string
    language: string
    audio: string
    video: string
    wowzaVideoUrl:string
    credits:number=Math.floor((Math.random() * 10) + 1);
    sponsored:false;
}


export class Hok extends Shiurim
{
     dayWeek?:string
     type?:string
     pdfUrl?:string
      
} 

export class ItemQueue extends Hok
{
     speaker:string;
} 
 

export class Category
{
    name:string
    id:number
}