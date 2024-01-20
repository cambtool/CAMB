import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoaderService } from './Loader.service';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: APP_BASE_HREF, useValue: '/CAMB/' }]
})
export class AppComponent {
  constructor(public loaderService: LoaderService, private http: HttpClient) { }
  title = 'CAMB';
}
