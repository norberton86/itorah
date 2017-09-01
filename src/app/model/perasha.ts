export class Perasha {
    id: number
    weekOf: Date
    parashaID: number
    parashaName: string
    chumashID: number
    chumashName: string
    artScrollBookNumber: number
    clipTitle: string
    ltLink: string
    clipKeywords: string
    clipLength: string
    wmaSize: number
    mp3Size: number
    emailText: string
    websiteText: string
    readingStat: number
    printingStat: number
    downloadStat: number
    playStat: number
    converting: boolean
    isPublished: boolean

    Parragraphs():Array<String>
    {
        return this.emailText.split("\n").filter(function (s) {
               return s!="";
         });
    }
}


export class AllParasha
{
    ID: number
    Name: string
    HebrewName: string
 
}