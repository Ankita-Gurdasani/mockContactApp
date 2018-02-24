import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit, OnDestroy{

  routeSubscriber
  contactList
  pageNumber
  paginationLinks

  constructor(private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute){
    this.contactList = []
  }


  ngOnInit(){
    this.routeSubscriber = this.activatedRoute.params.subscribe(params => {
      this.pageNumber = +params['pageNumber']

      if(isNaN(this.pageNumber)){
        this.pageNumber = 0
      }

      if(this.dataService.isPageNumberValid(this.pageNumber)){
        this.contactList = this.dataService.getContactList(this.pageNumber)
        this.paginationLinks = this.dataService.getPaginationLinks(this.pageNumber)
      }else{
        this.navigateToList('/list/0')
      }
    });
  }


  ngOnDestroy(){
    this.routeSubscriber.unsubscribe()
  }


  //Function to navigate to editor component for editing contact
  navigateToEditorEdit(contactID){
    this.router.navigate(['/editor/' + contactID])
  }


  //Function to navigate to editor component for editing contact
  navigateToEditorCreate(){
    this.router.navigateByUrl('/editor')
  }


  //Function to navigate to list component for a particular page number
  navigateToList(link){
    this.router.navigateByUrl(link)
  }


  //Function to listen for changes to the search query
  onSearchQueryChange(searchContact){
    if(searchContact.length == 0){
      this.contactList = this.dataService.getContactList(this.pageNumber)
    }else{
      this.contactList = this.dataService.getCompleteContactList
    }
  }
}
