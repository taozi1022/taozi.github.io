var mkChartsMain =   document.getElementById('mk-charts-main'),mkChartsData,queryRealTimer,queryklineTimer,candlePeriod,dataType;
var aList = document.getElementsByClassName('nav')[0].getElementsByTagName('a');
//均线&boll
var inputList = document.getElementsByClassName('main-indicator-selector')[0].getElementsByTagName('input');
var shapeList = document.getElementsByClassName('shape');
var maLineColor = ['#ec63a7', '#f5cc65', '#1e88e5'];
var upAndDownstyle = ['gt','lt'];



//查表头
function queryReal(){
    $.ajax({
        type: "GET",
        url: "https://forexdata.wallstreetcn.com/real?en_prod_code=EURUSD&fields=prod_name,last_px,px_change,px_change_rate,high_px,low_px,open_px,preclose_px,business_amount,business_balance,market_value,turnover_ratio,dyn_pb_rate,amplitude,pe_rate,bps,hq_type_code,trade_status,bid_grp,offer_grp,business_amount_in,business_amount_out,circulation_value,securities_type,update_time,price_precision,week_52_high,week_52_low",
        dataType: "json",
        success: function(data){
            var data = data.data.snapshot.EURUSD;
            var html=`<div class="left-block">\
                <div class="price ${data[2]<0?upAndDownstyle[1]:upAndDownstyle[0]}">${data[1]}</div>\
                <div class="price-change">\
                    <p class="${data[2]<0?upAndDownstyle[1]:upAndDownstyle[0]}">${data[2]}</p>\
                    <p class="${data[3]<0?upAndDownstyle[1]:upAndDownstyle[0]}">${data[3]}%</p></div>\
                <div class="date">\
                    <svg width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon" data-v-13b642d2="">\
                        <path d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zm0 960C264.976 960 64 759.024 64 512S264.976 64 512 64s448 200.976 448 448-200.976 448-448 448zm246.72-346.496L531.888 510.4V225.872c0-17.68-14.336-32-32-32s-32 14.32-32 32v305.12a31.944 31.944 0 0 0 18.768 29.12l245.6 111.632a31.577 31.577 0 0 0 13.216 2.88c12.16 0 23.776-6.976 29.136-18.752 7.312-16.096.208-35.056-15.888-42.368z"></path>\
                    </svg>交易中 ${getLocalTime(data[11])}</div>\
            </div>\
            <div class="right-block">\
                <table >\
                    <tbody>\
                    <tr>\
                        <td >昨收</td>\
                        <td>今日最高</td>\
                        <td>52周最高</td></tr>\
                    <tr>\
                        <td class="val">${data[6].toFixed(4)}</td>\
                        <td class="gt">${data[4].toFixed(4)}</td>\
                        <td class="val">${data[13].toFixed(4)}</td></tr>\
                    <tr class="sec-row">\
                        <td>今开</td>\
                        <td>今日最低</td>\
                        <td>52周最低</td></tr>\
                    <tr>\
                        <td class="gt">${data[7].toFixed(4)}</td>\
                        <td class="lt">${data[5].toFixed(4)}</td>\
                        <td class="val">${data[14].toFixed(4)}</td></tr>\
                    </tbody>\
                </table>\
            </div>`;

            $('.block-info').html(html);
        }
    });
}
//查数据
function querykline(dataCount,candlePeriod,showType){
    $.ajax({
        type: "GET",
        url: "https://forexdata.wallstreetcn.com/kline?prod_code=EURUSD&candle_period="+candlePeriod+"&fields=time_stamp,open_px,close_px,high_px,low_px,ma5,ma10,ma20,ma60,upper,mid,lower,diff,dea,macd,k,d,j,rsi6,rsi12,rsi24&data_count="+dataCount,
        dataType: "json",
        success: function(data){
            mkChartsData = splitData(data.data.candle.EURUSD)
            // 使用刚指定的配置项和数据显示图表。
            mkChartsInit(mkChartsData,showType);
        }
    });
}
//格式化数据
function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumes = [];
    var upper = [];
    var mid = [];
    var lower = [];
    var dataMA5 = [];
    var dataMA10 = [];
    var dataMA20 = [];
    var dataMA60 = [];

    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i][0]);
        rawData[i][0] = i;
        values.push(rawData[i]);
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
        upper.push(rawData[i][5])
        mid.push(rawData[i][6])
        lower.push(rawData[i][7])
        dataMA5.push(rawData[i][17])
        dataMA10.push(rawData[i][18])
        dataMA20.push(rawData[i][19])
        dataMA60.push(rawData[i][20])
    }
    return {
        categoryData: categoryData,
        values: values,
        volumes: volumes,
        upper:upper,
        mid:mid,
        lower:lower,
        dataMA5:dataMA5,
        dataMA10:dataMA10,
        dataMA20:dataMA20,
        dataMA60:dataMA60
    };
}


