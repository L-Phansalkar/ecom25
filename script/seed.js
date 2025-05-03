'use strict'
const db = require('../server/db')
const {User, Product, Order, productOrder} = require('../server/db/models');

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Big Mouth Billy Bass The Singing Sensation',
      image: 'https://i.ebayimg.com/images/g/JQ4AAOSw2w5gDO6t/s-l500.jpg',
      description: 'The original singing fish!',
      price: '9.99',
      inventory: '26',
      year: '1998',
      songs: "Take Me To The River, Don't Worry Be Happy",
      stripe: 'price_1LqiVwLVr6OUxlRlXarYijRo',
    }),
    Product.create({
      name: 'Big Mouth Billy Bass Sings For The Holidays V1',
      image:
        'https://i.etsystatic.com/12164314/r/il/689569/3331563655/il_fullxfull.3331563655_bmk6.jpg',
      description:
        'A Christmas themed version of Billy Bass. He wears a Santa hat and has a small jingle bell wrapped around his tail.',
      price: '9.99',
      inventory: '26',
      year: '1999',
      songs:
        'Blues version of Twas The Night Before Christmas (which is a parody of Trouble by Elvis Presley)',
      stripe: 'price_1LqiW9LVr6OUxlRlJkfcX62N',
    }),
    Product.create({
      name: 'Big Mouth Billy Bass Sings For The Holidays V2',
      image:
        'https://i.etsystatic.com/12164314/r/il/689569/3331563655/il_fullxfull.3331563655_bmk6.jpg',
      description:
        'A Christmas themed version of Billy Bass. He wears a Santa hat and has a small jingle bell wrapped around his tail.',
      price: '9.99',
      inventory: '26',
      year: '2000',
      songs: 'Country versions of Jingle Bells and Up On A Housetop',
      stripe: 'price_1LqiWPLVr6OUxlRlrPqJ0FRz',
    }),
  ]);

  const orders = await Promise.all([Order.create({userId: '1'})]);
  const productOrders = await Promise.all([
    productOrder.create({productId: '2', quantity: '3', orderId: '1'}),
  ]);
  

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded ${productOrders.length} productOrders`);
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
