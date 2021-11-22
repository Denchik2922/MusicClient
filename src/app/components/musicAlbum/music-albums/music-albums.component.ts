import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicAlbum } from 'src/app/models/MusicAlbum';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-music-albums',
  templateUrl: './music-albums.component.html',
  styleUrls: ['./music-albums.component.css']
})
export class MusicAlbumsComponent implements OnInit {

  public albums: Observable<MusicAlbum[]>;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private albumService:MusicApiService<MusicAlbum>,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(){
    this. albums = this.albumService.getEntities(environment.albumUrl);
  }

}
