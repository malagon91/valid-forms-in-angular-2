import {Component, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/filter";

@Component({
  selector: 'my-app',
  styles:[`
.ng-invalid{
    border: 3px solid red;
}
.ng-valid{
    border: 3px solid green;
}
.ng-invalid + label:after{
    content: '<--Pick one!!!'
}
`],
  template: `
<form 
    #formRef="ngForm" 
    (ngSubmit)="onSubmit(formRef.value)">
<fieldset ngmodelgroup="login">
    <input required type="text" [(ngModel)]="username" #usernameRef="ngModel" minlength="3" name="username">
     <div *ngIf="usernameRef.errors?.required">this field is required</div>
      <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {{usernameRef.errors?.minlength.requiredLength}} characters. 
      You only typed {{usernameRef.errors?.minlength.actualLength}}</div>
      <input type="password" ngModel name="password">
</fieldset>
   <button type="submit">Submit</button>
   {{formRef.value | json}}
   {{formRef.valid | json}}
   
        <div *ngFor="let location of locations">
        <input 
            [attr.id]="location"
            name="location"
            [ngModel]="locations[0]"
            [value]="location"
            type="radio"
            required
        >
        <label [attr.for]="location">{{location}}</label>
    </div>
        <select name="location" [ngModel]="locations[0]">
        <option 
            *ngFor="let location of locations"
            [value]="location">
            
            {{location}}
            
        </option>
    </select>
</form>
`,
})
export class AppComponent  {
  @ViewChild('formRef') form: any;
  username = 'john';
  locations = ["Home", "Away", "Space", "Ocean", "Stars"];

  onSubmit(formValue:any){
    console.log(formValue);
  }
  ngAfterViewInit(){//Ejemplo de uso de observables al cambiar un formulario
    Observable.combineLatest(
      this.form.statusChanges,
      this.form.valueChanges,
      (status, value)=> ({status, value}))
      .filter(({status})=> status === 'VALID')
      .subscribe(({value})=> console.log(value))
  }
}



/* this form if valid only one input in other example  i valid one form
* <input required type="text" [(ngModel)]="username" #usernameRef="ngModel" minlength="3">
 <div *ngIf="usernameRef.errors?.required">this field is required</div>
 <div *ngIf="usernameRef.errors?.minlength">This field must be longer than {{usernameRef.errors?.minlength.requiredLength}} characters.
 You only typed {{usernameRef.errors?.minlength.actualLength}}</div>
*
* */
