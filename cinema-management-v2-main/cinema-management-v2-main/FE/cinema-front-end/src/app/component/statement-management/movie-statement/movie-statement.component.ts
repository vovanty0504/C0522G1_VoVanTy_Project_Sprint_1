import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {IMovieStatementDto} from '../../../dto/i-movie-statement-dto';

import {StatementService} from '../../../service/statement.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
}

@Component({
  selector: 'app-movie-statement',
  templateUrl: './movie-statement.component.html',
  styleUrls: ['./movie-statement.component.css']
})
export class MovieStatementComponent implements OnInit {

  btnView = 'Xem biểu đồ';
  action: boolean;
  hiddenChart: boolean;
  numberMonth = 0;
  labelCharts: string[] = [];
  dataCharts: number[] = [];
  listMovieTop$: Observable<Array<IMovieStatementDto>>;
  timeGroup!: FormGroup;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private fbuilder: FormBuilder,
              private statement: StatementService,
              private title: Title,
              private router: Router) {
    this.title.setTitle('Thống kê phim');
  }

  ngOnInit(): void {
    this.btnView = 'XEM BIỂU ĐỒ';
    this.timeGroup = this.fbuilder.group({
      time: [this.numberMonth]
    });
    this.action = true;
    this.hiddenChart = true;
    this.getList(this.numberMonth);


  }

  displayChangeTemplate() {
    if (this.btnView === 'XEM BIỂU ĐỒ') {
      this.btnView = 'XEM BẢNG SỐ LIỆU';
      this.action = false;
      this.hiddenChart = false;
      console.log(this.chart);
    } else {
      this.btnView = 'XEM BIỂU ĐỒ';
      this.action = true;
      this.hiddenChart = true;
      console.log(this.chart);
    }
  }

  getList(numberMonth: number) {
    this.statement.listMovieTop(this.numberMonth).subscribe((value: Array<IMovieStatementDto>) => {
        this.listMovieTop$ = new BehaviorSubject<Array<IMovieStatementDto>>(value);
        this.creatDataForChart(value);
        console.log(value);
        this.createChart();
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/statement/error');
      });
  }

  find() {
    this.numberMonth = this.timeGroup.value.time;
    this.getList(this.numberMonth);
  }

  creatDataForChart(value: Array<IMovieStatementDto>) {
    this.labelCharts = [];
    this.dataCharts = [];


    for (const item of value) {
      if (item.name != null) {
        this.labelCharts.push(item.name);
      } else {
        this.labelCharts.push(' ');
      }

      if (item.turnover != null) {
        this.dataCharts.push(item.turnover);
      } else {
        this.dataCharts.push(0);

      }
    }
  }


  createChart() {
    this.chartOptions = {
      series: [
        {
          name: 'Doanh thu',
          data: this.dataCharts
        }
      ],
      chart: {
        type: 'bar',
        height: 550
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: this.labelCharts
      },
      yaxis: {
        labels: {
          formatter(val) {
            let str = '' + val;
            let result = '';
            while (str.length > 3) {
              result = ',' + str.substr(str.length - 3) + result;
              str = str.slice(0, str.length - 3);
            }
            result = str + result;
            return result;
          }
        },
        title: {
          text: 'VND'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            let str = '' + val;
            let result = '';
            while (str.length > 3) {
              result = ',' + str.substr(str.length - 3) + result;
              str = str.slice(0, str.length - 3);
            }
            result = str + result;
            return result + ' VND';
          }
        }
      }
    };

    console.log(this.chartOptions);
  }
}
