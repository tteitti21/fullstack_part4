const cmd = (...params) => {
  console.log(...params)
}

const cmdE = (...params) => {
  console.error(...params)
}

module.exports = {
  cmd, cmdE
}