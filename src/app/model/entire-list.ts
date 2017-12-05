export class EntireList {
    id: number
    title: string
    needs: Array<Need>
}

export class Need {
    id: number
    need: string
    perek: Array<number>
}

export class Perek{
    id: number
    hebrewText: Array<string>
    englishText: Array<string>
    transliteration: Array<string>
    both: Array<string>
    perekSummary:string
    categories: Array<number>
    needs: Array<number>
    audioUrl:string
}