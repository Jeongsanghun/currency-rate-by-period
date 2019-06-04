var axios = require('axios')
var urlArr = ['https://api.exchangeratesapi.io/history', 'https://api.exchangeratesapi.io/latest']

/**
 *
 * @param {String} base
 * @param {String} target
 * @param {Array<Date>} dateRange
 * @returns {Boolean}
 */
function validator(base, target, dateRange) {
    var now = new Date()
    var nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
    var baseCurrency = `USD,JPY,BGN,CZK,DKK,GBP,HUF,PLN,RON,SEK,CHF,ISK,NOK,HRK,RUB,TRY,AUD,BRL,CAD,CNY,HKD,IDR,ILS,INR,KRW,MXN,MYR,NZD,PHP,SGD,THB,ZAR`
    var isCurrency = baseCurrency.includes(base) && baseCurrency.includes(target) && base !== ''
    var beforeNow = true
    if (dateRange) {
        dateRange.forEach(v => {
            beforeNow = beforeNow && (nowDate >= v)
        })
    }
    return isCurrency && beforeNow
}

/**
 *
 * @param {String} base
 * @param {String} target
 * @param {Array<Date>} dateRange
 * @returns {Promise<Object>}
 */
function getCurrency(base, target, dateRange) {
    var url = `${urlArr[1]}`
    if (!validator(base, target, dateRange)) {
        return
    }
    var params = {
        base: base
    }
    if (dateRange) {
        if (dateRange[0] > dateRange[1]) {
            params.start_at = dateRange[1]
            params.end_at = dateRange[0]
        }
        params.start_at = dateRange[0]
        params.end_at = dateRange[1]
        url = `${urlArr[0]}`
    }
    return axios.get(url, {
        params
    })
}

/**
 *
 * @param {Object} data : getCurrency
 * @param {String} target
 */
function makeArr(data, target) {
    var results = []
    var response = data.data
    console.log(response)
    for (let date in response.rates) {
        results.push([date, response.rates[date][target]])
    }
    return results.sort(function (a, b) {
        return (new Date(a[0])).getTime() - (new Date(b[0])).getTime()
    }).map(v => {
        return [v[0], v[1]]
    })
}

/**
 *
 * @param {Object} data : makeArr
 */
function getSummary(data) {
    if (!data) {
        return
    }
    return data.reduce((p, cv, i) => {
        if (Object.keys(p).length <= 0) {
            p = {
                max: cv[1],
                sum: 0,
                length: (i + 1),
                avg: Math.floor(1000 * p.sum / p.length) / 1000
            }
        }
        if (p.max <= cv[1]) {
            p.max = cv[1]
        }
        p['sum'] = p['sum'] + cv[1]
        p['length'] = (i + 1)
        p['avg'] = Math.floor(1000 * p.sum / p.length) / 1000
        return p
    }, {})
}

module.exports = {
    validator,
    getCurrency,
    makeArr,
    getSummary
}
