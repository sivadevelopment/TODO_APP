import { api, LightningElement } from 'lwc';

export default class CarTile extends LightningElement {

    @api
    car={};

    handleclick(){
      this.dispatchEvent(new CustomEvent('selected',{
          detail:this.car.Id
      }))
    }

}