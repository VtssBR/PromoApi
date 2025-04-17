import cron from 'node-cron';
import { ProductService } from '../services/ProductService';

const productService = new ProductService();

export function setupCrons() {
  cron.schedule('0 0 * * *', async () => {
    console.log('[CRON] Checando promoções expiradas...');
    await productService.deleteExpiredProducts();
  });

  if (process.env.NODE_ENV === 'development') {
    (async () => {
      console.log('[DEV] Executando deletar produtos expirados imediatamente para teste...');
      await productService.deleteExpiredProducts();
    })();
  }
}