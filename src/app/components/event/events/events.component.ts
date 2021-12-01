import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Concert } from 'src/app/models/Concert';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public concerts: Concert[]

  constructor(private eventService:EventService,
              private router: Router) {

                console.log("constructor")
              }

  ngOnInit(): void {
    this.loadConcerts();
    console.log(" ngOnInit")
  }

  loadConcerts(){
    this.eventService.getConcerts()
    .subscribe(res =>{
      this.concerts = res;
    })
  }
  
  goToPage(id:any) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/event', id]);
 }

}
