/**
 * @description       : customSearchSobjectLWC
**/
public with sharing class FlightSearch {
    @AuraEnabled(cacheable=true)
    public static list<Flights__c> getFlightList(string flightName) {
        list<Flights__c> flightListRecord = new list<Flights__c>();
        String tempName;
        if(String.isNotBlank(flightName)){
            tempName = String.escapeSingleQuotes(flightName.trim()) + '%';
        }
        for(Flights__c finObj : [Select Name,From__c,To__c,Starting_Time__c,Reaching_Time__c
                            From Flights__c
                            WHERE Name LIKE : tempName]){
           flightListRecord.add(finObj);
        }
        
         if(flightListRecord.size() == 0){
            throw new AuraHandledException('No Flights Found..'); 
         }
         
        return flightListRecord;
    }
    @AuraEnabled(cacheable=true)
    public static list<Crew_Member__c> getCrewList(string crewName,String flightName) {
        list<Crew_Member__c> crewListRecord = new list<Crew_Member__c>();
        String tempName;
        if(String.isNotBlank(crewName)){
            tempName = String.escapeSingleQuotes(crewName.trim()) + '%';
        }
        for(Crew_Member__c crewObj : [Select Name
                            From Crew_Member__c
                            WHERE Name LIKE : tempName and Flight__r.Name=:flightName]){
                                crewListRecord.add(crewObj);
        }
        
         if(crewListRecord.size() == 0){
            throw new AuraHandledException('No Crew Found..'); 
         }
         
        return crewListRecord;
    }
    @AuraEnabled(cacheable=true)
    public static List<SObject> gettingrecordId(string SObj,string Name) {
        if(SObj=='Crew_Member__c'){
        return [Select Id,Name,Age__c,Role__c,Flight__r.Name,Email__c from Crew_Member__c where Name=:Name Limit 1];
        }else{
            return [Select Id,Name,From__c,To__c,Starting_Time__c,Reaching_Time__c from Flights__c where Name=:Name Limit 1];   
        }
    }
    @AuraEnabled(cacheable=true)
    public static void bookFlight(){

    }
}