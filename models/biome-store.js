'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const biomeStore = {

  store: new JsonStore('./models/biome-store.json', { biomeCollection: [] }),
  collection: 'biomeCollection',
  array: 'mobs',

  getAllBiomes() {
    return this.store.findAll(this.collection);
  },

  getBiome(id) {
    return this.store.findOneBy(this.collection, (biome => biome.id === id));
},

addMob(id, mob) {
    this.store.addItem(this.collection, id, this.array, mob);
},


};

export default biomeStore;
