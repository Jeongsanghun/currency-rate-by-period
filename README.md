# currency-rate-by-period [![npm version](https://badge.fury.io/js/currency-rate-by-period.svg)](https://badge.fury.io/js/currency-rate-by-period)

기간별 환율 정보를 가져옵니다.

## 설치
```bash
npm i currency-rate-by-period
```


## 사용방법

```javascript
var cr = require("currency-rate-by-period")
var base = "KRW"
var target = "USD"
var dateRange = ['2019-5-26','2019-6-1']

// 기간별
cr.getCurrency(base,target,dateRange).then((res)=>{
    console.log(res.data)

    // 배열
    var arr = cr.makeArr(res,"USD")
    console.log(arr)

    // 요약
    var sm = cr.getSummary(arr)
    console.log(sm)
})

// 가장 최근 환율
cr.getCurrency(base,target).then((res)=>{
    console.log(res.data)
})
```

