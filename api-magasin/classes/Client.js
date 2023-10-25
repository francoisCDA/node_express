import { v4 as uuidv4 } from "uuid"

export class Client {
    constructor(last,first,phone){
        this.id = uuidv4();
        this.last = last ;
        this.first = first ;
        this.phone = phone ;
    }
}