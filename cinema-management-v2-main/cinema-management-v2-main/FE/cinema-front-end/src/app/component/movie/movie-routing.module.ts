import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {MovieDetailComponent} from '../home/movie-detail/movie-detail.component';
import {ListPremiereComponent} from '../home/list-premiere/list-premiere.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {AuthGuard} from '../decentralization/auth.guard';

const routes: Routes = [
  {
    path: 'list/premiere', component: ListPremiereComponent
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    },
    component: MovieListComponent
  },
  {
    path: 'add',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    },
    component: AddMovieComponent
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_EMPLOYEE']
    },
    component: EditMovieComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
