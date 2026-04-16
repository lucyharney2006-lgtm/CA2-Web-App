'use strict';

import logger from "../utils/logger.js";
import biomeStore from "../models/biome-store.js";
import { v4 as uuidv4 } from 'uuid';


const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    
    
    const viewData = {
      title: "Minecraft App Dashboard",
      biomes: biomeStore.getAllBiomes()
    };

    
    logger.debug(viewData.biomes);

    response.render('dashboard', viewData);
  },

  addBiome(request, response) {
    const newBiome = {
      id: uuidv4(),
      title: request.body.title,
      mobs: [],
    };
    biomeStore.addBiome(newBiome);
    response.redirect('/dashboard');
},

deleteBiome(request, response) {
    const biomeId = request.params.id;
    logger.debug(`Deleting Biome ${biomeId}`);
    biomeStore.removeBiome(biomeId);
    response.redirect("/dashboard");
},


  
};

export default dashboard;
