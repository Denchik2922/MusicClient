import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupsComponent } from 'src/app/components/group/groups/groups.component';
import { GroupAddComponent } from 'src/app/components/group/group-add/group-add.component';
import { GroupDetailComponent } from 'src/app/components/group/group-detail/group-detail.component';
import { GroupEditComponent } from 'src/app/components/group/group-edit/group-edit.component';
import { AdminGuard } from 'src/app/guards/admin.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GroupsComponent },
      { path: 'add', component: GroupAddComponent, canActivate: [AdminGuard] },
      { path: ':id', component: GroupDetailComponent},
      { path: 'edit/:id', component: GroupEditComponent, canActivate: [AdminGuard] },
    ])
  ]
})
export class GroupModule { }
