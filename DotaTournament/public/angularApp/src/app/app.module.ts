import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TournamentUpdateComponent } from './tournament-update/tournament-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TournamentComponent,
    TournamentDetailComponent,
    NotFoundComponent,
    TournamentUpdateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'tournaments',
        component: TournamentComponent,
      },
      {
        path: 'tournaments/:id',
        component: TournamentDetailComponent,
      },
      {
        path: 'tournaments/:id/update',
        component: TournamentUpdateComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
