const { Router } = require('express');
const { Recipe, Diet } = require('../db.js');
const axios = require('axios')
const {
  API_KEY
} = process.env

const { getAllRecipes } = require("../controladores/getAllRecipes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/recipes', async (req, res) => {
  const { name } = req.query;
  let recipesTotal = await getAllRecipes();
  if (name) {
    let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase())); // siempre buscar en minuscula para tener todos los datos iguales 
    if(recipeName.length){
      res.status(200).send(recipeName)
    }else{
      res.status(404).send('No se encontro la receta');
    }
  } else {
    res.status(200).send(recipesTotal);
  }



})



router.get('/recipes/:id', async (req, res) => {
    // const id = req.params.id;
    const {id} = req.params;
    const allRecipes = await getAllRecipes();
    if (id) {
      let recipesById = await allRecipes.filter(e => e.id == id);
      if(recipesById.length){
        res.status(200).send(recipesById)
      }else{
        res.status(404).send('EL ID NO EXISTE')
      }
  
    }
  })
  






  router.post('/recipes', async (req, res) => {
    let {
      // id,
      name,
      image,
      summary,
      puntuacion,
      nivelDeComidaSaludable,
      pasoAPaso,
      // createdInDb,
      diets
    } = req.body;
  
    if (name && summary) {
      let recipeCreated = await Recipe.create({
        // id,
        name, 
        image,
        summary, 
        puntuacion,
        nivelDeComidaSaludable,
        pasoAPaso,
        // createdInDb: createdInDb
      })
  
      const dietDb = await Diet.findAll({
        where: { name: diets},
      })
      
  
  
      await recipeCreated.addDiet(dietDb)
      res.status(200).send('Receta creada con éxitos')
    } else {
      res.status(404).send("error")
    }
  })
  router.get('/types', async (req, res) => {

    try{
     const diet = await Diet.bulkCreate([
          {name: "gluten free"},
          {name: "lacto ovo vegetarian"},
          {name: "vegan"},
          {name: "pescatarian"},
          {name: "paleolithic"},
          {name: "primal"},
          {name: "fodmap friendly"},
          {name: "dairy free"},
          {name: "whole 30"}]);


      res.send(diet);
  }catch(e){

     const dites = await Diet.findAll();

     res.send(dites);

  }

});



module.exports = router;
