import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-musician-edit',
  templateUrl: './musician-edit.component.html',
  styleUrls: ['./musician-edit.component.css']
})
export class MusicianEditComponent implements OnInit {
  public musicianId: number;
  public form: FormGroup;
  public groups: Observable<Group[]>
  public musicInstruments: Observable<MusicInstrument[]>
  public genres: Observable<Genre[]>

  constructor(private groupService: GroupService,
              private musicianService: MusicianService,
              private formBuilder: FormBuilder,
              private router: Router,
              private avRoute: ActivatedRoute,
              private genreService: GenreService,
              private instrumentsService: MusicInstrumentsService) 
  { 

    if (this.avRoute.snapshot.params['id']) {
      this.musicianId = this.avRoute.snapshot.params['id'];
    }

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
    this.loadMusician();
  }

  edit(): void{
    if(!this.form.valid){
      return;
    } 
    
    let musician: Musician = {
      id: this.musicianId,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      country: this.country?.value,
      groupId: this.group?.value,
      musicInstruments: this.instrument?.value.map((val:any) =>({ id:val} as MusicInstrument)),
      genres: this.genre?.value.map((val:any) =>({ id:val} as Genre))
    };

    this.musicianService.updateMusician(musician)
    .subscribe(res => {
      this.router.navigate(['/musician', this.musicianId]);
    })
  }

  loadMusician(){
    this.musicianService.getMusician(this.musicianId)
    .subscribe(res => {
      this.form.controls["firstName"].setValue(res.firstName);
      this.form.controls["lastName"].setValue(res.lastName);
      this.form.controls["country"].setValue(res.country);
      this.form.controls["group"].setValue(res.groupId);
      this.form.controls["musicInstruments"].setValue(Array.from(res.musicInstruments, i => i.id));
      this.form.controls["genres"].setValue(Array.from(res.genres, g => g.id));
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
