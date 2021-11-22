import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre } from 'src/app/models/Genre';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {

  public genreId: number;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private avRoute: ActivatedRoute,
              private genreService: MusicApiService<Genre>) 
  { 

    if (this.avRoute.snapshot.params['id']) {
      this.genreId = this.avRoute.snapshot.params['id'];
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
    this.loadGenre();
  }

  edit(): void{
    if(!this.form.valid){
      return;
    } 

    let genre: Genre = {
      id: this.genreId,
      name: this.name?.value,
      description: this.description?.value,
    };

    this.genreService.updateEntity(genre, environment.genreUrl)
    .subscribe(res => {
      this.router.navigate(['/genre']);
    })
  }

  loadGenre(){
    this.genreService.getEntity(this.genreId, environment.genreUrl)
    .subscribe(res => {
      this.form.controls["name"].setValue(res.name);
      this.form.controls["description"].setValue(res.description);
    })
  }

}
