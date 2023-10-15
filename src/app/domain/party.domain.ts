import { Guest } from "./guest.domain";

export class Party {

    id: string | null;
    name: string | null;
    date: Date | null;
    status: string | null;
    guests: Array<Guest>;

    constructor() {
        this.id = null;
        this.name = null;        
        this.date = null;
        this.status = null;
        this.guests = [];
    }

}