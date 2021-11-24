import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryWithMusician } from 'src/app/models/CountryWithMusician';
import { TopInstrument } from 'src/app/models/TopInstrument';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public instruments: TopInstrument[];
  public avarageCost: string;
  public countryMisician: CountryWithMusician[];

  constructor(private statisticService:StatisticService) { }

  ngOnInit(): void {
    this.loadInstruments();
    this.loadAvarageCost();
    this.loadCountryMusicians();
  }

  loadInstruments(){
    this.statisticService.getTopInstruments()
    .subscribe(res => {
      this.instruments = res;
    });
  }

  loadAvarageCost(){
    this.statisticService.getAverageCostOfConcert()
    .subscribe(res => {
      this.avarageCost = res + "$";
    });
  }

  loadCountryMusicians(){
    this.statisticService.getCountriesWithMostMusicians()
    .subscribe(res => {
      this.countryMisician =  res;
    });
  }

}
