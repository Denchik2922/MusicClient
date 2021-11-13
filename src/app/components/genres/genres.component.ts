import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Genre } from 'src/app/models/Genre';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  public genres: Observable<Genre[]>;

  constructor(private genresService:GenreService) { }

  ngOnInit(): void {
    this.loadMusicians();
  }

  loadMusicians(){
    this.genres = this.genresService.getGenres();
  }

}
