import { Component, OnInit } from '@angular/core';
import { Party } from './domain/party.domain';
import { PartyService } from './service/party.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  parties: Array<Party>;

  constructor(public partyService: PartyService) {
    this.parties = [];
  }

  ngOnInit(): void {
    this.loadParties();
  }

  loadParties() {
    return this.partyService.getAllParty().subscribe((data: any) => {
      this.parties = data;
    });
  }

  onAddParty(party: Party) {
    this.partyService.createParty(party).subscribe((data: Party) => {
      this.parties?.push(data);
    });
  }

}
