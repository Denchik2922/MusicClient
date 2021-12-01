import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Concert } from 'src/app/models/Concert';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  public concert: Concert;
  public concertId: number;

  constructor(private eventService: EventService,
              private avRoute: ActivatedRoute){
    if (this.avRoute.snapshot.params['id']) {
      avRoute.params.subscribe(params=>this.concertId=params['id'])
      console.log(this.concertId);
    }
  }

  ngOnInit(): void {
    this.loadConcert();
    if (this.avRoute.snapshot.params['id']) {
      this.avRoute.params.subscribe(params=>this.concertId=params['id'])
      console.log(this.concertId);
    }
  }

  loadConcert(){
    this.eventService.getConcert(this.concertId)
    .subscribe(res => {
      this.concert = res;
    })
  }

}
