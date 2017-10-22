export class Topic {

    id: number
    name: string
}

export class SubTopic {
    id: number
    name: string
}

export class chelek {
    id: number
    name: string
}

export class seif {
    id: number
    name: string
}

export class SubSeif extends seif {
    idFather: number
}

export class ContentSeif {
    id: number
    chelekID: number
    topicID: number
    topicName: string
    subTopicID: number
    subTopicName: string
    text: string
    clipLength: string
    audio: string
}

export class ContentSeifMishna {
    id: number
    chelekID: number
    topicID: number
    topicName: string
    subTopicID: number
    subTopicName: string
    imageUrl: string
    clipLength: string
    audio: string
    qaList: Array<Question>
}

export class Question {
    id: number
    question: string
    answer: string
    status:boolean=false
}


export class SearchResult
{
    questionAndAnswerID: number
    question: string
    answer: string
    imageUrl:string
    chelekID: number
    chelekName: string
    simanID: number
    seifID: number
    simanSeifName: string
    topicID: number
    topicName: string
    subTopicID: number
    subTopicName: string
}