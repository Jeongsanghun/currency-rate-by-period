var currency = require('..')

console.log(`test start : ${new Date()}`)
describe('validation check', () => {
    it('정상 입력시 입력값 체크', () => {
        expect(currency.validator('KRW', 'USD', ['2019-5-1', '2019-6-3'])).toBe(true)
    })
    it('base에 비정상 입력시 입력값 체크', () => {
        expect(currency.validator('test', 'USD', ['2019-5-1', '2019-6-3'])).toBe(false)
    })
    it('target에 비정상 입력시 입력값 체크', () => {
        expect(currency.validator('KRW', 'test', ['2019-5-1', '2019-6-3'])).toBe(false)
    })
    it('dateRange에 비정상 입력시 입력값 체크', () => {
        expect(currency.validator('KRW', 'USD', ['2019-5-1', '2019-8-3'])).toBe(false)
    })
    it('모두 비정상 입력시 입력값 체크', () => {
        expect(currency.validator('KRW', 'test', ['2019-5-1', '2019-8-3'])).toBe(false)
    })
})


describe('request api', () => {
    it('정상 입력시 입력값 체크', () => {
        return currency.getCurrency('KRW', 'USD', ['2019-5-26', '2019-6-3']).then((res) => {
            expect(res).toBeDefined()
        })
    })
    it('날짜 반대로 입력시 입력값 체크', () => {
        return currency.getCurrency('KRW', 'USD', ['2019-6-3', '2019-5-26']).then((res) => {
            expect(res).toBeDefined()
        })
    })
    it('날짜 미입력시 입력값 체크', () => {
        return currency.getCurrency('KRW', 'USD').then((res) => {
            expect(res).toBeDefined()
        })
    })
    it('비정상 입력시 입력값 체크', () => {
        expect(typeof currency.getCurrency('KRW', 'test', ['2019-5-26', '2019-6-3'])).toBe('undefined')
    })
    it('비정상 입력시 입력값 체크2', () => {
        expect(typeof currency.getCurrency('test2', 'test1', ['2019-5-26', '2019-6-3'])).toBe('undefined')
    })
})


describe('summary test', () => {
    it('정상 입력시 배열값으로 만들어주는지 체크', () => {
        return currency.getCurrency('KRW', 'USD', ['2019-5-26', '2019-6-3']).then((res) => {
            expect(currency.makeArr(res.data, 'USD')).toBeDefined()
        })
    })

    it('날짜 미입력시에도 배열값으로 만들어주는지 체크', () => {
        return currency.getCurrency('KRW', 'USD').then((res) => {
            expect(currency.makeArr(res.data, 'USD')).toBeDefined()
        })
    })

    it('정상 입력시 요약데이터를 만들어주는지 체크', () => {
        return currency.getCurrency('KRW', 'USD', ['2019-5-26', '2019-6-3']).then((res) => {
            expect(currency.getSummary(currency.makeArr(res.data, 'USD'))).toBeDefined()
        })
    })
    it('데이터 미입력시 요약을 안해주는지 체크', () => {
        expect(typeof currency.getSummary()).toBe('undefined')
    })
})
