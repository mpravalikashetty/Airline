import { LightningElement,track} from 'lwc';
// import server side apex class method 
import getFlightList from '@salesforce/apex/FlightSearch.getFlightList';
import getCrewList from '@salesforce/apex/FlightSearch.getCrewList';
import bookFlight from '@salesforce/apex/FlightSearch.bookFlight';
import { NavigationMixin } from 'lightning/navigation';
import gettingrecordId from '@salesforce/apex/FlightSearch.gettingrecordId';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
 
export default class customSearch extends NavigationMixin(LightningElement) {
    
    @track flightsRecord;
    @track crewRecord;
    @track flightSelected='';
    @track crewSelected='';
    @track flightDetail;
    @track  crewDetail;
    @track showFlight=false;
    @track showCrew=false;
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
                message: 'Search text missing..',
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
                message: 'Search text missing..',
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
        console.log('89--->',result);
        if(result!=null && result!=''){
            this.crewDetail=result;
            this.showCrew=true;
        }
        })
    }
    onBook(event){
        console.log('hehe',event.data.value);
        console.log('Booked');
        bookFlight({}).then(result => {
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