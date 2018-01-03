
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
    cost:number
    sponsor:string
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

export class SubCategory
{
    name:string
    id:number
    parentID:number
}

export class Browse extends ItemQueue
{
  downloadCount:number
}