import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups: Observable<Group[]>;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private groupService:MusicApiService<Group>,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(){
    this.groups = this.groupService.getEntities(environment.groupUrl);
  }
}
