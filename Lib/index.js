const matcher = (...args) => {
  const searchStr = `(${args.join('|')})`
  const regexpString = `(?<=^|\\P{L})${searchStr}(?=\\P{L}|$)`
  return new RegExp(regexpString, 'iu')
}

module.exports = {
  matcher
}
