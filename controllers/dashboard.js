'use strict';

import logger from "../utils/logger.js";
import biomeStore from "../models/biome-store.js";
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';



const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const biomes = searchTerm
        ? biomeStore.searchUserBiomes(searchTerm, loggedInUser.id)
        : biomeStore.getUserBiomes(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = biomes;

      if (sortField) {
        sorted = biomes.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === "rating") {
            return (a.rating - b.rating) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: "Minecraft App Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        biomes: sortField ? sorted : biomes,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ratingSelected: request.query.sort === "rating",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };
      
      logger.info('about to render' + viewData.biomes);
      
      response.render('dashboard', viewData);
    }
    else response.redirect('/');

  },

  addBiome(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
	
    const newBiome = {
      userid: loggedInUser.id,
      id: uuidv4(),
      title: request.body.title,
      rating: parseInt(request.body.rating),
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
