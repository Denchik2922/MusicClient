import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Group } from 'src/app/models/Group';
import { MusicAlbum } from 'src/app/models/MusicAlbum';
import { Song } from 'src/app/models/Song';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {

  public form: FormGroup;
  public albums: Observable<MusicAlbum[]>;
  public genres: Observable<Genre[]>;

  constructor(private albumService: MusicApiService<MusicAlbum>,
              private genreService:  MusicApiService<Genre>,
              private songService:  MusicApiService<Song>,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        released: ['', [Validators.required]],
        length: ['', [Validators.required]],
        genres: [''],
        musicAlbum: ['', [Validators.required]],
      });
  }

  get name() { return this.form.get('name'); }

  get released() { return this.form.get('released'); }

  get length() { return this.form.get('length'); }

  get album() { return this.form.get('musicAlbum'); }

  get genre() { return this.form.get('genres'); }

  ngOnInit(): void {
    this.loadAlbums();
    this.loadGenres();
  }

  add(): void{
    if(!this.form.valid){
      return;
    }
    
    let song: Song = {
      id: 0,
      name: this.name?.value,
      released: this.released?.value,
      length: this.length?.value,
      genres: this.genre?.value,
      musicAlbumId: this.album?.value
    };

    this.songService.addEntity(song, environment.songUrl)
    .subscribe(res => {
      this.router.navigate(['/song']);
    })
  }

  loadGenres(){
    this.genres = this.genreService.getEntities(environment.genreUrl);
   }

  loadAlbums(){
   this.albums = this.albumService.getEntities(environment.albumUrl);
  }
}
