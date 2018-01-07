import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { WriterComponent } from './writer/writer.component';
import { HomeComponent } from './home/home.component';
import { ReaderComponent } from './reader/reader.component';
import { AuthorListComponent } from './author-list/author-list.component';

const routes:Routes = [
    {path: '',redirectTo:'/home',pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'Writer', component: WriterComponent},
    {path: 'Reader', component: ReaderComponent},
    {path: 'AuthorList', component: AuthorListComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule {}
