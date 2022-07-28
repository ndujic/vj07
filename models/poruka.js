const mongoose = require('mongoose')
const password = process.env.ATLAS_PASS
const dbname = 'poruke-api'
const url = `mongodb+srv://ndujic:${password}@cluster0.qxgzze9.mongodb.net/${dbname}?retryWrites=true&w=majority`
const porukaSchema = new mongoose.Schema({
    sadrzaj: {
    type: String,
    minlength: 5,
    required: true
    },
    datum: {
    type: Date,
    required: true
    },
    vazno: {
    type: Boolean,
    default: false
    }
   }) 

porukaSchema.set('toJSON', {
    transform: (doc, ret) => {
    ret.id = doc._id.toString()
    delete ret._id
    delete ret.__v
    return ret
    }
   })
   

const Poruka = mongoose.model('Poruka', porukaSchema, 'Poruke')

console.log("Spajamo se na bazu")
mongoose.connect(url)
 .then(result => {
 console.log("Spojeni smo na bazu");
 })
 .catch(error => {
 console.log("Greška pri spajanju", error.message);
 }) 


module.exports = Poruka;
