import express from 'express';
import { 
  handleFavouriteToken, 
  handleGetTokens,
  handleGetTotalTokensValue,
  handleUpdateToken
} from './tokens.controller';

const router = express.Router();

router.get('/', handleGetTokens);
router.patch('/:id', handleUpdateToken);
router.get('/total', handleGetTotalTokensValue);
router.patch('/favourite/:id', handleFavouriteToken);

export default router;