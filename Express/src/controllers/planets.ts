import { Request, Response } from "express";
import Joi, { number, string } from "joi";
import { db } from "../db";


const getAll = async (req: Request, res: Response) => { 
  const planets = await db.many(`SELECT * FROM planets;`)
  res.status(200).json(planets)
}

const getOneById = async (req: Request, res:Response) => { 
    const { id } = req.params
    //const planet = planets.find(p => p.id === Number(id))
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
      //planets = [...planets, newPlanet]
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

const createImage = async (req: Request, res: Response) => {
  console.log(req.file);
  const {id} = req.params;
  const filename = req.file?.path;

  if(filename){
    db.none(`UPDATE planets SET image=$2 WHERE id=$1`, [id, filename])
    res.status(201).json({ msg: 'Planet image upload successfully'})
  }else{
    res.status(400).json({ msg: 'Planet image failed to upload'})
  }
}

export {getAll, getOneById, create, updateById, deleteById, createImage}