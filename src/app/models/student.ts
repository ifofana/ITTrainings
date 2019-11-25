import { ParentGuard } from './parent.guard';

export class Student {
  id: number;
  firstName: string;
  middlename: string;
  lastName: string;
  dob: Date;
  age: number;
  gender: string;
  allerges: string;
  classSelection: string;
  classDay: string;
  parentGuardians: ParentGuard[];

  displayName(): any {
    return this.firstName + ' ' + this.middlename + ' ' + this.lastName + ' '
      + this.dob + ' ' + this.age + ' ' + this.gender + ' ' + this.allerges + ' '
      + this.classSelection + ' ' + this.classDay;
  }
}
