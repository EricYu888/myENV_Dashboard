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
    private color = ['orange', 'lightblue'];
    constructor(public appState: AppState,
        public weatherService: WeatherService
    ) {
    }
    public ngOnInit() {

        this.mSub = this.appState.registerCityChangeListener((city) => {
            this.changeCity(city);
        });

        this.sfwChart1 = echarts.init(document.getElementById('sunSet'));
        this.bindChart();
    }
    public bindChart() {
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
                alwaysShowContent: true,
                axisPointer: {
                    type: 'line'
                },
                formatter: (item) => {
                    return "";
                },
                show: false
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
                    // axisPointer: {
                    //     value: '07:30',
                    //     snap: true,
                    //     show: true,
                    //     lineStyle: {
                    //         color: '#004E52',
                    //         opacity: 1,
                    //         width: 10
                    //     },
                    //     handle: {
                    //         show: true,
                    //         color: 'rgba(255,255,255,0)'
                    //     }
                    // },
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
                    data: [16, 20, 24, 28, 31, 33.5, 35.5, 37, 38.5, 40, 38, 35, 31, 27, 24, 21, 18
                        , 16, 14, 12, 10, 13, 15, 17
                    ],
                    markPoint: {
                        data: [
                            {
                                type: 'max',
                                name: '',
                                symbol: 'image://../assets/img/rect.png',
                                symbolSize: 60,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            formatter: (any) => {
                                                return " 11:30 am \n18m"
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
                                symbolSize: 52,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,
                                            formatter: ' 17:00 pm \n10m',
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

    }

    public ngOnDestroy() {

    }
}