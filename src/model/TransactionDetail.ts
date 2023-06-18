import { InsertDetailTransactionDTO } from "../dto/transaction";
import { client } from "../prisma/prisma";
import { Menu } from "./Menu";
import { ToppingDetail } from "./ToppingDetail";

type TransactionDetail = {
    id: string,
    transaction_id: string,
    menu_id: string,
    qty: number,
    note?: string | null,
    menu?: Menu | null,
    topping_details?: ToppingDetail[] | null,
};

const addDetailTransaction = async (transactionId: string, { menuId, qty, note, toppingDetails }: InsertDetailTransactionDTO) => {
    const details: TransactionDetail = await client.transactionDetail.create({
        data: {
            transaction_id: transactionId,
            menu_id: menuId,
            qty: qty,
            note: note,
            topping_details: {
                createMany: {
                    data: toppingDetails?.map((toppingDetail) => ({
                        topping_id: toppingDetail.toppingId,
                        qty: toppingDetail.qty,
                        note: toppingDetail.note
                    })) ?? []
                }
            }
        }
    });
    return details;
};

export {
    TransactionDetail,
    addDetailTransaction
};