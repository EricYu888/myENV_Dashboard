import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { WeatherService } from './weather.service';
import { AppState } from './../app.service';

declare var echarts;
declare var $;
declare var jQuery: any;
@Component({
    selector: 'weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit, OnDestroy {
    public mSub: Subscription;
    private sfwChart1: any;
    private option: any;
    private tideArr = [];
    private color = ['orange', 'lightblue'];
    private tide = [];
    private topTide = "";
    private bottomTide = "";
    private defaultTide = [16, 20, 24, 28, 31, 33.5, 35.5, 37, 38.5, 40, 38, 35, 31, 27, 24, 21, 18
        , 16, 14, 12, 10, 13, 15, 17];
    private defaultTopTide = " 11:30 am \n8m";
    private defaultBottomTide = ' 17:00 pm \n2m';
    private zhuangzhouTide = [10, 20, 30, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22
        , 20, 18, 16, 14, 12, 15, 17];
    private zhuangzhouTopTide = " 08:30 am \n4m";
    private zhuangzhouBottomTide = ' 7:00 pm \n1m';
    private shanghaiTide = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 27, 26, 25, 24, 23, 22
        , 20, 18, 16, 14, 12, 15, 17];
    private shanghaiTopTide = " 12:00 am \n5m";
    private shanghaiBottomTide = ' 7:00 pm \n3m';
    private dalianTide = [30, 28, 26, 24, 22, 20, 19, 18, 17, 16, 18, 19, 22, 25, 24, 23, 22
        , 20, 18, 16, 14, 12, 15, 17];
    private dalianTopTide = " 07:00 am \n4m";
    private dalianBottomTide = ' 05：30 pm \n1.5m';

    constructor(public appState: AppState,
        public weatherService: WeatherService
    ) {
    }
    public ngOnInit() {
        this.mSub = this.appState.registerCityChangeListener((city) => {
            this.changeCity(city);
        });

        this.sfwChart1 = echarts.init(document.getElementById('sunSet'));
        this.bindChart('currentCity');
    }



    public bindChart(city) {
        this.tide = [];
        if (city === "currentCity") {
            this.tide = this.defaultTide;
            this.topTide = this.defaultTopTide;
            this.bottomTide = this.defaultBottomTide;
        }
        else if (city === "guangzhou") {
            this.tide = this.zhuangzhouTide;
            this.topTide = this.zhuangzhouTopTide;
            this.bottomTide = this.zhuangzhouBottomTide;
        }
        else if (city === "shanghai") {
            this.tide = this.shanghaiTide;
            this.topTide = this.shanghaiTopTide;
            this.bottomTide = this.shanghaiBottomTide;
        }
        else if (city === "dalian") {
            this.tide = this.dalianTide;
            this.topTide = this.dalianTopTide;
            this.bottomTide = this.dalianBottomTide;
        }
        this.sfwChart1.clear();
        this.option = {
            title: {
                text: '27th December',
                x: 'center',
                align: 'center',
                textStyle: {
                    color: "#666666",
                    fontSize: 26,
                    fontFamily: "Arial",
                    fontWeight: 'bolder'
                }
            },
            tooltip: {
                trigger: 'axis',
                // alwaysShowContent: true,
                // axisPointer: {
                //     type: 'line'
                // },
                // formatter: (item) => {
                //     return "";
                // },
                //show: false
            },
            legend: {
                data: [{
                    name: 'Tide',
                    textStyle: {
                        color: "lightblue",
                        fontFamily: "Arial",
                    }
                },
                {
                    name: "Sunrise & SunSet",
                    textStyle: {
                        color: "orange"
                    }
                }
                ],
                top: 40,
                left: "center",
                borderColor: "#efefef",
                borderWidth: 1,
            },
            calculable: true,
            grid: {
                height: 200,
                left: '7%',
                right: '9%',
                borderWidth: 1
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLabel: {
                        show: true,
                        interval: 6,
                        formatter: (item) => {
                            if (item <= "12:00") {
                                return item + " am";
                            } else {
                                return item + " pm";
                            }
                        },
                        textStyle: {
                            color: "#666666",
                            fontSize: 12,
                            fontWeight: 'bolder',
                            fontFamily: "Arial"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    data: [{
                        value: '07:00',
                        textStyle: {
                            color: 'orange',
                            fontSize: 12,
                            fontStyle: 'normal',
                            fontWeight: 'bold'
                        }
                    }, '07:30', '08:00', '08:30', "09:00", "09:30", '10:00',
                        '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 65,
                    show: false
                }
            ],
            series: [
                {
                    name: 'Sunrise & SunSet',
                    type: 'line',
                    smooth: true,
                    symbolSize: 0,
                    data: [
                        0, 16, 27, 35, 41, 45, 48,
                        {
                            value: 50.5,
                            symbol: 'image://../assets/img/sun.png',
                            symbolSize: 60,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false,
                                        textStyle: {
                                            fontFamily: "Arial",
                                            fontWeight: 'bold'
                                        }
                                    }
                                }
                            }
                        },
                        52.5, 54, 55
                        ,
                        55.5,
                        55.2,
                        54, 52.5, 50.5, 48, 45, 41, 35, 27, 16, 0,
                    ],
                    itemStyle: {
                        normal: {
                            color: this.color[0],
                            lineStyle: {
                                color: this.color[0]
                            }
                        }
                    }
                },
                {
                    name: 'Tide',
                    type: 'line',
                    smooth: true,
                    symbolSize: 0,
                    itemStyle: {
                        normal:
                        {
                            color: this.color[1],
                            areaStyle: {
                                color: this.color[1]
                            },
                            lineStyle: {
                                color: this.color[1]
                            }
                        }
                    },
                    data: this.tide,
                    markPoint: {
                        data: [
                            {
                                type: 'max',
                                name: '',
                                symbol: 'image://../assets/img/rect.png',
                                symbolSize: 70,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            formatter: (any) => {
                                                return this.topTide
                                            },
                                            textStyle: {
                                                color: '#2a7388',
                                                fontFamily: "Arial",
                                            }
                                        },
                                        labelLine: { show: true }
                                    }
                                }
                            },
                            {
                                type: 'min',
                                name: ' ',
                                symbol: 'image://../assets/img/rect.png',
                                symbolSize: 70,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            formatter: this.bottomTide,
                                            textStyle: {
                                                color: '#2a7388'
                                            }
                                        },
                                        labelLine: { show: true }
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        };

        this.sfwChart1.setOption(this.option);
        window.addEventListener("resize", () => {
            this.sfwChart1.resize();
        });
        window.addEventListener("click", () => {
            this.sfwChart1.resize();
        });

        $('.sunSet').resize(() => {
            this.sfwChart1.resize();
        })
    }




    public changeCity(city) {
        var data = this.weatherService.getCurrentWeatherByCity(city);
        if (data != null) {
            $("#weather").html(data.weather);
            $("#temp").html(data.temp);
            $("#wet").html(data.wet);
            $("#psi").html(data.psi);
            $("#rain").html(data.rain);
            $("#pic").removeClass().addClass(data.pic);
        }
        // if (city === "guangzhou") {

        // }
        // else if (city === "shanghai") {

        // }
        // else {

        // }
        this.bindChart(city);

    }

    public ngOnDestroy() {

    }
}