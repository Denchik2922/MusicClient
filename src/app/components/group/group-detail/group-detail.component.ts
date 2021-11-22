import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { Musician } from 'src/app/models/Musician';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  public groupId: number;
  public group: Group;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private groupService:MusicApiService<Group>,
              private avRoute: ActivatedRoute,
              private route: Router,
              private authService: AuthService){
    if (this.avRoute.snapshot.params['id']) {
      this.groupId = this.avRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadGroup();
  }

  loadGroup(){
    this.groupService.getEntity(this.groupId, environment.groupUrl)
    .subscribe(res => {
      this.group = res;
    })
  }

  deleteGroup(){
    const ans = confirm('Are you shure you want to delete this Group?');
    if (ans) {
      this.groupService.deleteEntity(this.groupId, environment.groupUrl)
      .subscribe(res => {
        this.route.navigate(["/group"]);
      })
    }
  }
}
