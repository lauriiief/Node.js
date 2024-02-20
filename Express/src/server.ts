import express from 'express'
import 'express-async-errors'
import Joi, { number, string } from 'joi'
import morgan from 'morgan'

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())

type Planet = {
    id: number,
    name: string,
};

type Planets = Planet[];

let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];


//GET /api/planets: return all planets (JSON) with 200
app.get('/api/planets', (req, res) => { 
    res.status(200).json(planets)
})

//GET /api/planets/:id: return a planet (JSON) by id with 200
app.get('/api/planets/:id', (req, res) => { 
    const { id } = req.params
    const planet = planets.find(p => p.id === Number(id))
    res.status(200).json(planet)
})

// Joi library for validation:
const validateNewPlanet = Joi.object({
  id: number().integer().required(),
  name: string().required()
})

//POST /api/planets: create a planet, return only 201 code and a success JSON with key msg
app.post('/api/planets', (req, res) => { 
  const { id, name } = req.body
  const newPlanet = {id, name}
  const validation = validateNewPlanet.validate(newPlanet)
  if(validation.error){
    res.status(400).json({ msg: validation.error })
  } else{
    planets = [...planets, newPlanet]
    res.status(201).json({ msg: 'The planet was created '})
  }

})

//PUT /api/planets/:id: update a planet by id, return only 200 code and a success JSON with key msg
app.put('/api/planets/:id', (req, res) => { 
  const { id } = req.params
  const { name } = req.body
  planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)
  res.status(200).json({ msg: 'The planet was updated '})
})

//DELETE /api/planets/:id: delete a planet by id, return only 200 code and a success JSON with key msg
app.delete('/api/planets/:id', (req, res) => {
  const { id } = req.params
  planets = planets.filter(p => p.id !== Number(id))

  res.status(200).json({ message: 'The planet was deleted' })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
