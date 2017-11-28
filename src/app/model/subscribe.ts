export class Subscribe {

      checkBoxHalacha: boolean
      checkBoxPerasha: boolean
      checkBoxEmunah: boolean
      checkBoxTehillim: boolean
      checkBoxPrayers: boolean
      checkBoxEmailTehillim: boolean
      checkBoxSmsTehillim: boolean
      checkBoxEmailFuneral: boolean
      checkBoxSmsFuneral: boolean


}

export class SubscribeRequest {
      emailSubscriptions: Array<number>=[]
      textSubscriptions: Array<number>=[]
}
