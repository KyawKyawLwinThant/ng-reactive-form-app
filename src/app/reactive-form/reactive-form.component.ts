import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, map, tap} from 'rxjs/operators';
import {Student} from '../../model/student.model';
import {validateAge} from '../validate-age';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  studentForm:FormGroup;

  /*constructor() {
    this.studentForm=new FormGroup(
      {
        'name':new FormControl('',[Validators.required,Validators.minLength(5)]),
        'age':new FormControl(0),
        'school':new FormControl('')
      }
    )
  }

   */
  constructor(private fb:FormBuilder) {
    this.studentForm=fb.group(
      {
        'name':['',[Validators.required,Validators.minLength(5)]],
        'age':[0,[validateAge]],
        'school':['',Validators.required]
      }
    );




    this.studentForm.valueChanges.pipe(
      filter(() => this.studentForm.valid),
      map(formValue => new Student(formValue.name,formValue.age,formValue.school)),
      tap(value => console.log('Valid Form Value',value))
    ).subscribe();

  }

  get name(){
    return this.studentForm.get('name');
  }

  get age(){
    return this.studentForm.get('age');
  }

  get school(){
    return this.studentForm.get('school')
  }

  ngOnInit(): void {
  }

}
