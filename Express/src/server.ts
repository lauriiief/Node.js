import express from 'express'
import 'express-async-errors'
import Joi, { number, string } from 'joi'
import morgan from 'morgan'
import { deleteById, getAll, getOneById, updateById, create, createImage } from './controllers/planets'
import { login, signup } from './controllers/users'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })

const app = express()
const port = 3000

app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'))
app.use(express.json())


//GET /api/planets: return all planets (JSON) with 200
app.get('/api/planets', getAll)

//GET /api/planets/:id: return a planet (JSON) by id with 200
app.get('/api/planets/:id', getOneById)

//POST /api/planets: create a planet, return only 201 code and a success JSON with key msg
app.post('/api/planets', create)

//PUT /api/planets/:id: update a planet by id, return only 200 code and a success JSON with key msg
app.put('/api/planets/:id', updateById)

//DELETE /api/planets/:id: delete a planet by id, return only 200 code and a success JSON with key msg
app.delete('/api/planets/:id', deleteById)

// Set POST /planets/:id/image route for file upload (planet's image).
app.post('/api/planets/:id/image', upload.single('image'), createImage)

app.post('/api/users/login', login)

app.post('/api/users/signup', signup)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
