import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c'
import CATEGORY_FELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FELD from '@salesforce/schema/Car__c.Make__c'
// lightning Message Service and a message channel 
import CARS_FILTERED_MESSAGE_CHANNEL from '@salesforce/messageChannel/carsFiltered__c';
import {MessageContext, publish} from 'lightning/messageService';

//constants
const CATEGORY_ERROR='Error Loading categories';
const MAKE_ERROR='Error Loading Make';

export default class CarFilter extends LightningElement {

    categoryError=CATEGORY_ERROR;
    makeError=MAKE_ERROR;

    filters={
        searchKey:'',
        maxPrice:999999
    }

    /* load context for LMS */
    @wire(MessageContext)
    messageContext;

    timer;

   
    carObjectInfo;
    /* fetching Category picklist*/
    @wire(getObjectInfo, {objectApiName: CAR_OBJECT})
    getCarObjectInfo(response){
        this.carObjectInfo=response;
        if(response.data){
            console.log(response.data.defaultRecordTypeId);
            console.log(response.data);
        } 
        else if(response.error){
            console.log(response.error);
           
        }else{
             console.log('No data loading please check getCarObjectInfo call');
        }
     }

    
    categories;
     @wire(getPicklistValues, {
         recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
         fieldApiName:CATEGORY_FELD
     })
     getCategories(response){
        this.categories=response;
        if(response.data){
            console.log(response.data);
        } 
         else if(response.error) {
            console.log(response.error);
        }
          console.log('No data loading please check getCategories call');   
     }
     

     
     
     makeTypes;
     /* fetching Make picklist*/
     @wire(getPicklistValues, {
         recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
         fieldApiName:MAKE_FELD
     })
     getMakeTypes(response){
         this.makeTypes=response;
         if(response.data){
            console.log(response.data);
        } 
         else if(response.error) {
            console.log(response.error);
        }else{
            console.log('No data loading please check getMakeTypes call');
        }
     }
     

     

     

   /*  Search Key Handler      */
    handleSearchKeyChange(event){
       console.log(event.target.value);
       this.filters={...this.filters, "searchKey":event.target.value};
       this.sendDataToCarList();
    }

    /*  Price Change Handler      */
    handleMaxPriceChange(event){

       console.log(event.target.value);
       this.filters={...this.filters, "maxPrice":event.target.value};
        this.sendDataToCarList();
       
    }

    handleCheckBox(event){

       if(!this.filters.categories){
           const categories=this.categories.data.values.map(item=> item.value);
           const makeTypes=this.makeTypes.data.values.map(item=> item.value);
           this.filters={...this.filters, categories, makeTypes};
       }

        const {name, value} =event.target.dataset;
       if(event.target.checked){
            if(!this.filters[name].includes(value)){
                this.filters[name] = [...this.filters[name], value]
            }
        } else {
            this.filters[name] =  this.filters[name].filter(item=>item !==value)
        }
        this.sendDataToCarList()

    }



    sendDataToCarList(){
        window.clearTimeout(this.timer);
          this.timer = window.setTimeout(()=>{
            publish(this.messageContext,CARS_FILTERED_MESSAGE_CHANNEL,{filters:this.filters})
        }, 400);
     }


}