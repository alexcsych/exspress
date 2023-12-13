module.exports.errHandler = (err, req, res, next) => {
  console.log('error handler', err)

  const errMsg = err.message ?? `${err}`

  if (errMsg.includes('validation failed')) {
    return res.status(400).send({ error: errMsg })
  } else if (errMsg.includes('not found')) {
    return res.status(404).send({ error: errMsg })
  } else {
    return res.status(500).send({ error: errMsg })
  }
}
