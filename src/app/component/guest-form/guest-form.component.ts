import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Guest } from "../../domain/guest.domain";

@Component({
    selector: 'guest-form',
    templateUrl: './guest-form.component.html',
    styleUrls: ['./guest-form.component.css']
})
export class GuestForm implements OnInit {

    @Output() addGuestHandler: EventEmitter<any> = new EventEmitter();

    public isGuestNew: boolean;
    private _guest: Guest;

    @Input() set guest(newGuest: Guest) {
        if (this._guest != newGuest) {
            this._guest = newGuest;
            this.onGuestChanged();
        }
    }

    get guest() {
        return this._guest;
    }

    constructor(private cdr: ChangeDetectorRef) {
        this._guest = new Guest();
        this.isGuestNew = true;
    }

    ngOnInit(): void {
        this.onNewGuest();
    }

    onAddGuest() {
        this.addGuestHandler.emit(this.guest);
        this.onNewGuest();
    }

    onGuestChanged() {
        this.isGuestNew = false;
        this.cdr.markForCheck();
    }

    onNewGuest() {
        this.guest = new Guest();
        this.isGuestNew = true;
    }

}