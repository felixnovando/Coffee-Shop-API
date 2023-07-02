import { InsertTransactionDTO, UpdateTransactionDTO } from "../dto/transaction";
import { client } from "../prisma/prisma";
import { Payment } from "./Payment";
import { TransactionDetail } from "./TransactionDetail";

type Transaction = {
    id: string,
    date: Date,
    payment_id: string,
    customer_id: string,
    note?: string | null,
    customer?: {
        id: string,
        name: string
    } | null,
    staff?: {
        id: string,
        name: string
    } | null,
    payment?: Payment | null,
    transaction_details?: TransactionDetail[] | null
};

const getAllTransaction = async (): Promise<Transaction[]> => {
    const transactions: Transaction[] = await client.transaction.findMany({
        include: {
            staff: {
                select: {
                    id: true,
                    name: true
                }
            },
            customer: {
                select: {
                    id: true,
                    name: true
                }
            },
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
            staff: {
                select: {
                    id: true,
                    name: true
                }
            },
            customer: {
                select: {
                    id: true,
                    name: true
                }
            },
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

const addTransaction = async ({ customerId, paymentId, note }: InsertTransactionDTO, staffId: string) => {
    const transaction: Transaction = await client.transaction.create({
        data: {
            customer_id: customerId,
            payment_id: paymentId,
            note: note,
            staff_id: staffId,
        }
    });
    return transaction;
};

const updateTransaction = async ({ id, note }: UpdateTransactionDTO) => {
    const transaction = await client.transaction.update({
        where: { id: id },
        data: {
            note: note
        }
    });
    return transaction;
};

const deleteTransaction = async (id: string): Promise<Transaction | null> => {
    const transaction = await client.transaction.delete({
        where: { id: id },
    });
    return transaction;
};

export {
    Transaction,
    getAllTransaction,
    getTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction
};