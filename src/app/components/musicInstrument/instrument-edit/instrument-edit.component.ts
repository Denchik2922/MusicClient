import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicInstrument } from 'src/app/models/MusicInstrument';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';
import { MusicInstrumentsComponent } from '../music-instruments/music-instruments.component';

@Component({
  selector: 'app-instrument-edit',
  templateUrl: './instrument-edit.component.html',
  styleUrls: ['./instrument-edit.component.css']
})
export class InstrumentEditComponent implements OnInit {

  public instrumentId: number;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private avRoute: ActivatedRoute,
              private instrumentService: MusicApiService<MusicInstrument>) 
  { 

    if (this.avRoute.snapshot.params['id']) {
      this.instrumentId = this.avRoute.snapshot.params['id'];
    }

    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(20)]],
      });
  }
  
  get name() { return this.form.get('name'); }

  get description() { return this.form.get('description'); }

  ngOnInit(): void {
    this.loadInstrument();
  }

  edit(): void{
    if(!this.form.valid){
      return;
    } 

    let instrument: MusicInstrument = {
      id: this.instrumentId,
      name: this.name?.value,
      description: this.description?.value,
    };

    this.instrumentService.updateEntity(instrument, environment.instrumentUrl)
    .subscribe(res => {
      this.router.navigate(['/instrument']);
    })
  }

  loadInstrument(){
    this.instrumentService.getEntity(this.instrumentId, environment.instrumentUrl)
    .subscribe(res => {
      this.form.controls["name"].setValue(res.name);
      this.form.controls["description"].setValue(res.description);
    })
  }

}
