// connection command for displaying entires: node mongo.js pswd
// for addind entry : node mongo.js pswd name number

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const password = process.argv[2]

const url = `mongodb+srv://kayttaja:${password}@cluster0.xnv0g3b.mongodb.net/phoneBookDB?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (process.argv.length > 3) {
  mongoose
    .connect(url)
    .then((result) => {

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook `)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

else {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('Phonebook:')

    Person.find({})
    .then(entries => {
      entries.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`)
      })
      return mongoose.connection.close()
    })
  })
}