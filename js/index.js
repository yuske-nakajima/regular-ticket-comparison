(async () => {
    // DOM 取得
    /**
     * @type {HTMLInputElement}
     */
    const period = document.getElementById('period')
    const ticketPrice = document.getElementById('ticket-price')
    const ticketPriceMemo = document.getElementById('ticket-price-memo')
    const regularPrice = document.getElementById('regular-price')
    const regularPriceMemo = document.getElementById('regular-price-memo')
    const startDate = document.getElementById('start-date')
    const endDate = document.getElementById('end-date')
    const priceCalc = document.getElementById('price-calc')


    /**
     * @type {(HTMLInputElement)[]}
     */
    const inputList = [period, ticketPrice, ticketPriceMemo, regularPrice, regularPriceMemo, startDate, endDate]

    /**
     * @type {HTMLElement}
     */
    const resultArea = document.getElementById('result-area')
    const result = document.getElementById('result')
    const dayOfWeekArea = document.getElementById('day-of-week-checkbox-area')

    // トリガー定義
    priceCalc.addEventListener('click', () => {
        resultArea.removeAttribute('class')
        startToEndPeriodCalc(startDate, endDate, result, ticketPrice.value, regularPrice.value)
        setQueryParameters(inputList)
    })

    period.addEventListener('change', () => {
        startValueFromEndValue(startDate, endDate, period.value)
    })

    startDate.addEventListener('change', () => {
        startValueFromEndValue(startDate, endDate, period.value)
    })

    for (const item of inputList) {
        item.addEventListener('change', () => {
            saveLocalStorageFromInputList(inputList)
            setQueryParameters(inputList)
        })
    }

    // メイン処理
    // 開始・終了 Input要素 日付処理
    const startDay = moment().add('months', 1).startOf('month')
    await flatpickrInit({id: startDate.getAttribute('id'), defaultDate: startDay.toDate()})
    endDate.value = formatDate(monthLater(period.value, startDay).toDate())

    // 曜日Checkbox List 作成
    addItemDayOfWeekInput(dayOfWeekArea)

    // URLパラメータをlocal storageに保存
    getQueryParametersToLocalStorage()

    // Local Storageから各Input要素の値を呼び出し
    getLocalStorageToInputList(inputList)

    await startValueFromEndValue(startDate, endDate, period.value)
})()
