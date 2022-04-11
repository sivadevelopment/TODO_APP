import { LightningElement, track, wire } from 'lwc';
import getTasks from '@salesforce/apex/TODOListController.getTasks';
import { refreshApex } from '@salesforce/apex';
import insertTask from '@salesforce/apex/TODOListController.insertTask';
import deleteTask from '@salesforce/apex/TODOListController.deleteTask';

export default class Todo extends LightningElement {

newTask='';
@track
todoTasks=[];
todoTaskResponse;

updateNewTask(event){
  //newTask=  event.target;
  console.log(event.target.value);
   this.newTask=event.target.value;
 
}

addHandler(){
 insertTask({subject:this.newTask}).then(result=>{
     console.log(result);
     //unshift
      this.todoTasks.push({
      id: this.todoTasks.length+1,
      name:this.newTask,
      recordId:result.Id

        });
      this.newTask='';
  }).catch(error=>{
     console.log(error);
  });

  
}

deleteHandler(event){
  console.log('deleteHandler');
  let todoDeleteItem=event.target.name;
   let matchedItemIndex;
   let todoTasks=this.todoTasks;
   let recordIdToDelete;
    for (let i = 0; i < todoTasks.length; i++) {
      if(todoDeleteItem==todoTasks[i].id){
          matchedItemIndex=i;
          recordIdToDelete=todoTasks[i].recordId;
          console.log(recordIdToDelete);
        }
    }
    

  /*this.todoTasks.splice(todoTasks.findIndex(function(todoTask){
     return todoTask.id==todoDeleteItem;
  }),1);
  */

  deleteTask({recordID:recordIdToDelete}).then(result =>{
    console.log('delete status', result);
     this.todoTasks.splice(matchedItemIndex, 1);
  }).catch(error=>{

  });

  //this.todoTasks.splice(todoTasks.findIndex(todoTask => todoTask.id==todoDeleteItem),1);
  console.log(JSON.stringify(todoTasks));
}

@wire(getTasks) 
//getTodoTasks({data, erro}){
 getTodoTasks(response){
   this.todoTaskResponse=response;
   let data=response.data;
   let error=response.eror;
  if(data){
    console.log('data');
     console.log(data);
     this.todoTasks=[];
data.forEach(task => {
  this.todoTasks.push({
     id:this.todoTasks.length + 1,
     name :task.Subject,
     recordId:task.Id
  }
  );
});

  }else if(error){
     console.log('error');
     console.log(error);
  }
}

refreshTODOList(){
  refreshApex(this.todoTaskResponse);
}


}