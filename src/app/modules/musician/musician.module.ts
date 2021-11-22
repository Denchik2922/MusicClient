import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { MusiciansComponent } from 'src/app/components/musician/musicians/musicians.component';
import { MusicianAddComponent } from 'src/app/components/musician/musician-add/musician-add.component';
import { MusicianDetailComponent } from 'src/app/components/musician/musician-detail/musician-detail.component';
import { MusicianEditComponent } from 'src/app/components/musician/musician-edit/musician-edit.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component:  MusiciansComponent },
      { path: 'add', component:  MusicianAddComponent, canActivate: [AdminGuard] },
      { path: ':id', component:  MusicianDetailComponent},
      { path: 'edit/:id', component:  MusicianEditComponent, canActivate: [AdminGuard] },
    ])
  ],
  declarations: []
})
export class MusicianModule { }
