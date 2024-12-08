import type { OrderLine } from '$lib/type/entities';

const getStore = <T>(v: T) => {
    let _v: T = $state(v);

    return {
        get value(): T {
            return _v;
        },
        set value(v: T) {
            _v = v;
        }
    };
};

export const orderLines = getStore<OrderLine[]>([]);
