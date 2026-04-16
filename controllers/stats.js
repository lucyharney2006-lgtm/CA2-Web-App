"use strict";
import logger from "../utils/logger.js";
import biomeStore from "../models/biome-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const biomes = biomeStore.getAllBiomes();

    let numBiomes = biomes.length;
    
    let numMobs = biomes.reduce((total, biome) => total + biome.mobs.length, 0);
	
	  let average = numBiomes > 0 ? (numMobs / numBiomes).toFixed(2) : 0;


    const statistics = {
      displayNumBiomes: numBiomes,
      displayNumMobs: numMobs,
	    displayAverage: average
    }

    const viewData = {
      title: "Minecraft App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
