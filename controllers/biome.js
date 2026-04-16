'use strict';

import logger from '../utils/logger.js';
import biomeStore from '../models/biome-store.js';

const biome = {
  createView(request, response) {
    const biomeId = request.params.id;
    logger.debug(`Biome id = ${biomeId}`);
    
    const viewData = {
      title: 'Biome',
      singleBiome: biomeStore.getBiome(biomeId)
    };

    response.render('biome', viewData);
  },
};

export default biome;
