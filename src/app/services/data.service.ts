import { Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService implements OnInit{

  contactList
  pageContactCount

  constructor(private httpClient: HttpClient) {
    this.pageContactCount = 3
    this.contactList = []
  }


  ngOnInit(){
  }


  //Function to load data from the server
  loadContactsFromServer(){
    let promise = new Promise((resolve, reject) => {
      this.httpClient.get("http://localhost:3000/data")
      .toPromise()
      .then(res => {
        this.contactList = res
        resolve()
      })
    })

    return promise
  }


  //Function to return all contacts
  getCompleteContactList(){
    return this.contactList
  }


  //Function to return selected contacts
  getContactList(pageNumber){
    return this.contactList.slice(pageNumber * this.pageContactCount, (pageNumber * this.pageContactCount) + this.pageContactCount);
  }


  //Function to return a contact for a given id
  getContact(contactId){
    var searchResult

    this.contactList.forEach(contact => {
      if(contact.id === contactId){
        searchResult = contact
      }
    });

    return searchResult
  }


  //Function to save new contact, or changes to old contact
  saveContactDetails(contactId, contactDetails){

    if(contactId == 0){
      contactDetails.id = this.contactList.length + 1
      this.contactList.push(contactDetails)
    }else{
      this.contactList.forEach(contact => {
        if(contact.id === contactId){
          contact = contactDetails
        }
      });
    }
  }


  //Function to check if pageNumber is valid
  isPageNumberValid(pageNumber){
    var totalPageCount = Math.ceil(this.contactList.length / this.pageContactCount)

    if((0 <= pageNumber) && (pageNumber < totalPageCount)){
      return true
    }else{
      return false
    }  
  }


  //Function to get the pagination links
  getPaginationLinks(pageNumber){
    var totalPageCount = Math.ceil(this.contactList.length / this.pageContactCount)
    var pagination

    if(totalPageCount == 0){
      pagination = []
    }else if(totalPageCount == 1){
      pagination = [
        {
          "label": "previous",
          "classes": "page-item disabled",
          "link": ""
        },
        {
          "label": (pageNumber + 1).toString(),
          "classes": "page-item",
          "link": "list/" + pageNumber
        },
        {
          "label": "next",
          "classes": "page-item disabled",
          "link": ""
        }
      ]
    }else if(pageNumber == 0){
      pagination = [
        {
          "label": "previous",
          "classes": "page-item disabled",
          "link": ""
        },
        {
          "label": (pageNumber + 1).toString(),
          "classes": "page-item",
          "link": "list/" + pageNumber
        },
        {
          "label": "next",
          "classes": "page-item",
          "link": "list/" + (pageNumber + 1)
        }
      ]
    }else if(pageNumber == (totalPageCount - 1)){
      pagination = [
        {
          "label": "previous",
          "classes": "page-item",
          "link": "list/" + (pageNumber - 1)
        },
        {
          "label": (pageNumber + 1).toString(),
          "classes": "page-item",
          "link": "list/" + pageNumber
        },
        {
          "label": "next",
          "classes": "page-item disabled",
          "link": ""
        }
      ]
    }else{
      pagination = [
        {
          "label": "previous",
          "classes": "page-item",
          "link": "list/" + (pageNumber - 1)
        },
        {
          "label": (pageNumber + 1).toString(),
          "classes": "page-item",
          "link": "list/" + pageNumber
        },
        {
          "label": "next",
          "classes": "page-item",
          "link": "list/" + (pageNumber + 1)
        }
      ]
    }

    return pagination
  }
}
