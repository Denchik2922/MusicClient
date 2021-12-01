import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Group } from 'src/app/models/Group';
import { MusicAlbum } from 'src/app/models/MusicAlbum';
import { Musician } from 'src/app/models/Musician';
import { MusicInstrument } from 'src/app/models/MusicInstrument';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit {
  public groupId: number;
  public form: FormGroup;
  public members: Observable<Musician[]>;
  public genres: Observable<Genre[]>;
  public albums: Observable<MusicAlbum[]>;

  constructor(private groupService: MusicApiService<Group>,
              private musicianService: MusicApiService<Musician>,
              private formBuilder: FormBuilder,
              private router: Router,
              private avRoute: ActivatedRoute,
              private genreService: MusicApiService<Genre>,
              private musicAlbumService: MusicApiService<MusicAlbum>) 
  { 

    if (this.avRoute.snapshot.params['id']) {
      this.groupId = this.avRoute.snapshot.params['id'];
    }

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
    this.loadGroup();
  }

  edit(): void{
    if(!this.form.valid){
      return;
    } 
    
    let group: Group = {
      id: this.groupId,
      name: this.name?.value,
      country: this.country?.value,
      musicAlbums: this.album?.value,
      members: this.member?.value,
      genres: this.genre?.value.map((val:any) =>({ id:val} as Genre))
    };

    this.groupService.updateEntity(group, environment.groupUrl)
    .subscribe(res => {
      this.router.navigate(['/group', this.groupId]);
    })
  }

  loadGroup(){
    this.groupService.getEntity(this.groupId, environment.groupUrl)
    .subscribe(res => {
      this.form.controls["name"].setValue(res.name);
      this.form.controls["country"].setValue(res.country);
      this.form.controls["albums"].setValue(res.musicAlbums);
      this.form.controls["members"].setValue(res.members);
      this.form.controls["genres"].setValue(Array.from(res.genres, g => g.id));
    })
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
