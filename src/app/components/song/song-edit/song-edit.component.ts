import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Group } from 'src/app/models/Group';
import { MusicAlbum } from 'src/app/models/MusicAlbum';
import { Song } from 'src/app/models/Song';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {

  public songId: number;
  public form: FormGroup;
  public albums: Observable<MusicAlbum[]>;
  public genres: Observable<Genre[]>;


  constructor(private groupService: MusicApiService<Group>,
    private albumService: MusicApiService<MusicAlbum>,
    private genreService:  MusicApiService<Genre>,
    private songService:  MusicApiService<Song>,
    private formBuilder: FormBuilder,
    private router: Router,
    private avRoute: ActivatedRoute,
    private datepipe: DatePipe) 
  { 

    if (this.avRoute.snapshot.params['id']) {
      this.songId = this.avRoute.snapshot.params['id'];
    }

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        released: ['', [Validators.required]],
        length: ['', [Validators.required]],
        genres: [''],
        musicAlbum: ['', [Validators.required]]
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
    this.loadSong();
  }

  edit(): void{
    if(!this.form.valid){
      return;
    }
    
    let song: Song = {
      id: this.songId,
      name: this.name?.value,
      released: this.released?.value,
      length: this.length?.value,
      genres: this.genre?.value.map((val:any) => ({ id:val} as Genre)),
      musicAlbumId: this.album?.value
    };

    this.songService.updateEntity(song, environment.songUrl)
    .subscribe(res => {
      this.router.navigate(['/songs']);
    })
  }

  loadSong(){
    this.songService.getEntity(this.songId, environment.songUrl)
    .subscribe(res => {
      this.form.controls["name"].setValue(res.name);
      this.form.controls["released"].setValue(this.datepipe.transform(res.released, 'yyyy-MM-dd'));
      this.form.controls["length"].setValue(res.length);
      this.form.controls["musicAlbum"].setValue(res.musicAlbumId);
      this.form.controls["genres"].setValue(Array.from(res.genres, g => g.id));
    })
  }
  
  loadGenres(){
    this.genres = this.genreService.getEntities(environment.genreUrl);
   }

  loadAlbums(){
   this.albums = this.albumService.getEntities(environment.albumUrl);
  }

}
