import type { Product, OrderLine } from '../data/entities';

const getProductsStore = () => {
	let _products: Product[] = $state([]);

	return {
		get value() {
			return _products;
		},
		set value(newProducts: Product[]) {
			_products = newProducts;
		}
	};
};

const getOrderLineStore = () => {
	let _orderLines: OrderLine[] = $state([]);

	return {
		get value() {
			return _orderLines;
		},
		set value(newOrderLines: OrderLine[]) {
			_orderLines = newOrderLines;
		}
	};
};

export const products = getProductsStore();
export const orderLines = getOrderLineStore();
