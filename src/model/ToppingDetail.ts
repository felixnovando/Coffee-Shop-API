import { Topping } from "./Topping";

type ToppingDetail = {
    transaction_detail_id: string,
    topping_id: string,
    qty: number,
    note?: string | null,
    topping?: Topping | null
};

export {
    ToppingDetail
};