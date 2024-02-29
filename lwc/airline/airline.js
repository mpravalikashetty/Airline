import { LightningElement,track,api} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getFlightList from '@salesforce/apex/FlightSearch.getFlightList';
import getCrewList from '@salesforce/apex/FlightSearch.getCrewList';
import getPassList from '@salesforce/apex/FlightSearch.getPassList';
import bookFlight from '@salesforce/apex/FlightSearch.bookFlight';
import { NavigationMixin } from 'lightning/navigation';
import gettingrecordId from '@salesforce/apex/FlightSearch.gettingrecordId';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
 
export default class customSearch extends NavigationMixin(LightningElement){
    @api recordId;
    @track flightsRecord;
    @track crewRecord;
    @track passangarRecord;
    @track passRecord;
    @track flightSelected='';
    @track crewSelected='';
    @track passangerSelected='';
    @track flightDetail;
    @track crewDetail;
    @track passangerDetail;
    @track showFlight=false;
    @track showCrew=false;
    @track showPassanger=false;
    @track flightRecordId;
    @track crewRecordId;
    @track passRecordId;
    handleFLightSearch(event) {
        this.flightSelected=event.target.value;
        if (this.flightSelected !== '') {
            getFlightList({
                flightName: this.flightSelected
                })
                .then(result => {
                    console.log('result--->',result);
                    if(result!=null && result!=''){
                        console.log('26');
                        this.flightsRecord = result;
                        this.template.querySelector('[data-id="flightSelected"]').classList.add('slds-is-open');
                    }else{
                        console.log('30');
                        this.flightsRecord = [];
                       this.template.querySelector('[data-id="flightSelected"]').classList.remove('slds-is-open');
                    }
                })
                .catch(error => {
                   console.log('error',error);
                    this.flightsRecord = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Enter Flight Name...',
            });
            this.dispatchEvent(event);
        }
    }
    onFlightSelect(event){
        this.flightSelected   = event.currentTarget.dataset.value;
        this.template.querySelector('[data-id="flightSelected"]').classList.remove('slds-is-open');
        console.log('49--->',this.flightSelected)
        gettingrecordId({
            SObj:'Flights___c',
            Name: this.flightSelected 
        }) .then(result => {
        console.log('54--->',result);
        if(result!=null && result!=''){
            this.flightRecordId=result[0].Id;
           /* this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: this.flightRecordId,
                    objectApiName: 'Flights__c',
                    actionName: 'view'
                }
            });*/
            this.flightDetail=result;
            this.showFlight=true;
         }
        })
    }
    handleCrewSearch(event) {
        this.crewSelected=event.target.value;
        if (this.crewSelected !== '') {
            getCrewList({
                crewName: this.crewSelected,
                flightName:this.flightSelected
                })
                .then(result => {
                    console.log('result1--->',result);
                    if(result!=null && result!=''){
                        console.log('59');
                        this.crewRecord = result;
                        this.template.querySelector('[data-id="crewSelected"]').classList.add('slds-is-open');
                    }else{
                        console.log('63');
                        this.crewRecord = [];
                       this.template.querySelector('[data-id="crewSelected"]').classList.remove('slds-is-open');
                    }
                })
                .catch(error => {
                   console.log('error',error);
                    this.crewRecord = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Enter Crew Name...',
            });
            this.dispatchEvent(event);
        }
    }
    onCrewSelect(event){
        this.crewSelected   = event.currentTarget.dataset.value;
        console.log('82S--->',this.crewSelected)
        this.template.querySelector('[data-id="crewSelected"]').classList.remove('slds-is-open');
        gettingrecordId({
            SObj:'Crew_Member__c',
            Name: this.crewSelected 
    }) .then(result => {
        console.log('89--->'+result);
        if(result!=null && result!=''){
            this.crewRecordId=result[0].Id;
            /*this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.crewRecordId,
                objectApiName: 'Crew_Member__c',
                actionName: 'view'
            }
        });*/
            this.crewDetail=result;
            this.showCrew=true;
        }
        })
    }
    handlePassangerSearch(event){
        this.passangerSelected=event.target.value;
        if (this.passangerSelected !== '') {
            getPassList({
                passName: this.passangerSelected,
                })
                .then(result => {
                    console.log('result1--->',result);
                    if(result!=null && result!=''){
                        console.log('59');
                        this.passangarRecord = result;
                        this.template.querySelector('[data-id="passangerSelected"]').classList.add('slds-is-open');
                    }else{
                        console.log('63');
                        this.passangarRecord = [];
                       this.template.querySelector('[data-id="passangerSelected"]').classList.remove('slds-is-open');
                    }
                })
                .catch(error => {
                   console.log('error',error);
                    this.passangarRecord = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Enter Passanger Name...',
            });
            this.dispatchEvent(event);
        }

    }
    onPassangarSelect(event){
        this.passangerSelected   = event.currentTarget.dataset.value;
        console.log('155--->',this.crewSelected)
        this.template.querySelector('[data-id="passangerSelected"]').classList.remove('slds-is-open');
        gettingrecordId({
            SObj:'Passanger__c',
            Name: this.passangerSelected 
    }) .then(result => {
        console.log('161--->'+result);
        if(result!=null && result!=''){
            this.passRecordId=result[0].Id;
            /*this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.passRecordId,
                objectApiName: 'Passanger__c',
                actionName: 'view'
            }
        });*/
            this.passangerDetail=result;
            this.showPassanger=true;
        }
        })
        /*this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.passRecordId,
                objectApiName: 'Passanger__c',
                actionName: 'view'
            }
        });*/
    }
    onBook(){
        console.log('170-->'+this.passRecordId+'c'+this.crewRecordId+'f'+this.flightRecordId);
        bookFlight({
            passanger: this.passRecordId,
            crew:this.crewRecordId,
            flight:this.flightRecordId
        }).then(result => {
            if(this.result=='Fail'){
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: result,
                });
                this.dispatchEvent(event); 
            }else{
                const event = new ShowToastEvent({
                    title: 'Success',
                    variant: 'success',
                    message: result,
                });
                this.dispatchEvent(event); 
            }
        }) .catch(error => {
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);  
        });
    }
}