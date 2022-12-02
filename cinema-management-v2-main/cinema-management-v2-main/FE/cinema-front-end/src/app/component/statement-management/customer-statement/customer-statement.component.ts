import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICustomerStatementDto} from '../../../dto/i-customer-statement-dto';
import {StatementService} from '../../../service/statement.service';
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
  selector: 'app-customer-statement',
  templateUrl: './customer-statement.component.html',
  styleUrls: ['./customer-statement.component.css']
})
export class CustomerStatementComponent implements OnInit {

  btnView = 'XEM BIỂU ĐỒ';
  action: boolean;
  numberMonth = 0;
  labelCharts: string[] = [];
  dataCharts: number[] = [];
  timeGroup!: FormGroup;
  // chart: Chart;
  listCustomerTop$: Observable<Array<ICustomerStatementDto>>;
  hiddenChart: boolean;

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private fBuilder: FormBuilder,
              private statement: StatementService,
              private title: Title,
              private router: Router) {
    this.title.setTitle('Thống kê thành viên');
  }

  ngOnInit(): void {
    this.btnView = 'XEM BIỂU ĐỒ';
    this.action = true;
    this.hiddenChart = true;
    this.timeGroup = this.fBuilder.group({
      time: [this.numberMonth]
    });
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
    console.log('Đại');
    this.statement.listCustomerTop(this.numberMonth).subscribe((value: Array<ICustomerStatementDto>) => {
        console.log(value);
        this.listCustomerTop$ = new BehaviorSubject<Array<ICustomerStatementDto>>(value);
        this.creatDataForChart(value);
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

  creatDataForChart(value: Array<ICustomerStatementDto>) {
    this.labelCharts = [];
    this.dataCharts = [];


    for (const item of value) {
      if (item.name != null) {
        this.labelCharts.push(item.name);
      } else {
        this.labelCharts.push(' ');
      }

      if (item.totalMoney != null) {
        this.dataCharts.push(item.totalMoney);
      } else {
        this.dataCharts.push(0);

      }
    }
  }

  createChart() {
    this.chartOptions = {
      series: [
        {
          name: 'Tiêu phí',
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

  // this.chart = new Chart('myChart', {
  //   type: 'bar',
  //   data: {
  //     labels: this.labelCharts,
  //     datasets: [{
  //       label: 'Tiêu phí.',
  //       data: this.dataCharts,
  //       backgroundColor: 'blue',
  //       borderColor: '#666',
  //       borderWidth: 2
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         beginAtZero: true,
  //         ticks: {
  //           callback(value, index, values) {
  //             let str = '' + value;
  //             let result = '';
  //             while (str.length > 3) {
  //               result = ',' + str.substr(str.length - 3) + result;
  //               str = str.slice(0, str.length - 3);
  //             }
  //             result = str + result;
  //             return result + ' VND';
  //           }
  //         }
  //       }]
  //     },
  //     legend: {
  //       display: false
  //     },
  //     responsive: true,
  //     indexAxis: 'x',
  //     aspectRatio: 1.8,
  //     display: true
  //   }
  // });
  // console.log(this.chart);
  /*this.chart = new Chart('myChart', {
    type: 'bar',
    data: {
      labels: this.labelCharts,
      datasets: [
        {
          label: 'Tổng tiền',
          data: this.dataCharts,
          backgroundColor: 'blue'
        }]
    },
    options: {
      scales: {
        yAxes: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'VND'
          }
        }
      }
    }
  });*/
}

