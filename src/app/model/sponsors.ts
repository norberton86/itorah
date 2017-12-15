export class Sponsor {
    SourceID: Array<number>
    ForDate: Date
    DedicationTypeID: number
    SponsoredForName: string
    SponsoredByName: string
    PaymentInfo: {
        Amount: number,
        CardExpDate: string,
        CardHolderName: string,
        CardNumber: string,
        CVV: string
    }
}



export class SponsorShiur {
    ShiurID: number
    DedicationTypeID: number
    SponsoredForName: string
    SponsoredByName: string
    PaymentInfo: {
        Amount: number,
        CardExpDate: string,
        CardHolderName: string,
        CardNumber: string,
        CVV: string
    }
}

export class SponsorMedia {
    impressionCount: number
    DedicationTypeID: number
    SponsoredForName: string
    SponsoredByName: string
    PaymentInfo: {
        Amount: number,
        CardExpDate: string,
        CardHolderName: string,
        CardNumber: string,
        CVV: string
    }
}
