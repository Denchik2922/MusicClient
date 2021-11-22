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
  selector: 'app-music-albums-add',
  templateUrl: './music-albums-add.component.html',
  styleUrls: ['./music-albums-add.component.css']
})
export class MusicAlbumsAddComponent implements OnInit {

  public form: FormGroup;
  public groups: Observable<Group[]>;
  public songs: Observable<Song[]>;
  public genres: Observable<Genre[]>;

  constructor(private groupService: MusicApiService<Group>,
              private albumService: MusicApiService<MusicAlbum>,
              private genreService:  MusicApiService<Genre>,
              private songsService:  MusicApiService<Song>,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        released: ['', [Validators.required]],
        length: ['', [Validators.required]],
        songs: [''],
        genres: [''],
        group: ['', [Validators.required]],
        
      });
  }

  get name() { return this.form.get('name'); }

  get released() { return this.form.get('released'); }

  get length() { return this.form.get('length'); }

  get song() { return this.form.get('songs'); }

  get group() { return this.form.get('group'); }

  get genre() { return this.form.get('genres'); }

  ngOnInit(): void {
    this.loadGroups();
    this.loadGenres();
    this.loadSongs();
  }

  add(): void{
    if(!this.form.valid){
      return;
    } 
    
    let album: MusicAlbum = {
      id: 0,
      name: this.name?.value,
      released: this.released?.value,
      length: this.length?.value,
      groupId: this.group?.value,
      songs: this.song?.value.map((val:any) => ({ id:val} as Song)),
      genres: this.genre?.value.map((val:any) => ({ id:val} as Genre))
    };

    this.albumService.addEntity(album, environment.albumUrl)
    .subscribe(res => {
      this.router.navigate(['/album']);
    })
  }

  loadSongs(){
    this.songs = this.songsService.getEntities(environment.songUrl);
  }

  loadGenres(){
    this.genres = this.genreService.getEntities(environment.genreUrl);
   }

  loadGroups(){
   this.groups = this.groupService.getEntities(environment.groupUrl);
  }
}
