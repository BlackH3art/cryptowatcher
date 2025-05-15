import { Request, Response } from 'express';
import { createManyTokens, getTokens, updateTokenData, updateTokenFavourite } from './tokens.service';
import { getCoinsDetailsForTickers, getCoinsPricesForTickers } from '../coins/coins.service';
import { TICKERS } from '../../utils/constants/tickers';
import { Prisma } from '../../../prisma/generated/prisma';

const tickers = TICKERS.join(',');

export const handleGetTokens = async (req: Request, res: Response) => {
  try {
    const tokens = await getTokens();

    if (!tokens.length) {
      const { data: coinsDetails } = await getCoinsDetailsForTickers(tickers);
      const { data: coinsPrices } = await getCoinsPricesForTickers(tickers);

      const tokensToCreate: Prisma.TokenCreateInput[] = 
        Object.values(coinsDetails).map(coinDetails => {
          const { name, symbol: ticker, logo } = coinDetails[0];
          const priceUpdatedAt = new Date();
          const { quote: { USD: { price }}} = Object.values(coinsPrices)
            .flat()
            .filter(
              t => t.name === name && t.symbol === ticker
            )[0];
          
          return { name, ticker, logo, price, priceUpdatedAt };
        });

      await createManyTokens(tokensToCreate);

      const createdTokens = await getTokens();

      res.status(201).json(createdTokens);

    } else {
      res.status(200).json(tokens);
    }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get tokens');
  }
};

export const handleUpdateToken = async (
  req: Request<any, any, Prisma.TokenUpdateInput>, 
  res: Response
) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;

    const updatedToken = await updateTokenData({ id, data });

    res.status(200).json(updatedToken);
    
  } catch (error) {
    console.log(error);
    throw new Error('Failed update token data');
  }
};

export const handleFavouriteToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [updatedToken] = await updateTokenFavourite(id);

    res.status(200).json(updatedToken);
  } catch (error) {
    console.log(error);
    throw new Error('Failed set token favourite');
  }
};