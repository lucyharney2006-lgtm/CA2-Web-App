'use strict';

import appStore from "../models/app-store.js";
import accounts from './accounts.js';
import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';



const about = {
createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!");
    
    if (loggedInUser) {
      const viewData = {
        title: 'About the Minecraft App',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        users: userStore.getAllUsers(),
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
}
};


export default about;