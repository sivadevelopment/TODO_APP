/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 04-11-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class TODOListController {

    
   @AuraEnabled(cacheable=true)
   public static List<Task> getTasks(){
     
        return [select Subject from task WHERE OwnerId =:UserInfo.getUserId() ];  
   } 

   @AuraEnabled
   public static Task insertTask(String subject){
       try {
           Task task = new Task(
               Subject=subject,
               OwnerId=UserInfo.getUserId(),
               Status='Not Started',
               Priority='Normal'
           );
           insert task;
           return task;
       } catch (Exception e) {
           System.debug(e.getMessage());
       }
       return null;
   }

   @AuraEnabled
   public static Boolean deleteTask(Id recordID){
       try { 
        Database.delete(recordID);
        return true;
       } catch (Exception e) {
           //throw new AuraHandledException(e.getMessage());
           System.debug(e.getMessage());
       }
       return false;
   }

   
  
}
