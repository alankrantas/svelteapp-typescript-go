import type { Product } from '../data/entities';
import { Order } from '../data/entities';

let products: Product[] = $state([]);
let order = $state(new Order());

export function createProductsStore() {
	return {
		get value() {
			return products;
		},
		set value(newProducts: Product[]) {
			products = newProducts;
		},
		set(newProducts: Product[]) {
			products = newProducts;
		},
		add(newProduct: Product) {
			products.push(newProduct);
			products = products;
		},
		clear() {
			products = [];
		}
	};
}

export function createOrderStore() {
	return {
		get value() {
			return order;
		},
		set value(newOrder: Order) {
			order = newOrder;
		},
		set(newOrder: Order) {
			order = newOrder;
		},
		addProduct(product: Product, quantity: number) {
			order.addProduct(product, quantity);
		},
		removeProduct(id: number) {
			order.removeProduct(id);
		}
	};
}
