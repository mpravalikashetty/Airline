/**
 * @description       : CrewPassangerTrigger
**/
trigger CrewPassangerTrigger on CrewPassanger__c (before insert,before update){
    List<CrewPassanger__c> newList=Trigger.New;
    List<CrewPassanger__c> oldList=Trigger.old;
    if(Trigger.isInsert && Trigger.isBefore){
        for(CrewPassanger__c c: newList){
            if(c.Crew_Member__c!=null){
                Crew_Member__c cList=[Select Id,NoOf_Passangers_Assigned__c	 from Crew_Member__c where Id=:c.Crew_Member__c LImit 1];
                if(cList!=null){
                    if(cList.NoOf_Passangers_Assigned__c	!=null){
                        cList.NoOf_Passangers_Assigned__c	=cList.NoOf_Passangers_Assigned__c	+1;
                    }else{
                        cList.NoOf_Passangers_Assigned__c	=1;
                    }
                }
                update cList;
            }
        }
    }
} 
