import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/models/contact';
import { ParentGuard } from 'src/app/models/parent.guard';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contactId: string;
  currentContact: Contact;

  constructor(private router: Router, private route: ActivatedRoute) { 
    this.currentContact = JSON.parse(localStorage.getItem('detailContact'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.contactId = params.get('id');
      }
    })
  }

}
