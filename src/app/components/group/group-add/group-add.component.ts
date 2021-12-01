import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Group } from 'src/app/models/Group';
import { MusicAlbum } from 'src/app/models/MusicAlbum';
import { Musician } from 'src/app/models/Musician';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.css']
})
export class GroupAddComponent implements OnInit {

  public form: FormGroup;
  public members: Observable<Musician[]>;
  public genres: Observable<Genre[]>;
  public albums: Observable<MusicAlbum[]>;


  constructor(private groupService: MusicApiService<Group>,
              private musicianService: MusicApiService<Musician>,
              private musicAlbumService: MusicApiService<MusicAlbum>,
              private genreService:  MusicApiService<Genre>,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        country: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')]],
        members: [''],
        albums: [''],
        genres: ['',[Validators.required]],
      });
  }

  get name() { return this.form.get('name'); }

  get country() { return this.form.get('country'); }

  get member() { return this.form.get('members'); }

  get genre() { return this.form.get('genres'); }

  get album() { return this.form.get('albums'); }

  ngOnInit(): void {
    this.loadMembers();
    this.loadGenres();
    this.loadAlbums();
  }

  add(): void{
    if(!this.form.valid){
      return;
    } 
    
    let group: Group = {
      id: 0,
      name: this.name?.value,
      country: this.country?.value,
      musicAlbums: this.album?.value,
      members: this.member?.value,
      genres: this.genre?.value?.map((val:any) =>({ id:val} as Genre))
    };

    this.groupService.addEntity(group, environment.groupUrl)
    .subscribe(res => {
      this.router.navigate(['/group']);
    })
  }

  loadGenres(){
    this.genres = this.genreService.getEntities(environment.genreUrl);
   }

  loadMembers(){
   this.members = this.musicianService.getEntities(environment.musicianUrl);
  }

  loadAlbums(){
    this.albums = this.musicAlbumService.getEntities(environment.albumUrl);
   }
}
