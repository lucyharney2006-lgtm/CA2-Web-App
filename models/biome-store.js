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

addBiome(biome) {
    this.store.addCollection(this.collection, biome);
},

removeMob(id, mobId) {
    this.store.removeItem(this.collection, id, this.array, mobId);
},

removeBiome(id) {
    const biome = this.getBiome(id);
    this.store.removeCollection(this.collection, biome);
},


getUserBiomes(userid) {
  return this.store.findBy(this.collection, (biome => biome.userid === userid));
},

searchUserBiomes(search, userid) {
  return this.store.findBy(
    this.collection,
    (biome => biome.userid === userid && biome.title.toLowerCase().includes(search.toLowerCase())))
}, 



};

export default biomeStore;
