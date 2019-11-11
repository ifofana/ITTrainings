import { Student } from './student';

export class ParentGuard {
    id: number;
    pgName: string;
    pgAddressOne: string;
    pgAddressTwo: string;
    pgCity: string;
    pgState: string;
    pgZipCode: string;
    pgPhoneNumber: string;
    pgAltPhoneNumber: string;
    pgEmail: string;
    pgAltEmail: string;
    pgRelationshipToStudent: string;
    students: Student[];

    displayName(): any {
        return this.pgName + ' ' + this.pgAddressOne + ' ' + this.pgAddressTwo + ' '
      + this.pgCity + ' ' + this.pgState + ' ' + this.pgZipCode + ' ' + this.pgPhoneNumber + ' '
      + this.pgAltPhoneNumber + ' ' + this.pgEmail + ' ' + this.pgAltEmail + ' ' + this.pgRelationshipToStudent;
    }
}