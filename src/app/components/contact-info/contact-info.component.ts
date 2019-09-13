import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit {

  id: number;

  contact: Contact;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.contact = new Contact();
  }

}
