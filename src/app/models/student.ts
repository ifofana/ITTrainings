import { ParentGuard } from './parent.guard';
import { Contact } from './contact';

export class Student {
  studentId: number;
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
  contactId: number;
  contact: Contact;

  displayName(): any {
    return this.firstName + ' ' + this.middlename + ' ' + this.lastName + ' '
      + this.dob + ' ' + this.age + ' ' + this.gender + ' ' + this.allerges + ' '
      + this.classSelection + ' ' + this.classDay;
  }
}
