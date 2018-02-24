import { Component, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isDataLoaded
  loadingScreen

  constructor(private dataService: DataService){
    this.isDataLoaded = false
    this.loadingScreen = true

    this.dataService.loadContactsFromServer().then(() => {
      this.isDataLoaded = true
      this.loadingScreen = false
    })
  }


  ngOnInit(){
  }
}
