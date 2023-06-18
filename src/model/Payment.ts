import { InsertPaymentDTO, UpdatePaymentDTO } from "../dto/payment";
import { client } from "../prisma/prisma";

type Payment = {
    id: string,
    name: string
};

const getAllPayment = async () => {
    const payments: Payment[] = await client.payment.findMany();
    return payments;
};

const getPayment = async (id: string) => {
    const payment: Payment | null = await client.payment.findFirst({
        where: { id: id }
    });
    return payment;
};

const addPayment = async ({ name }: InsertPaymentDTO) => {
    const payment: Payment = await client.payment.create({
        data: {
            name: name
        }
    });
    return payment;
};

const updatePayment = async ({ id, name }: UpdatePaymentDTO) => {
    const payment: Payment = await client.payment.update({
        where: { id: id },
        data: {
            name: name
        }
    });
    return payment;
};

const deletePayment = async (id: string) => {
    const payment: Payment = await client.payment.delete({
        where: { id: id },
    });
    return payment;
};

export {
    Payment,
    getAllPayment,
    getPayment,
    addPayment,
    updatePayment,
    deletePayment
};