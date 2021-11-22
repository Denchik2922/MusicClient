import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicInstrument } from 'src/app/models/MusicInstrument';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';
import { MusicInstrumentsComponent } from '../music-instruments/music-instruments.component';

@Component({
  selector: 'app-instrument-add',
  templateUrl: './instrument-add.component.html',
  styleUrls: ['./instrument-add.component.css']
})
export class InstrumentAddComponent implements OnInit {

  public form: FormGroup;

  constructor(private instrumentService:  MusicApiService<MusicInstrument>,
              private formBuilder: FormBuilder,
              private router: Router) 
  { 
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(20)]],
      });
  }

  get name() { return this.form.get('name'); }

  get description() { return this.form.get('description'); }

  ngOnInit(): void {}

  add(): void{
    if(!this.form.valid){
      return;
    } 

    let instrument: MusicInstrument = {
      id: 0,
      name: this.name?.value,
      description: this.description?.value,
    };

    this.instrumentService.addEntity(instrument, environment.instrumentUrl)
    .subscribe(res => {
      this.router.navigate(['/instrument']);
    })
  }
}
