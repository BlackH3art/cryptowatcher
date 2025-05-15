import express from 'express';
import { handleSignIn } from './user.controller';

const router = express.Router();

router.post('/sign-in', handleSignIn);

export default router;