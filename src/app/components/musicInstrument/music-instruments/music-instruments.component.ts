import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicInstrument } from 'src/app/models/MusicInstrument';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-music-instruments',
  templateUrl: './music-instruments.component.html',
  styleUrls: ['./music-instruments.component.css']
})
export class MusicInstrumentsComponent implements OnInit {

  public instruments: Observable<MusicInstrument[]>;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }
  
  constructor(private instrumentService:MusicApiService<MusicInstrument>,
              private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(){
    this.instruments = this.instrumentService.getEntities(environment.instrumentUrl);
  }

  deleteInstrument(instrumentId: number){
    const ans = confirm('Are you shure you want to delete this instrument?');
    if (ans) {
      this.instrumentService.deleteEntity(instrumentId, environment.instrumentUrl)
      .subscribe(res => {
        this.route.navigate(["/"]);
      })
    }
  }
}
