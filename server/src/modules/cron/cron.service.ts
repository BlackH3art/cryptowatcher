import { getCoinsPricesForTickers } from '../coins/coins.service';
import { getTokens, updateTokenPrice } from '../tokens/tokens.service';

export const updateTokensPrices = async () => {
  try {
    const tokens = await getTokens();
    if (!tokens.length) return;

    const tickers = tokens.map(t => t.ticker).join(',');
    const { data: coinsPrices } = await getCoinsPricesForTickers(tickers);
    
    const priceUpdatedAt = new Date();
    const tokensPrices = tokens
      .map((t) => ({ ...coinsPrices[t.ticker][0], id: t.id}))
      .map(({ id, quote }) => ({ id, price: quote.USD.price, priceUpdatedAt }));
    
    await Promise.all(tokensPrices.map((t) => updateTokenPrice(t)));
    
    updateTokensPricesFinished();

  } catch (error) {
    console.error('Error: ', error);
    throw new Error('Updating token prices failed');
  }
};

export const updateTokensPricesFinished = () => {
  console.log(`[${new Date().toLocaleString('pl-PL')}] Token prices successfully updated`);
};

export const updateTokensPricesCompleted = () => {
  console.log(`[${new Date().toLocaleString('pl-PL')}] updateTokensPricesCronJob completed`);
};

export const updateTokensPricesErrorHandler = () => {
  console.log(`[${new Date().toLocaleString('pl-PL')}] Error: Job failed to update token prices`);
};