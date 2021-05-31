import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const STATIC_PATH = path.join(__dirname, '../client');
console.log(STATIC_PATH);

export const staticMiddleware = express.static(STATIC_PATH);
