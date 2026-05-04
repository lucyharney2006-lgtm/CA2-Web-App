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

  async addBiome(biome, file, response) {
    try {
      biome.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, biome);
      response();
    } catch (error) {
      logger.error("Error processing biome:", error);
      response(error);
    }
  },


  async removeBiome(id, response) {
    const biome = this.getBiome(id);

    if (biome.picture && biome.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(biome.picture.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    this.store.removeCollection(this.collection, biome);
    response();
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
