export class Tehillim {
  ID: number
  TName: string
  HName: string
  Reason: string
  Posted: Date
  Until: Date
  Comments: string

}

export class Country {
  id: number;
  name: string;
}


export class Category {
  id: number;
  name: string;
  MainCategory: boolean
  ParentID: number
}

export class Comunity {
  id: number;
  name: string;
}