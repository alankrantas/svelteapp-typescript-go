import type { Product } from '../data/entities';
import { Order } from '../data/entities';
import { writable } from 'svelte/store';

export const products = writable<Product[]>([]);
export const selectedCategory = writable<string>('');
export const order = writable<Order>(new Order());
