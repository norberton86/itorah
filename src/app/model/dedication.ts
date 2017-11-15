export class Dedication {
    id: number
    type: string
    dedicationForName: string
    dedicationByName: string
}

export class DedicationPost {
    id: number
    dedicationTypeID: number
    dedicationForName: string
    dedicationByName: string
    timeLimit: string
    details: string
    paid: boolean
}
