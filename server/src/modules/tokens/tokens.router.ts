import express from 'express';
import { 
  handleFavouriteToken, 
  handleGetTokens,
  handleGetTokenById,
  handleGetTotalTokensValue,
  handleUpdateToken
} from './tokens.controller';

const router = express.Router();

router.get('/', handleGetTokens);
router.get('/:id', handleGetTokenById);
router.patch('/:id', handleUpdateToken);
router.get('/total', handleGetTotalTokensValue);
router.patch('/favourite/:id', handleFavouriteToken);

export default router;