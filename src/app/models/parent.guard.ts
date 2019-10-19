export class ParentGuard {
    id: number;
    name: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    altPhoneNumber: string;
    email: string;
    altEmail: string;
    pgRelationshipToStudent: string;

    displayName(): any {
        return this.name + ' ' + this.addressOne + ' ' + this.addressTwo + ' '
      + this.city + ' ' + this.state + ' ' + this.zipCode + ' ' + this.phoneNumber + ' '
      + this.altPhoneNumber + ' ' + this.email + ' ' + this.altEmail + ' ' + this.pgRelationshipToStudent;
    }
}