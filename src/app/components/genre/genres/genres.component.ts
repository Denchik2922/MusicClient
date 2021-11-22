import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Genre } from 'src/app/models/Genre';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  public genres: Observable<Genre[]>;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }
  
  constructor(private genresService:MusicApiService<Genre>,
              private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(){
    this.genres = this.genresService.getEntities(environment.genreUrl);
  }

  deleteGenre(genreId: number){
    const ans = confirm('Are you shure you want to delete this genre?');
    if (ans) {
      this.genresService.deleteEntity(genreId, environment.genreUrl)
      .subscribe(res => {
        this.route.navigate(["/"]);
      })
    }
  }

}
