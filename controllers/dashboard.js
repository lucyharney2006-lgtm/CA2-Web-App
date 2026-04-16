'use strict';

import logger from "../utils/logger.js";
import biomeStore from "../models/biome-store.js";

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
};

export default dashboard;
