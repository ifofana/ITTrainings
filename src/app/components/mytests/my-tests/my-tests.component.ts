import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-tests',
  templateUrl: './my-tests.component.html',
  styleUrls: ['./my-tests.component.css']
})
export class MyTestsComponent implements OnInit {

  public myForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      addresses: this._fb.array([
        this.initAddress(),
      ])
    });
  }

  initAddress() {
    return this._fb.group({
      street: ['', Validators.required],
      phonenumber: this._fb.array([
        this.initNumber()
      ])
    });
  }

  initNumber() {
    return this._fb.group({
      number: ['', Validators.required]
    })
  }

  addAddress() {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    const control = <FormArray>this.myForm.controls['addresses'];
    control.removeAt(i);
  }

  addNumber(address): void {
    const control = <FormArray>address.controls.phonenumber;
    control.push(this.initNumber());
  }

  removeNumber(address, j: number) {
    const control = <FormArray>address.controls.phonenumber;
    control.removeAt(j);
  }

  save(formData) {
    console.log(formData.value)
  }

}
