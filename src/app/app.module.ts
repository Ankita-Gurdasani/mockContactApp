import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './root/app.component';
import { ListComponent } from './list/list.component';
import { EditorComponent } from './editor/editor.component';

import {DataService} from './services/data.service';
import { FilterPipe } from './pipe/filter.pipe';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  { path: 'list/:pageNumber', component: ListComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'editor/:id', component: EditorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    EditorComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
