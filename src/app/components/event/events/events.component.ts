import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/Concert';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public concerts: Concert[]

  constructor(private eventService:EventService) { }

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(){
    this.eventService.getConcerts()
    .subscribe(res => {this.concerts = res.sort((b, a) => {
      return <any>new Date(b.datetime_Local) - <any>new Date(a.datetime_Local)});
  });
  }

}
