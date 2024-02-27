import { Request, Response } from "express";
import Joi, { number, string } from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://user:password@localhost:5432//databasename")

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXIST planets;

  CREATE TABLE planets {
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  };
  `)

  await db.none(` INSERT INTO planets {name} VALUES {Earth}`)
  await db.none(` INSERT INTO planets {name} VALUES {Pluto}`)
  await db.none(` INSERT INTO planets {name} VALUES {Venus}`)

}

setupDb()


const getAll = async (req: Request, res: Response) => { 
  const planets = await db.many(`SELECT * FROM planets;`)
  res.status(200).json(planets)
}

const getOneById = async (req: Request, res:Response) => { 
    const { id } = req.params
    const planet = await db.one(`SELECT * FROM planets WHERE id=id;`, Number(id))
    res.status(200).json(planet)
}

// Joi library for validation:
const validateNewPlanet = Joi.object({
    //id: number().integer().required(),
    name: string().required()
})

const create = async (req: Request, res: Response)=> { 
    const { name } = req.body
    const newPlanet = { name }
    const validation = validateNewPlanet.validate(newPlanet)
    if(validation.error){
      res.status(400).json({ msg: validation.error })
    } else{
      await db.none(`INSERT INTO planets {name} VALUES ($1)`, name)
      res.status(201).json({ msg: 'The planet was created '})
    }
  
}

const updateById = async (req: Request, res: Response) => { 
    const { id } = req.params
    const { name } = req.body
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
    //planets = planets.map(p => p.id === Number(id) ? ({...p, name}) : p)
    res.status(200).json({ msg: 'The planet was updated '})
}

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params
    await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))
    //planets = planets.filter(p => p.id !== Number(id))
  
    res.status(200).json({ message: 'The planet was deleted' })
}

export {getAll, getOneById, create, updateById, deleteById}