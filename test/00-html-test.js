let test = require('tape')
let tiny = require('tiny-json-http')
let sandbox = require('@architect/architect').sandbox

test('env', t => {
  t.plan(1)
  t.ok(sandbox, 'sandbox')
})

let end // saves a reference to be used later to shut down the sandbox
test('sandbox.start', async t => {
  t.plan(1)
  end = await sandbox.start()
  t.ok(true, 'opened')
})

/**
 * get 200 from the / route
 */
test('get /', async t => {
  t.plan(1)
  try {
    let url = 'http://localhost:3333'
    let result = await tiny.get({url})
    t.ok(true, 'got result',console.log(result.toString().substring(50) + '...'))
    console.log(result.body)
  } 
  catch(e) {
    t.fail(e)
    console.log(e)
  }
})

/**
 * get 404 from the non-existent /foo route
 */
test('get /foo', async t => {
  t.plan(1)
  try {
    let url = 'http://localhost:3333/foo'
    let result = await tiny.get({url})
    t.fail('did not fail')
  } 
  catch(e) {
    t.ok(true, 'caught fail')
    console.log(e.message)
  }
})

test('shut down the sandbox', t=> {
  t.plan(1)
  end()
  t.ok(true, 'shutdown successfully')
})
