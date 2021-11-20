import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from 'src/app/models/Genre';
import { Group } from 'src/app/models/Group';
import { Musician } from 'src/app/models/Musician';
import { MusicInstrument } from 'src/app/models/MusicInstrument';
import { GenreService } from 'src/app/services/genre.service';
import { GroupService } from 'src/app/services/group.service';
import { MusicInstrumentsService } from 'src/app/services/music-instruments.service';
import { MusicianService } from 'src/app/services/musician.service';

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

  constructor(private groupService: GroupService,
              private musicianService: MusicianService,
              private genreService: GenreService,
              private instrumentsService: MusicInstrumentsService,
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
      console.log(this.instrument?.value.map((val:any) =>({ id:val} as MusicInstrument)));
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

    this.musicianService.addMusician(musician)
    .subscribe(res => {
      this.router.navigate(['/musicians']);
    })
  }

  loadMusicInstruments(){
    this.musicInstruments = this.instrumentsService.getInstruments();
  }

  loadGenres(){
    this.genres = this.genreService.getGenres();
   }

  loadGroups(){
   this.groups = this.groupService.getGroups();
  }
}
