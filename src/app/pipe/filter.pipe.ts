import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  completeContactList

  constructor(private dataService: DataService){
    this.completeContactList = this.dataService.getCompleteContactList()
  }


  transform(items: any[], searchText: string): any[] {

    if(!items){
      return [];
    }else if(!searchText){
      return items;
    }else{
      searchText = searchText.toLowerCase();

      return this.completeContactList.filter(contact => this.search(searchText, contact.name.toLowerCase()));
    }
  }


  //Search function
  search(searchText, targetText){
    return targetText.toLowerCase().includes(searchText);
  }
}
