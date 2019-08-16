import crawlEndpoint from '../endpoints/crawl.endpoint';
import express from 'express';

const router = express.Router();
router.post('/crawl', crawlEndpoint);

export default router;