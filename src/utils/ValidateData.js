export const validateData = (data) => {
  return data.every(
    item =>
      item.name &&
      typeof item.amount === 'number' &&
      typeof item.conductedLessons === 'number' &&
      typeof item.substitutedLessons === 'number'
  )
}