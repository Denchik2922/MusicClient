import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Group } from 'src/app/models/Group';
import { Musician } from 'src/app/models/Musician';
import { AuthService } from 'src/app/services/auth.service';
import { GroupService } from 'src/app/services/group.service';
import { MusicianService } from 'src/app/services/musician.service';

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

  constructor(private musicianService:MusicianService,
              private groupService:GroupService,
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
    this.groupService.getGroup(this.musician.groupId)
    .subscribe(res => {
      this.group = res;
    })
  }

  loadMusician(){
    this.musicianService.getMusician(this.musicianId)
    .subscribe(res => {
      this.musician = res;
      this.loadGroup();
    })
  }

  deleteMusician(){
    const ans = confirm('Are you shure you want to delete this Musician?');
    if (ans) {
      this.musicianService.deleteMusician(this.musicianId)
      .subscribe(res => {
        this.route.navigate(["/"]);
      })
    }
  }

}
