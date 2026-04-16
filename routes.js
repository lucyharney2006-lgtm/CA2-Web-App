'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';//importing dashboard file
import about from './controllers/about.js';//importing about file
import biome from './controllers/biome.js';
import stats from './controllers/stats.js';



router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);//getting dashboard view
router.get('/about', about.createView);//getting about view
router.get('/biome/:id', biome.createView);
router.get('/biome/:id/deletemob/:mobid', biome.deleteMob);
router.get('/dashboard/deletebiome/:id', dashboard.deleteBiome);
router.get('/stats', stats.createView);




router.post('/biome/:id/addmob', biome.addMob);
router.post('/dashboard/addbiome', dashboard.addBiome);




export default router;
