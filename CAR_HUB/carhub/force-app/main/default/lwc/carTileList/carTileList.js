import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/CarController.getCars';
// lightning Message Service and a message channel 
import CARS_FILTERED_MESSAGE_CHANNEL from '@salesforce/messageChannel/carsFiltered__c';
import {MessageContext, subscribe} from 'lightning/messageService';
export default class CarTileList extends LightningElement {

    cars;
    carDataError;
    filters={};
    carFilterSubscription;

    /* load context for LMS */
    @wire(MessageContext)
    messageContext;


    @wire(getCars, {filters: '$filters'})
    getCarsData({ error, data }) {
      if (data) {
          this.cars=data;
        console.log('Data', data);
      } else if (error) {
        console.error('Error:', error);
        this.carDataError=error;
      }
    }

    connectedCallback(){
      this.subscribeHandler();
    }

    subscribeHandler(){ 
      this.carFilterSubscription=subscribe(this.messageContext, CARS_FILTERED_MESSAGE_CHANNEL, (message)=>this.messageHandler(message));
    }

   messageHandler(message){
     console.log(this.filters=message.filters);
     this.filters ={...message.filters};
   }

      handleOnselected(event){
        console.log('selected ID', event.detail)
      }

}