//图表入参
function  mkChartsInit(datas,showType){
    var option = {};
    //折线图
    if(showType == 'line'){

        option = {
            //鼠标经过时显示当前的数据
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: 'rgb(22, 104, 255)',
                padding: 10,
                textStyle: {
                    color: '#000'
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                },
                formatter: function(params) {
                    var time  = params[0].name;
                    var kd    = params[0].data;
                    var rate = (kd[2]-kd[1]).toFixed(4);
                    var priceFluctuation = (rate/kd[1] * 100).toFixed(2);
                    var html  = `${time}<br>开盘价：${kd[1].toFixed(4)} <br>最高价：${kd[3].toFixed(4)}<br>最低价：${kd[1].toFixed(4)} <br>收盘价：${kd[2].toFixed(4)}<br><span class="${rate < 0? upAndDownstyle[1]:rate>0?upAndDownstyle[0] : 'rate'}">涨跌额：${rate}</span><br><span class='${priceFluctuation < 0? upAndDownstyle[1]:priceFluctuation>0?upAndDownstyle[0] : 'rate'}'>涨跌幅：${priceFluctuation}%</span>`
                    return html;
                }.bind(this)
            },
            //直角坐标系 grid 中的 x 轴
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datas.categoryData.map(function(value){
                    return new Date(parseInt(value) * 1000).toLocaleString('chinese',{hour12:false});
                }),
                splitArea: {
                    show: false
                },
                axisLine:{
                    show:false
                },
                axisLabel:{
                    formatter: function (value, index) {
                        var xAxisdate = value.replace(' ','/').split('/');
                        xAxisdate[1] = xAxisdate[1]<10 ? '0'+xAxisdate[1] : xAxisdate[1];
                        xAxisdate[2] = xAxisdate[2]<10 ? '0'+xAxisdate[2] : xAxisdate[2];
                        if(candlePeriod >=7){
                            return xAxisdate[1]+'/'+ xAxisdate[2]
                        }else{
                            return xAxisdate[3].substring(0,5)
                        }
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        inside: true,
                        formatter: '{value}\n'
                    },
                }
            ],
            dataZoom: [{
                type: 'inside',
                startValue: datas.categoryData.length>100?datas.categoryData.length-100:0,
                endValue: datas.categoryData.length-1
            }],
            series: [
                {
                    name: '',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: 'rgb(7, 235, 255)',
                        }
                    },
                    //背景颜色
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(120, 246, 227)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 255, 255)'
                            }])
                        }
                    },
                    data: datas.values
                }
            ]
        };
    }else{

        var dates = datas.categoryData.map(function (item) {
            return new Date(parseInt(item) * 1000).toLocaleString('chinese',{hour12:false});
        });

        var data = datas.values.map(function (item) {
            return [+item[1], +item[2], +item[3], +item[4]];
        });
        option = {
            backgroundColor: '#fff',
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                backgroundColor: 'rgba(245, 245, 245, 0.8)',
                borderWidth: 1,
                borderColor: 'rgb(22, 104, 255)',
                padding: 10,
                textStyle: {
                    color: '#000'
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                },
                formatter: function(params) {
                    var time  = params[0].name;
                    var kd    = params[0].data;
                    var rate = (kd[2]-kd[1]).toFixed(4);
                    var priceFluctuation = (rate/kd[1] * 100).toFixed(2);
                    var html  = `${time}<br>开盘价：${kd[1].toFixed(4)} <br>最高价：${kd[3].toFixed(4)}<br>最低价：${kd[1].toFixed(4)} <br>收盘价：${kd[2].toFixed(4)}<br><span class="${rate < 0? upAndDownstyle[1]:rate>0?upAndDownstyle[0] : 'rate'}">涨跌额：${rate}</span><br><span class='${priceFluctuation < 0? upAndDownstyle[1]:priceFluctuation>0?upAndDownstyle[0] : 'rate'}'>涨跌幅：${priceFluctuation}%</span>`
                    return html;
                }.bind(this)
            },
            xAxis: {
                type: 'category',
                data: dates,
                axisLine: { lineStyle: { color: '#8392A5' } },
                axisLabel:{
                    formatter: function (value, index) {
                        var xAxisdate = value.replace(' ','/').split('/');
                        xAxisdate[1] = xAxisdate[1]<10 ? '0'+xAxisdate[1] : xAxisdate[1];
                        xAxisdate[2] = xAxisdate[2]<10 ? '0'+xAxisdate[2] : xAxisdate[2];
                        if(candlePeriod >=7){
                            return xAxisdate[1]+'/'+ xAxisdate[2]
                        }else{
                            return xAxisdate[3].substring(0,5)
                        }
                    }
                },
            },
            yAxis:[
                {
                    type: 'value',
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        inside: true,
                        formatter: '{value}\n'
                    },
                }
            ],
            grid: {
                bottom: 80
            },
            dataZoom: [{
                type: 'inside',
                startValue: dates.length>100?dates.length-100:0,
                endValue: dates.length-1
            }],
            series: [
                {
                    type: 'candlestick',
                    name: '',
                    data: data,
                    itemStyle: {
                        normal: {
                            color: '#fd0015',
                            color0: '#11f400',
                            borderColor: '#fd0015',
                            borderColor0: '#11f400'
                        }
                    }
                },{
                    name: 'MA5',
                    type: 'line',
                    data: datas.dataMA5,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: maLineColor[0]
                        }
                    }
                }, {
                    name: 'MA10',
                    type: 'line',
                    data: datas.dataMA10,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: maLineColor[1]
                        }
                    }
                }, {
                    name: 'MA20',
                    type: 'line',
                    data: datas.dataMA20,
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: maLineColor[2]
                        }
                    }
                }
            ]
        };
    }

    mkChartsMain.setOption(option,true);
}

