export class Gemara {
 id: number
  masechetID: number
  masechetName: string
  page: string
  content: string                           //gif files divided by comma
  audio:Array<AudioGemara>
}

export class AudioGemara {
    id: number
    clipTypeID: number
    clipTypeName: string
    url: string
}

export class DropGemara{
     id: number
     name: string
}