const DataFormatter = ({ data, period }) => {
  const groupBy = (array, keyGetter) => {
    return array.reduce((map, item) => {
      const key = keyGetter(item)
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key).push(item)
      return map
    }, new Map())
  }

  const getPeriodKey = (date, period) => {
    const parsedDate = new Date(date)

    switch (period) {
      case 'weekly': {
        const startOfWeek = new Date(
          parsedDate.setDate(parsedDate.getDate() - parsedDate.getDay())
        )
        return startOfWeek.toISOString().split('T')[0]
      }
      case 'monthly': {
        return `${parsedDate.getFullYear()}-${String(
          parsedDate.getMonth() + 1
        ).padStart(2, '0')}`
      }
      case 'quarterly': {
        const quarter = Math.floor(parsedDate.getMonth() / 3) + 1
        return `${parsedDate.getFullYear()}-Q${quarter}`
      }
      case 'yearly': {
        return `${parsedDate.getFullYear()}`
      }
      default:
        return date
    }
  }

  const getFormattedData = (transactions, period) => {
    const groupedData = groupBy(transactions, transaction =>
      getPeriodKey(transaction.transactionDate, period)
    )

    return Array.from(groupedData.entries())
      .map(([key, items]) => ({
        name: key,
        amount: items.reduce((sum, item) => sum + item.transactionAmount, 0),
        conductedLessons: items.reduce(
          (sum, item) => sum + item.totalConductedLessons,
          0
        ),
        substitutedLessons: items.reduce(
          (sum, item) => sum + item.totalSubstitutedLessons,
          0
        ),
      }))
      .sort((a, b) => {
        if (a.name.includes('Q') && b.name.includes('Q')) {
          const [yearA, quarterA] = a.name.split('-Q').map(Number)
          const [yearB, quarterB] = b.name.split('-Q').map(Number)
          return yearA - yearB || quarterA - quarterB
        }
        return new Date(a.name) - new Date(b.name)
      })
  }

  return getFormattedData(data.transactions, period)
}

export default DataFormatter
