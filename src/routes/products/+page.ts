import { HttpHandler } from '../../data/httpHandler';
import { products } from '../../store/stores';

/** @type {import('./__types/[slug]').Load} */
export async function load() {
    new HttpHandler().loadProducts().then((p) => {
        products.set(p);
    });
}