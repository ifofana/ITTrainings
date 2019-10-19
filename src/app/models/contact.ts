export class Contact {
  id: number;
  name: string;
  contactPhoneNumber: string;
  contactAltPhoneNumber: string;
  contactEmail: string;
  contactAltEmail: string;
  contactRelationshipToStudent: string;

  displayName(): any {
    return this.name + ' ' + this.contactPhoneNumber + ' ' + this.contactAltPhoneNumber + ' '
      + this.contactEmail + ' ' + this.contactAltEmail + ' ' + this.contactRelationshipToStudent;
  }
} // end of contact class
