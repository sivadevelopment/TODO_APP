import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import DESCRIPION_FIELD from '@salesforce/schema/Car__c.Description__c'
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c'
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c'
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import NUMBER_OF_SEATS from '@salesforce/schema/Car__c.Number_of_Seats__c'
import PICTURE_URL from '@salesforce/schema/Car__c.Picture_URL__c'

import { getFieldValue } from 'lightning/uiRecordApi';


export default class CarCard extends LightningElement {

    // exposing fields to make them available in the template
    name_field=NAME_FIELD;
    picture_URL=PICTURE_URL;
    //id_field=ID_FIELD;

    description_field=DESCRIPION_FIELD;
    category_field=CATEGORY_FIELD;
    fuel_field=FUEL_FIELD;
    control_field=CONTROL_FIELD;
    msrp_field= MSRP_FIELD;
    make_field=MAKE_FIELD;
    number_of_seats=NUMBER_OF_SEATS;
   
    recordId='a00N000000R5nrRIAR';

    carName;
    carPicture;

    onLoadHandler(event){
        const {records} =event.detail;
        const recordData=records[this.recordId];
        this.carName=getFieldValue(recordData, NAME_FIELD);
        this.carPicture=getFieldValue(recordData, PICTURE_URL);

    }

}