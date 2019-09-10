import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule  } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { app } from 'firebase';

@Injectable({
    providedIn:'root'
})
export class FirebaseService{
    items: any;

    constructor(private http: HttpClient,public db: AngularFirestore){
        this.items = db.collection('/CurrencyData').snapshotChanges();
    }

    addRate(currency,rate){
        console.log("In the add Rate method");
        const id ="1";
        const myObj={};
        myObj[currency] = rate;
        
        this.db.collection('CurrencyData').doc(id).update(myObj);
    }

    getAllRates(){
        return this.items;
    }
}

