import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy{

  sub
  id
  contact
  firstName
  lastName
  emailWork
  emailPersonal
  phoneWork
  phonePersonal

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']

      if(isNaN(this.id)){
        this.firstName = ""
        this.lastName = ""
        this.emailWork = ""
        this.emailPersonal = ""
        this.phoneWork = ""
        this.phonePersonal = ""
      }else{
        this.contact = this.dataService.getContact(this.id)

        this.firstName = this.contact.name.split(" ")[0]
        this.lastName = this.contact.name.split(" ")[1]
        this.emailWork = this.contact.email.work
        this.emailPersonal = this.contact.email.personal
        this.phoneWork = this.contact.contactNumber.work
        this.phonePersonal = this.contact.contactNumber.personal
      }
    });
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  saveContactDetails(){
    if(isNaN(this.id)){
      this.contact = { 
        id: 0,
        name: "",
        email: {
          personal: "",
          work: "",
        },
        contactNumber: {
          personal: 0,
          work: 0
        }
      }

      this.contact.name = this.firstName + " " + this.lastName
      this.contact.email = {}
      this.contact.email.work = this.emailWork
      this.contact.email.personal = this.emailPersonal
      this.contact.contactNumber = {}
      this.contact.contactNumber.work = this.phoneWork
      this.contact.contactNumber.personal = this.phonePersonal

      this.dataService.saveContactDetails(0, this.contact)
    }else{
      this.contact.name = this.firstName + " " + this.lastName
      this.contact.email.work = this.emailWork
      this.contact.email.personal = this.emailPersonal
      this.contact.contactNumber.work = this.phoneWork
      this.contact.contactNumber.personal = this.phonePersonal

      this.dataService.saveContactDetails(this.contact.id, this.contact)
    }

    this.router.navigateByUrl("/list")
  }
}