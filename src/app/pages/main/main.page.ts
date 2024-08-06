import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  @ViewChild('main', {static: false}) main: IonTabs;
  selectedTab: any;

  constructor() { }

  ngOnInit() {
  }

  setCurrentTab() {
    this.selectedTab = this.main.getSelected();
    console.log(this.selectedTab);
  }
  
}
