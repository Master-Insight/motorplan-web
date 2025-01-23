export function convertToJSON(values) {
  const headers = values[0]
  return values.slice(1).map((row) =>
    headers.reduce((obj, header, index) => {
      obj[header] = row[index]
      return obj
    }, {})
  )
}