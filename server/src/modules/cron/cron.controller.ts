import { CronJob } from "cron";
import { updateTokensPrices, updateTokensPricesCompleted, updateTokensPricesErrorHandler } from "./cron.service";

export const updateTokensPricesCronJob = () => {
  return new CronJob(
    '0 */10 * * * *',
    updateTokensPrices,
    updateTokensPricesCompleted,
    true,
    null,
    null,
    true,
    null,
    null,
    null,
    updateTokensPricesErrorHandler,
  );
};
