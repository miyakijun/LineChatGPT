import 'reflect-metadata';
import express from 'express'
import Container from 'typedi'

import * as dotenv from 'dotenv' 
import  LineUtils  from './utils/LineUtils';
import LineController from './controllers/LineController';
import { useContainer, useExpressServer } from 'routing-controllers';
dotenv.config()
const app = express()
app.use(express.json())

useContainer(Container);
useExpressServer(app, {
  controllers: [LineController], 
});


const server = app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`),
)
