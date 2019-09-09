import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from '../alpha-vantage.service';
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

  constructor(private alphaVantageService: AlphaVantageService) { }
/* Final -Edited*/
  ngOnInit() {
    this.alphaVantageService._refreshToken$.subscribe(()=>
    {
      this.alphaVantageService.get(this.currency).subscribe(result => {
        this.rate = result['Realtime Currency Exchange Rate']['5. Exchange Rate'];
        console.log(result);
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
