import type { OrderLine } from '$lib/type/entities';

const getStore = <T>(value: T) => {
    let _store: T = $state(value);

    return {
        get current(): T {
            return _store;
        },
        set current(value: T) {
            _store = value;
        }
    };
};

export const orderLines = getStore<OrderLine[]>([]);
