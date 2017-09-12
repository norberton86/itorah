export class Topic {
    
    id: number
    name: string
}

export class SubTopic
{
    id: number
    name: string
}

export class chelek
{
    id: number
    name: string
}

export class seif
{
    id: number
    name: string
}

export class ContentSeif
{
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