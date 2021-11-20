import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from 'src/app/models/Musician';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-musicians',
  templateUrl: './musicians.component.html',
  styleUrls: ['./musicians.component.css']
})
export class MusiciansComponent implements OnInit {
  public musicians: Observable<Musician[]>;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private musicianService:MusicApiService<Musician>,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loadMusicians();
  }

  loadMusicians(){
    this.musicians = this.musicianService.getEntities(environment.musicianUrl);
  }

}
