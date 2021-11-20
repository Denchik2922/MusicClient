import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Genre } from 'src/app/models/Genre';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  public genres: Observable<Genre[]>;

  constructor(private genresService:MusicApiService<Genre>) { }

  ngOnInit(): void {
    this.loadMusicians();
  }

  loadMusicians(){
    this.genres = this.genresService.getEntities(environment.genreUrl);
  }

}
