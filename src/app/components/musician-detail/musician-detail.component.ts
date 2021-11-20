import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { Musician } from 'src/app/models/Musician';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html',
  styleUrls: ['./musician-detail.component.css']
})
export class MusicianDetailComponent implements OnInit {
  public musicianId:number;
  public musician: Musician;
  public groupId: number;
  public group: Group;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private musicianService:MusicApiService<Musician>,
              private groupService:MusicApiService<Group>,
              private avRoute: ActivatedRoute,
              private route: Router,
              private authService: AuthService){
    if (this.avRoute.snapshot.params['id']) {
      this.musicianId = this.avRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadMusician();
  }

  loadGroup(){
    this.groupService.getEntity(this.musician.groupId, environment.groupUrl)
    .subscribe(res => {
      this.group = res;
    })
  }

  loadMusician(){
    this.musicianService.getEntity(this.musicianId, environment.musicianUrl)
    .subscribe(res => {
      this.musician = res;
      this.loadGroup();
    })
  }

  deleteMusician(){
    const ans = confirm('Are you shure you want to delete this Musician?');
    if (ans) {
      this.musicianService.deleteEntity(this.musicianId, environment.musicianUrl)
      .subscribe(res => {
        this.route.navigate(["/"]);
      })
    }
  }

}
