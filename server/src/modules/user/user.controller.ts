import { Request, Response } from 'express';
import { Prisma } from '../../../prisma/generated/prisma';
import { getUserByUsername } from './user.service';
import jwt from 'jsonwebtoken';

export const handleSignIn = async (
  req: Request<any, any, Prisma.UserCreateInput>,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await getUserByUsername({ username });

    if (!user) {
      res.status(404).json({ error: 'User doesn\'t exist' });
    } else {
      // no password hashing for simplicity
      if (user.password !== password) {
        res.status(401).json({ error: 'Invalid credentials' });
      } else {
        const safeUser = {
          id: user.id,
          username: user.username,
        };
        const token = jwt.sign({ user: safeUser }, process.env.JWT_SECRET as string);
    
        res.status(200).json({ user: safeUser, token });
      }

    }

  } catch (error) {
    console.log('Failed to sign in: ', error);
    throw new Error('Failed to sign in.');
  }
};

