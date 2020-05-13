import { Student } from './student';

export class Contact {
  contactId: number;
  contactName: string;
  contactPhoneNumber: string;
  contactAltPhoneNumber: string;
  contactEmail: string;
  contactAltEmail: string;
  contactRelationshipToStudent: string;
  students: Student[];

  displayName(): any {
    return this.contactName + ' ' + this.contactPhoneNumber + ' ' + this.contactAltPhoneNumber + ' '
      + this.contactEmail + ' ' + this.contactAltEmail + ' ' + this.contactRelationshipToStudent;
  }
} // end of contact class
