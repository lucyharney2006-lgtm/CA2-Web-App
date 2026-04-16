"use strict";
import logger from "../utils/logger.js";
import biomeStore from "../models/biome-store.js";
import accounts from './accounts.js';


const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      // app statistics calculations
      const biomes = biomeStore.getAllBiomes();

      let numBiomes = biomes.length;

      let numMobs = biomes.reduce((total, biome) => total + biome.mobs.length, 0);

      let average = numBiomes > 0 ? (numMobs / numBiomes).toFixed(2) : 0;

      let totalRating = biomes.reduce((total, biome) => total + parseInt(biome.rating), 0);

      let avgRating = numBiomes > 0 ? totalRating / numBiomes : 0;

      let maxRating = Biomes.length > 0 ? Math.max(...Biomes.map(biome => biome.rating)) : 0;
      let maxRated = Biomes.filter(biome => biome.rating === maxRating);
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
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName
      };

      response.render("stats", viewData);
    }
    else response.redirect('/');
  }
};

export default stats;
