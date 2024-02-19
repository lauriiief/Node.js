import express from 'express'
import 'express-async-errors'
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


app.get('/', (req, res) => { 
    res.status(200).json(planets)
})

app.post('api/planets', (req, res) => {
  const { id, name } = req.body
  const newPlanet = {id, name}
  planets = [...planets, newPlanet]

  res.status(201).json({ message: 'The planet was created '})

})
  
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
