import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/Song';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  public songs: Observable<Song[]>;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }
  
  constructor(private songService:MusicApiService<Song>,
              private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadSongs();
  }

  loadSongs(){
    this.songs = this.songService.getEntities(environment.songUrl);
  }

  deleteSong(songId: number){
    const ans = confirm('Are you shure you want to delete this genre?');
    if (ans) {
      this.songService.deleteEntity(songId, environment.songUrl)
      .subscribe(res => {
        this.route.navigate(["/"]);
      })
    }
  }
}
