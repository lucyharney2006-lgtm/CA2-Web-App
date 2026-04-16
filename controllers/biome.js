'use strict';

import logger from '../utils/logger.js';
import biomeStore from '../models/biome-store.js';
import { v4 as uuidv4 } from 'uuid';

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


addMob(request, response) {
    const biomeId = request.params.id;
    const biome = biomeStore.getBiome(biomeId);
    const newMob = {
      id: uuidv4(),
      title: request.body.title,
      type: request.body.type,
    };
    biomeStore.addMob(biomeId, newMob);
    response.redirect('/biome/' + biomeId);

},

deleteMob(request, response) {
    const biomeId = request.params.id;
    const mobId = request.params.mobid;
    logger.debug(`Deleting Mob  $(mobId} from Biome ${biomeId}`);
    biomeStore.removeMob(biomeId, mobId);
    response.redirect('/biome/' + biomeId);
},


};
export default biome;
