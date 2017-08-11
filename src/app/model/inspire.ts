export class Inspire {
    id:number;
    url:string;
    title:string;
    description:string;
    time:string;
    chapters:Array<Chapter>;
    date:Date;
}

export class Chapter{

    title:string;
    content:string;
}