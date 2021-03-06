import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, timer, combineLatest, from, of,Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, debounceTime, startWith, timeInterval, shareReplay } from 'rxjs/operators';
import {catchError, tap} from 'rxjs/operators';

const CACHE_SIZE = 3;
@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {
  public rates:[];
 // private cache$ : Observable<RealtimeCurrencyExchangeRate>;
  constructor(private httpClient: HttpClient) {}

  
  private readonly refreshToken$ =timer(0,60000);
  get _refreshToken$(){
    return this.refreshToken$;
  }
  
  //Refreshing twice in 60s
  // public get(currency: string): Observable<RealtimeCurrencyExchangeRate> {
  //    return this.refreshToken$.pipe(
  //    switchMap(()=>this.httpClient.get<RealtimeCurrencyExchangeRate>(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=YTQ55M6DYDOMLOCW`)));
      
  // } 

  //Refreshing once in 60 s
  public get(currency: string): Observable<RealtimeCurrencyExchangeRate> {
    return this.httpClient.get<RealtimeCurrencyExchangeRate>(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=YTQ55M6DYDOMLOCW`);
     
  }
//Add items to the array for caching all 3
  // public getCachedRate(currency: string){
  //   if(!this.cache$){
  //     console.log(currency);
  //     this.cache$ = this.get(currency).pipe(shareReplay(CACHE_SIZE));
  //   }
  //   return this.cache$;
  // }

  public responseCache = new Map();
  public getCachedList(currency:string): Observable<any> {
    console.log("From the cachedList Method:",currency);
    const ratesFromCache = this.responseCache.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=YTQ55M6DYDOMLOCW`);
    if (ratesFromCache) {
      
      return of(ratesFromCache);
    }
    const response=  this.httpClient.get<any>(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=YTQ55M6DYDOMLOCW`)
                          .pipe(
                              tap(
                                rates => this.responseCache.set(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=YTQ55M6DYDOMLOCW`, rates)                         
                                )
                          );
    return response;
  }

}

export interface RealtimeCurrencyExchangeRate {
  "Realtime Currency Exchange Rate": RealtimeCurrencyExchangeRateResult;
}



export class RealtimeCurrencyExchangeRateResult {
'1. From_Currency Code': string;
'2. From_Currency Name': string;
'3. To_Currency Code': string;
'4. To_Currency Name': string;
'5. Exchange Rate': string;
'6. Last Refreshed': Date;
'7. Time Zone': string;
'8. Bid Price': string;
'9. Ask Price': string;
}
