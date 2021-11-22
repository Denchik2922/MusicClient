import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Group } from 'src/app/models/Group';
import { Musician } from 'src/app/models/Musician';
import { MusicInstrument } from 'src/app/models/MusicInstrument';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-musician-add',
  templateUrl: './musician-add.component.html',
  styleUrls: ['./musician-add.component.css']
})
export class MusicianAddComponent implements OnInit {

  
  public form: FormGroup;
  public groups: Observable<Group[]>;
  public musicInstruments: Observable<MusicInstrument[]>;
  public genres: Observable<Genre[]>;

  constructor(private groupService: MusicApiService<Group>,
              private musicianService: MusicApiService<Musician>,
              private genreService:  MusicApiService<Genre>,
              private instrumentsService:  MusicApiService<MusicInstrument>,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
        country: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z]+$')]],
        musicInstruments: ['',[Validators.required]],
        genres: ['',[Validators.required]],
        group: ['', [Validators.required]],
        
      });
  }

  get firstName() { return this.form.get('firstName'); }

  get lastName() { return this.form.get('lastName'); }

  get country() { return this.form.get('country'); }

  get group() { return this.form.get('group'); }

  get instrument() { return this.form.get('musicInstruments'); }

  get genre() { return this.form.get('genres'); }

  ngOnInit(): void {
    this.loadGroups();
    this.loadGenres();
    this.loadMusicInstruments();
  }

  add(): void{
    if(!this.form.valid){
      return;
    } 
    
    let musician: Musician = {
      id: 0,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      country: this.country?.value,
      groupId: this.group?.value,
      musicInstruments: this.instrument?.value.map((val:any) =>({ id:val} as MusicInstrument)),
      genres: this.genre?.value.map((val:any) =>({ id:val} as Genre))
    };

    this.musicianService.addEntity(musician, environment.musicianUrl)
    .subscribe(res => {
      this.router.navigate(['/musician']);
    })
  }

  loadMusicInstruments(){
    this.musicInstruments = this.instrumentsService.getEntities(environment.instrumentUrl);
  }

  loadGenres(){
    this.genres = this.genreService.getEntities(environment.genreUrl);
   }

  loadGroups(){
   this.groups = this.groupService.getEntities(environment.groupUrl);
  }
}
