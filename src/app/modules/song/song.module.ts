import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SongsComponent } from 'src/app/components/song/songs/songs.component';
import { SongAddComponent } from 'src/app/components/song/song-add/song-add.component';
import { SongEditComponent } from 'src/app/components/song/song-edit/song-edit.component';
import { AdminGuard } from 'src/app/guards/admin.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component:  SongsComponent },
      { path: 'add', component: SongAddComponent, canActivate: [AdminGuard] },
      { path: 'edit/:id', component: SongEditComponent, canActivate: [AdminGuard] },
    ])
  ]
})
export class SongModule { }
