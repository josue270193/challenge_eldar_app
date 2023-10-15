import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { Party } from "../../domain/party.domain";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Guest } from "../../domain/guest.domain";
import { GuestForm } from "../guest-form/guest-form.component";

@Component({
    selector: 'party-form',
    templateUrl: './party-form.component.html',
    styleUrls: ['./party-form.component.css']
})
export class PartyForm implements OnInit {

    party: Party;
    guestsNotConfirm: Array<Guest> = [];
    @ViewChild('guestForm') guestForm: GuestForm = {} as GuestForm;
    @Output() addPartyHandler: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.party = new Party();
    }

    ngOnInit(): void {

    }

    onAddGuest(elem: Guest) {
        this.guestsNotConfirm?.push(elem);
    }

    onCreateParty() {
        this.addPartyHandler.emit(this.party);
        this.party = new Party();
    }

    onEditGuest(guest: Guest) {
        this.guestForm.guest = guest;
        console.log("onEdit", guest);
    }

    onDeleteGuest(guest: Guest) {
        this.guestsNotConfirm = this.guestsNotConfirm.filter(item => item !== guest);
        this.guestForm.guest = new Guest();
        console.log("onDelete", guest);
    }

    drop(event: CdkDragDrop<Guest[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }

}