
export class Shiurim {
    id:string
    title: string
    dateRecorded: Date
    length: string
    language: string
    audio: string
    video: string
    wowzaVideoUrl:string
}


export class Hok extends Shiurim
{
     dayWeek:string;
     myClass:string;
      
} 

export class ItemQueue extends Shiurim
{
     speakerName:string;
} 