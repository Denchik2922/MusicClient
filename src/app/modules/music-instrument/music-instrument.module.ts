import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicInstrumentsComponent } from 'src/app/components/musicInstrument/music-instruments/music-instruments.component';
import { InstrumentAddComponent } from 'src/app/components/musicInstrument/instrument-add/instrument-add.component';
import { InstrumentEditComponent } from 'src/app/components/musicInstrument/instrument-edit/instrument-edit.component';
import { AdminGuard } from 'src/app/guards/admin.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MusicInstrumentsComponent },
      { path: 'add', component: InstrumentAddComponent, canActivate: [AdminGuard] },
      { path: 'edit/:id', component: InstrumentEditComponent, canActivate: [AdminGuard] },
    ])
  ]
})
export class MusicInstrumentModule { }
