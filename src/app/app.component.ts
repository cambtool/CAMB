import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoaderService } from './Loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public loaderService: LoaderService, private http: HttpClient) { }
  title = 'CAMB';
}
