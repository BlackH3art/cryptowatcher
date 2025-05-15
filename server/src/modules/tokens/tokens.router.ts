import express from 'express';
import { 
  handleFavouriteToken, 
  handleGetTokens,
  handleUpdateToken
} from './tokens.controller';

const router = express.Router();

router.get('/', handleGetTokens);
router.patch('/:id', handleUpdateToken);
router.patch('/favourite/:id', handleFavouriteToken);

export default router;