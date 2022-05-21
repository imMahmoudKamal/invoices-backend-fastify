'use strict';

import path from 'path';
import AutoLoad from 'fastify-autoload';
import mongoose from 'mongoose';
import { dbConnect } from './config/db.js';

export default async function (fastify, opts) {
  // connect mongoDB

  const dbConnected = await dbConnect();
  console.log(`\x1b[2m${new Date().toLocaleTimeString('it-IT')}\x1b[0m`, `\x1b[32m✨ ${dbConnected} \x1b[0m`);

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(path.resolve(), 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(path.resolve(), 'routes'),
    options: Object.assign({}, opts),
  });

  // enable cors
  // fastify.register(require('@fastify/cors'), {
  //   origin: true,
  //   methods: ['GET', 'PATCH', 'OPTIONS', 'POST', 'DELETE'],
  // });
}
