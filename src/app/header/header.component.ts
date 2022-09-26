import { Component, OnInit } from '@angular/core';
import { Camp } from '../interface/camp';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  a: any = {
    name: "sss"
  }
  // inputa: any;
  // values = [true, false, 'true', 'false', 'TRUE', 'FALSE', 'sampletext', 1, undefined, null, (() => { }), {}, []];
  constructor() {
    console.log(this.a)
  }

  ngOnInit() {

  }
  dataType() {
    // let inputa=parseInt(document.getElementById("number").value);
    // if (this.inputa === "boolean") {
    //   console.log(this.values);
    // }
    // if (this.inputa === true || this.inputa === false) {
    //   console.log(this.values);
    //   // variable is of Boolean type.
    // }
    //   else if(inputa="str"){
    //    console.log( inputa);
    //   }

    //  else if(inputa=function(){}){
    //   console.log( inputa);
    //   }
    //  else if(inputa= true){
    //   console.loginputa);
    //   }
    //  else if(inputa= null){
    //   console.log( inputa);
    //   }
    //  else if(inputa=234n){
    //   console.log(bigint);
    //   }
    //     else{
    //         inputa = {name:"John", age:30, city:"New York"}
    //     console.log(inputa);
    //   }
    // }
  }

  isBoolean = (val: any) => {
    const boolValuesRegex = /true|false/; // Add other /true|false|1|0|on|off/
    if (val === undefined || val === null) return false;
    return boolValuesRegex.test(val.toString().toLowerCase());
  }
}
