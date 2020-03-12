const { isMainThread, parentPort } = require('worker_threads');
const moment = require('moment');
const _ = require('lodash');



const convertToSeconds = (num) => {
    return (num / 1000000).toFixed(6) * 1;
}

if (!isMainThread) {
    let ohlcData = {};
    parentPort.on('message', (message) => {
    const checkBarNum = (seconds) => {
        const startTime = moment(convertToSeconds(message.startTime));
        const currentTime = moment(convertToSeconds(seconds));
        const difference = currentTime.diff(startTime, 'seconds');
        if(difference === 0) {
            return 1;
        }
        return _.ceil(_.divide(difference,15));
    }
    let currentBar = checkBarNum(message.TS2);
    setOhlcData(message,currentBar,ohlcData);
    console.log('ohlcData: ', ohlcData);
    });

}

const setOhlcData = (message, bar_num, consolidatedData) => {
    const tradeData = message;
    // console.log('tradeData: ', tradeData);
    const setNewTrade = (bar,volume = null) => {
        if(!volume){
            consolidatedData[tradeData.sym] = [];
        }
        const stockName = tradeData.sym;
        consolidatedData[stockName].push({
        event: "ohlc_notify",
        symbol: stockName,
        bar: bar,
        o: tradeData.P,
        h: tradeData.P,
        l: tradeData.P,
        c: tradeData.P,
        volume: !volume ? tradeData.Q : volume,
        timeStamp : tradeData.TS2
        });
    }
    
    if(!consolidatedData[tradeData.sym]) {
        setNewTrade(bar_num);
    } else {
       const previousTrades = consolidatedData[tradeData.sym];
       const latestTrade = previousTrades[previousTrades.length - 1];
       if(latestTrade.bar === bar_num) {
           latestTrade.c = 0.0;
           consolidatedData[tradeData.sym].push({
            event: "ohlc_notify",
            symbol: tradeData.sym,
            o: latestTrade.o,
            bar: bar_num,
            h: tradeData.P > latestTrade.h ? tradeData.P : latestTrade.h,
            l: tradeData.P < latestTrade.l ? tradeData.P : latestTrade.l,
            c: tradeData.P,
            volume: _.add(tradeData.Q, latestTrade.volume),
            timeStamp: tradeData.TS2
          });
       } else {
           setNewTrade(bar_num, latestTrade.volume);
       }
    }
}
