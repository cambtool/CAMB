import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camp } from '../interface/camp';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router : Router) {

  }

  ngOnInit() {

  }
  dataformatring(){
    this.router.navigate(['dataFormatting',]);
  }
  dataAnalysis(){
    this.router.navigateByUrl('dataAnalysis');
  }

}



