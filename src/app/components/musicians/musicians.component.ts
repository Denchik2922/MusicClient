import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from 'src/app/models/Musician';
import { MusicianService } from 'src/app/services/musician.service';

@Component({
  selector: 'app-musicians',
  templateUrl: './musicians.component.html',
  styleUrls: ['./musicians.component.css']
})
export class MusiciansComponent implements OnInit {

  public musicians: Observable<Musician[]>;

  constructor(private musicianService:MusicianService) { }

  ngOnInit(): void {
    this.loadMusicians();
  }

  loadMusicians(){
    this.musicians = this.musicianService.getMusicians();
  }

}
