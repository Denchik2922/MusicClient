import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Musician } from 'src/app/models/Musician';
import { MusicianService } from 'src/app/services/musician.service';

@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html',
  styleUrls: ['./musician-detail.component.css']
})
export class MusicianDetailComponent implements OnInit {
  public musicianId:number
  public musician: Musician;
  public result: any;

  constructor(private musicianService:MusicianService,
              private avRoute: ActivatedRoute){
    if (this.avRoute.snapshot.params['id']) {
      this.musicianId = this.avRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadMusician();
  }

  loadMusician(){
    this.musicianService.getMusician(this.musicianId)
    .subscribe(res => {
      this.musician = res;
    })
  }

  deleteMusician(){
    this.musicianService.deleteMusician(this.musicianId)
    .subscribe(res => {
      this.result = res;
    })
  }

}
