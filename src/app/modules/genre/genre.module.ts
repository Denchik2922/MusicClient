import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenresComponent } from 'src/app/components/genre/genres/genres.component';
import { GenreAddComponent } from 'src/app/components/genre/genre-add/genre-add.component';
import { GenreEditComponent } from 'src/app/components/genre/genre-edit/genre-edit.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component:  GenresComponent },
      { path: 'add', component: GenreAddComponent, canActivate: [AdminGuard] },
      { path: 'edit/:id', component: GenreEditComponent, canActivate: [AdminGuard] },
    ])
  ]
})
export class GenreModule { }
