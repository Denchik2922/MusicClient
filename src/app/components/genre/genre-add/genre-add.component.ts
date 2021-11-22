import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/models/Genre';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genre-add',
  templateUrl: './genre-add.component.html',
  styleUrls: ['./genre-add.component.css']
})
export class GenreAddComponent implements OnInit {

  public form: FormGroup;

  constructor(private genreService:  MusicApiService<Genre>,
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

    let genre: Genre = {
      id: 0,
      name: this.name?.value,
      description: this.description?.value,
    };

    this.genreService.addEntity(genre, environment.genreUrl)
    .subscribe(res => {
      this.router.navigate(['/genre']);
    })
  }

}
