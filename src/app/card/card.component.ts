import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';
import { FirebaseService } from '../firebase.service';
import { HttpBackend } from '@angular/common/http';
import { isError } from 'util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
//import { interval } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public currency: string;

  public rate: string;
 

//  interval:any;

  constructor(private alphaVantageService: AlphaVantageService,private firebasedb:FirebaseService) { 
 
     
  }

  ngOnInit() {
    this.alphaVantageService._refreshToken$.subscribe(()=>
    {
      this.alphaVantageService.getCachedList(this.currency).subscribe(result => {
        if(this.currency == "CAD"){
          try{
            this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            this.firebasedb.addRate(this.currency,this.rate);
          }catch(error){
            this.firebasedb.getAllRates().subscribe(result=>{
              result.forEach(element => {
                console.log(element.payload.doc._document.proto.fields.CAD.stringValue);
                this.rate = element.payload.doc._document.proto.fields.CAD.stringValue;

              })
            });
          }
        }

        if(this.currency == "JPY"){
          try{
            this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            this.firebasedb.addRate(this.currency,this.rate);
          }catch(error){
            this.firebasedb.getAllRates().subscribe(result=>{
              result.forEach(element => {
                console.log(element.payload.doc._document.proto.fields.JPY.stringValue);
                this.rate = element.payload.doc._document.proto.fields.JPY.stringValue;
  
              })
            });
          }
        }
        if(this.currency == "EUR"){
          try{
            this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
            this.firebasedb.addRate(this.currency,this.rate);
          }catch(error){
            this.firebasedb.getAllRates().subscribe(result=>{
              result.forEach(element => {
                console.log(element.payload.doc._document.proto.fields.EUR.stringValue);
                this.rate = element.payload.doc._document.proto.fields.EUR.stringValue;
  
              })
            });
          }
        }
      });

    });
  }




/*Refreshing Attempt */
  // ngOnInit() {
  //   interval(60000).pipe(startWith(0),
  //   switchMap(()=>this.alphaVantageService.get(this.currency))).subscribe(result => {
  //     this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  //   });
  // // }
  
/*Refreshing Attempt */  
  // ngOnInit() {
  //   setInterval(()=>
  //   {  
  //     this.alphaVantageService.get(this.currency).subscribe(result => {
  //       this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  //     })
  //   },6000);
  // }


}
