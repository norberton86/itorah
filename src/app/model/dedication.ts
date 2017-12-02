export class Dedication {
    id: number
    type: string
    dedicationForName: string
    dedicationByName: string
}

export class DedicationPost {
    ID: number
    DedicationTypeID: number
    DedicationForName: string
    DedicationByName: string
    TimeLimit: string
    Details: string
    PaymentInfo: {
        Amount: number,
        CardExpDate: string,
        CardHolderName: string,
        CardNumber: string,
        CVV: string
    }
}
