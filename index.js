  const express = require('express')
  const cors = require('cors')
  const app = express()
  app.use(express.static('build'))
  app.use(cors())
  app.use(express.json())

  const Poruka = require('./models/poruka')
  
    
  app.get('/', (req, res) =>{
    res.send('<h1>Pozdrav od Express servera!</h1>')
  })
  
  app.get('/api/poruke', (req, res) => {
    Poruka.find({}).then(rezultat =>{
      res.json(rezultat)}
    )
  })

  app.get('/api/poruke/:id', (req, res, next) =>{
    Poruka.findById(req.params.id)
    .then(rezultat => {
        if (rezultat) {
        res.json(rezultat)
        } else {
        res.status(404).end()
        }
       
    })
    .catch(err => {
      next(err)
      })

    /*const id = Number(req.params.id)
    const poruka = poruke.find(p => p.id === id)
    
    if (poruka){
      res.json(poruka)
    } else {
      res.status(404).end()
    }*/
  })

  app.delete('/api/poruke/:id', (req, res, next) => {
    Poruka.findByIdAndRemove(req.params.id).then(rezultat =>{
      console.log("podatak izbrisan");
      res.status(204).end()
    })
    .catch(err => next(err))
    const id = Number(req.params.id)
    console.log("Brisem poruku sa ID:", id);
    //poruke = poruke.filter(p => p.id !== id)
  
    res.status(204).end()
  })
  
  app.post('/api/poruke', (req, res, next) => {
    const podatak = req.body
   
    const poruka = new Poruka({
    sadrzaj: podatak.sadrzaj,
    vazno: podatak.vazno || false,
    datum: new Date()
    })
    poruka.save()
    .then(spremljenaPoruka => {
    res.json(spremljenaPoruka)
    })
    .catch(err => next(err))
   })
   

  app.put('/api/poruke/:id', (req, res, next) => {
    const podatak = req.body
    const id = req.params.id
    const poruka = {
    sadrzaj: podatak.sadrzaj,
    vazno: podatak.vazno
    }
    Poruka.findByIdAndUpdate(id, poruka, {new: true})
    .then( novaPoruka => {
    res.json(novaPoruka)
    })
    .catch(err => next(err))
   })
   

  const generirajId = () => {
    const maxId = poruke.length > 0
      ? Math.max(...poruke.map(p => p.id))
      : 0
    return maxId + 1
  }


  const errorHandler = (err, req, res, next ) => {
    console.log(err.message);
    if (err.name === 'CastError') {
    return res.status(400).send({error: 'krivi format ID-a'})
    }
    next(err)
   }

   function zadnjiErrorHandler (err, req, res, next) {
    res.status(500).send('error', { error: err })
   }
   
   app.use(errorHandler)
   app.use(zadnjiErrorHandler)


  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
  })