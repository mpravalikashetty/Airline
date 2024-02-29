import { LightningElement,api,track,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS =  [				
    'loginUser__c.Flight__c',
    'loginUser__c.Crew_Member__c', 
    'loginUser__c.Passanger__c'
];

export default class AppDataEntryPrimaryType extends LightningElement {

@api recordId;
@wire(getRecord, { recordId: '$recordId', fields:  FIELDS })

wiredRecord({ error, data }) {		
    if (data) {
    }
}
}