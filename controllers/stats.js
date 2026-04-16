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

      let totalRating = biomes.reduce((total, biome) => total + parseInt(biome.rating), 0);
      let avgRating = numBiomes > 0 ? totalRating/numBiomes : 0;

      let maxRating = Math.max(...biomes.map(biome => biome.rating));
let maxRated = biomes.filter(biome => biome.rating === maxRating);
let favTitles = maxRated.map(item => item.title);



    const statistics = {
      displayNumBiomes: numBiomes,
      displayNumMobs: numMobs,
	  displayAverage: average,
      displayAvgRating: avgRating.toFixed(2),
	  highest: maxRating,
      displayFav: favTitles
    }

    const viewData = {
      title: "Minecraft App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
