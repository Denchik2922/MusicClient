import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicAlbumsComponent } from 'src/app/components/musicAlbum/music-albums/music-albums.component';
import { MusicAlbumsAddComponent } from 'src/app/components/musicAlbum/music-albums-add/music-albums-add.component';
import { MusicAlbumsDetailComponent } from 'src/app/components/musicAlbum/music-albums-detail/music-albums-detail.component';
import { MusicAlbumsEditComponent } from 'src/app/components/musicAlbum/music-albums-edit/music-albums-edit.component';
import { AdminGuard } from 'src/app/guards/admin.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MusicAlbumsComponent },
      { path: 'add', component: MusicAlbumsAddComponent, canActivate: [AdminGuard] },
      { path: ':id', component: MusicAlbumsDetailComponent},
      { path: 'edit/:id', component: MusicAlbumsEditComponent, canActivate: [AdminGuard] },
    ])
  ]
})
export class MusicAlbumModule { }