//格式化时间
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-").replace(/日/g, " ");
}


// 指定图表的配置项和数据
mkChartsMain = echarts.init(mkChartsMain)
//重置宽度和高度
mkChartsMain.resize({
    width: '780px',
    height: '500px'
})
//初始化
candlePeriod = 1;
dataType= 'line';

queryReal();
setInterval(function(){
    queryReal();
},10000)
querykline(256,1,dataType);
//tab点击事件
for(var i = 0; i< aList.length; i ++ ){
    aList[i].index = i;
    $(aList[i]).click(function(){
        if($(this).hasClass('active')){
            return;
        }

        for(var j = 0; j< aList.length; j ++ ){
            $(aList[j]).removeClass('active')
        }

        inputList[0].checked = true;
        inputList[1].checked = false;

        $(this).addClass('active');
        candlePeriod = $(this).attr("data-candlePeriod");
        mkChartsMain.clear();
        querykline(256,candlePeriod,dataType);

    })
}

//点击切换显示折线还是k线
$(shapeList[0]).click(function(){
    $('.main-indicator-selector').css('display','block');
    $(this).removeClass('active');
    $(shapeList[1]).addClass('active');
    dataType = 'candlestick';
    mkChartsMain.clear();
    querykline(256,candlePeriod,dataType);
})

$(shapeList[1]).click(function(){
    inputList[0].checked = true;
    inputList[1].checked = false;

    $('.main-indicator-selector').css('display','none');
    $(this).removeClass('active');
    $(shapeList[0]).addClass('active');
    dataType = 'line';
    mkChartsMain.clear();
    querykline(256,candlePeriod,dataType);
})
//均线
$(inputList[0]).click(function(){
    var data = mkChartsData.values.map(function (item) {
        return [+item[1], +item[2], +item[3], +item[4]];
    });
    $(this).attr('checked',true);
    $(inputList[1]).attr('checked',false);
    mkChartsMain.setOption({
        series:[
            {
                type: 'candlestick',
                name: '',
                data: data,
                itemStyle: {
                    normal: {
                        color: '#fd0015',
                        color0: '#11f400',
                        borderColor: '#fd0015',
                        borderColor0: '#11f400'
                    }
                }
            },{
                name: 'MA5',
                type: 'line',
                data: mkChartsData.dataMA5,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: maLineColor[0]
                    }
                }
            }, {
                name: 'MA10',
                type: 'line',
                data: mkChartsData.dataMA10,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: maLineColor[1]
                    }
                }
            }, {
                name: 'MA20',
                type: 'line',
                data: mkChartsData.dataMA20,
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: maLineColor[2]
                    }
                }
            }
        ]
    })
})
//boll
$(inputList[1]).click(function(){
    var data = mkChartsData.values.map(function (item) {
        return [+item[1], +item[2], +item[3], +item[4]];
    });
    $(this).attr('checked',true);
    $(inputList[0]).attr('checked',false);
    mkChartsMain.setOption({
        series:[
            {
                type: 'candlestick',
                name: '',
                data: data,
                itemStyle: {
                    normal: {
                        color: '#fd0015',
                        color0: '#11f400',
                        borderColor: '#fd0015',
                        borderColor0: '#11f400'
                    }
                }
            }, {
                name: 'upper',
                type: 'line',
                data: mkChartsData.upper,
                smooth: false,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: maLineColor[0]
                    }
                }
            }, {
                name: 'mid',
                type: 'line',
                data: mkChartsData.mid,
                smooth: false,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: maLineColor[1]
                    }
                }
            }, {
                name: 'lower',
                type: 'line',
                data: mkChartsData.lower,
                smooth: false,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: maLineColor[2]
                    }
                }
            }
        ]
    })
})














