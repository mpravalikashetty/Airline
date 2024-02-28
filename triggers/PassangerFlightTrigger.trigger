/**
 * @description       : PassangerFlightTrigger
**/
trigger PassangerFlightTrigger on PassangerFlight__c (before insert,before update){
    List<PassangerFlight__c> newList=Trigger.New;
    List<PassangerFlight__c> oldList=Trigger.old;
    if(Trigger.isInsert && Trigger.isBefore){
        for(PassangerFlight__c c: newList){
            if(c.Flight__c!=null){
                Flights__c fList=[Select Id,NoOf_Passangers_Booked__c from Flights__c where Id=:c.Flight__c LImit 1];
                if(fList!=null){
                    if(fList.NoOf_Passangers_Booked__c	!=null){
                        fList.NoOf_Passangers_Booked__c	=fList.NoOf_Passangers_Booked__c	+1;
                    }else{
                        fList.NoOf_Passangers_Booked__c	=1;
                    }
                }
                update fList;
            }
        }
    } 
}