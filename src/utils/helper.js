export const tbHeaderFormatter = (string) => {
  if (!string.search('_')) {
    return capitaliseString(string)
  } else {
    const array = string.split('_')
    const wordArray = array.map((word) => {
      return capitaliseString(word)
    })
    return wordArray.join(' ')
  }
}

const capitaliseString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
