/* eslint no-console: ["error", { allow: ["log", "error"] }] */
const info = (...params) => { console.log(...params) }

const fallo = (...params) => { console.error(...params) }

module.exports = { info, fallo }
