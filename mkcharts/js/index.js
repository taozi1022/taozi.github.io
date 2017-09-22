var mkChartsMain =   document.getElementById('mk-charts-main'),mkChartsData,queryRealTimer,queryklineTimer,candlePeriod;
var aList = document.getElementsByClassName('nav')[0].getElementsByTagName('a');

// 指定图表的配置项和数据
mkChartsMain = echarts.init(mkChartsMain)

//重置宽度和高度
mkChartsMain.resize({
    width: '780px',
    height: '500px'
})


function queryReal(){
    $.ajax({
        type: "GET",
        url: "https://forexdata.wallstreetcn.com/real?en_prod_code=EURUSD&fields=prod_name,last_px,px_change,px_change_rate,high_px,low_px,open_px,preclose_px,business_amount,business_balance,market_value,turnover_ratio,dyn_pb_rate,amplitude,pe_rate,bps,hq_type_code,trade_status,bid_grp,offer_grp,business_amount_in,business_amount_out,circulation_value,securities_type,update_time,price_precision,week_52_high,week_52_low",
        dataType: "json",
        success: function(data){
            var data = data.data.snapshot.EURUSD;
            var html=`<div class="left-block">\
                <div class="price gt">${data[1]}</div>\
                <div class="price-change">\
                    <p class="gt">+${data[2]}</p>\
                    <p class="gt">+${data[3]}%</p></div>\
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
                        <td class="val">${data[6]}</td>\
                        <td class="gt">${data[4]}</td>\
                        <td class="val">${data[13]}</td></tr>\
                    <tr class="sec-row">\
                        <td>今开</td>\
                        <td>今日最低</td>\
                        <td>52周最低</td></tr>\
                    <tr>\
                        <td class="gt">${data[7]}</td>\
                        <td class="lt">${data[5]}</td>\
                        <td class="val">${data[14]}</td></tr>\
                    </tbody>\
                </table>\
            </div>`;

            $('.block-info').html(html);
        }
    });
}

function querykline(dataCount,candlePeriod){
    $.ajax({
        type: "GET",
        url: "https://forexdata.wallstreetcn.com/kline?prod_code=EURUSD&candle_period="+candlePeriod+"&fields=time_stamp,open_px,close_px,high_px,low_px,ma5,ma10,ma20,ma60,upper,mid,lower,diff,dea,macd,k,d,j,rsi6,rsi12,rsi24&data_count="+dataCount,
        dataType: "json",
        success: function(data){
            if(dataCount == 1){
                mkChartsData.values.shift();
                mkChartsData.categoryData.shift();
                mkChartsData.values.push(splitData(data.data.candle.EURUSD).values[0]);
                mkChartsData.categoryData.push(splitData(data.data.candle.EURUSD).categoryData[0]);
                console.log(mkChartsData)
                mkChartsMain.setOption({
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: mkChartsData.categoryData.map(function(item){
                            return new Date(parseInt(item) * 1000).toLocaleString('chinese',{hour12:false})
                        })
                    },
                    series: [{
                        data: mkChartsData.values
                    }]
                });
                mkChartsInit(mkChartsData);
            }else{
                mkChartsData = splitData(data.data.candle.EURUSD)   
                // 使用刚指定的配置项和数据显示图表。
                mkChartsInit(mkChartsData);
            }
        }
    });
}
function splitData(rawData) {
    var categoryData = [];
    var values = [];
    for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i][0]);
        rawData[i][0] = i;
        values.push(rawData[i]);
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

function renderItem(params, api) {
    var xValue = api.value(0);
    var openPoint = api.coord([xValue, api.value(1)]);
    var highPoint = api.coord([xValue, api.value(3)]);

    var lowPoint = api.coord([xValue, api.value(4)]);
    var closePoint = api.coord([xValue, api.value(2)]);
    var upper = api.coord([xValue, api.value(5)]);

    var halfWidth = api.size([1, 0])[0] * 0.35;
    var style = api.style({
        stroke: api.visual('color')
    });

    return {
        type: 'group',
        children: [{
            type: 'line',
            shape: {
                x1: lowPoint[0], y1: lowPoint[1],
                x2: highPoint[0], y2: highPoint[1]
            },
            style: style
        }, {
            type: 'line',
            shape: {
                x1: openPoint[0], y1: openPoint[1],
                x2: openPoint[0] - halfWidth, y2: openPoint[1]
            },
            style: style
        }, {
            type: 'line',
            shape: {
                x1: closePoint[0], y1: closePoint[1],
                x2: closePoint[0] + halfWidth, y2: closePoint[1]
            },
            style: style
        }]
    };
}

//图标入参
function  mkChartsInit(datas){
    var option = {
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
        },
        //直角坐标系 grid 中的 x 轴
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: datas.categoryData.map(function(item){
                return new Date(parseInt(item) * 1000).toLocaleString('chinese',{hour12:false})
            }),
             splitArea: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                scale: true,
                splitArea: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '',
                type: 'line',
                //renderItem: renderItem,
                dimensions: [null, '开盘价', '最高价', '最低价', '收盘价','涨跌额','涨跌幅'],
                encode: {
                    tooltip: [1, 3, 4, 2, 5, 6]
                },
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
    mkChartsMain.setOption(option);
}

//格式化时间
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString('chinese',{hour12:false}).replace(/\//g, "-").replace(/日/g, " ");
}


queryReal();
querykline(256,1);

queryRealTimer = setInterval(function(){
    queryReal();
},60000)

queryklineTimer = setInterval(function () {
    for(var j = 0; j< aList.length; j ++ ){
        if($(aList[j]).hasClass('active')){
            candlePeriod = $(aList[j]).attr("data-candlePeriod");
        }
    }
    querykline(1,candlePeriod)
}, 60000);


//tab点击事件

for(var i = 0; i< aList.length; i ++ ){
    aList[i].index = i;
    $(aList[i]).click(function(){
        //清除定时器
        // clearInterval(queryRealTimer)
        // clearInterval(queryklineTimer)

        if($(this).hasClass('active')){
            return;
        }
        for(var j = 0; j< aList.length; j ++ ){
            $(aList[j]).removeClass('active')
        }
        $(this).addClass('active');
        candlePeriod = $(this).attr("data-candlePeriod");

        mkChartsMain.clear();

        querykline(256,candlePeriod);

    })
}







