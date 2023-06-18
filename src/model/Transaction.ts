import { InsertTransactionDTO } from "../dto/transaction";
import { client } from "../prisma/prisma";
import { Customer } from "./Customer";
import { Payment } from "./Payment";
import { TransactionDetail } from "./TransactionDetail";

type Transaction = {
    id: string,
    date: Date,
    payment_id: string,
    customer_id: string,
    note?: string | null,
    customer?: Customer | null,
    payment?: Payment | null,
    transaction_details?: TransactionDetail[] | null
};

const getAllTransaction = async (): Promise<Transaction[]> => {
    const transactions: Transaction[] = await client.transaction.findMany({
        include: {
            customer: true,
            payment: true,
            transaction_details: {
                include: {
                    topping_details: {
                        include: {
                            topping: {
                                include: {
                                    file: true
                                }
                            }
                        }
                    },
                    menu: {
                        include: {
                            file: true
                        }
                    }
                }
            }
        }
    });
    return transactions;
};

const getTransaction = async (id: string) => {
    const transaction: Transaction | null = await client.transaction.findFirst({
        where: { id: id },
        include: {
            customer: true,
            payment: true,
            transaction_details: {
                include: {
                    topping_details: {
                        include: {
                            topping: {
                                include: {
                                    file: true
                                }
                            }
                        }
                    },
                    menu: {
                        include: {
                            file: true
                        }
                    }
                }
            }
        }
    });
    return transaction;
};

const addTransaction = async ({ customerId, paymentId, note }: InsertTransactionDTO) => {
    const transaction: Transaction = await client.transaction.create({
        data: {
            customer_id: customerId,
            payment_id: paymentId,
            note: note,
        }
    });
    return transaction;
};

const deleteTransaction = async (id: string): Promise<Transaction | null> => {
    const transaction = await client.transaction.findFirst({
        where: { id: id }
    });

    if (!transaction) return null;

    //delete topping details

    //delete transaction details

    //delete transaction
    // await client.transaction.delete({
    //     where: { id: transaction.id }
    // });

    return transaction;
};

export {
    Transaction,
    getAllTransaction,
    getTransaction,
    addTransaction,
    deleteTransaction
};