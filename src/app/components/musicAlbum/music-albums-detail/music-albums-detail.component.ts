import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { MusicAlbum } from 'src/app/models/MusicAlbum';
import { AuthService } from 'src/app/services/auth.service';
import { MusicApiService } from 'src/app/services/music-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-music-albums-detail',
  templateUrl: './music-albums-detail.component.html',
  styleUrls: ['./music-albums-detail.component.css']
})
export class MusicAlbumsDetailComponent implements OnInit {

  public albumId: number;
  public album: MusicAlbum;
  public group: Group;

  public get isAdmin(): boolean{
    return this.authService.isAdmin();
  }

  constructor(private albumService:MusicApiService<MusicAlbum>,
              private groupService:MusicApiService<Group>,
              private avRoute: ActivatedRoute,
              private route: Router,
              private authService: AuthService){
    if (this.avRoute.snapshot.params['id']) {
      this.albumId = this.avRoute.snapshot.params['id'];
    }
  }

  ngOnInit(): void {
    this.loadAlbum();
  }

  loadAlbum(){
    this.albumService.getEntity(this.albumId, environment.albumUrl)
    .subscribe(res => {
      this.album = res;
      this.loadGroup();
    })
  }

  loadGroup(){
    this.groupService.getEntity(this.album.groupId, environment.groupUrl)
    .subscribe(res => {
      this.group = res;
    })
  }

  deleteAlbum(){
    const ans = confirm('Are you shure you want to delete this Album?');
    if (ans) {
      this.albumService.deleteEntity(this.albumId, environment.albumUrl)
      .subscribe(res => {
        this.route.navigate(["/album"]);
      })
    }
  }
}
