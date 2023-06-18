import {  InsertCustomerDTO, UpdateCustomerDTO } from "../dto/customer";
import { client } from "../prisma/prisma";

type Customer = {
    id: string,
    name: string
    email: string;
    phone: string;
};

const getAllCustomer = async (): Promise<Customer[]> => {
    const customers: Customer[] = await client.customer.findMany();
    return customers;
};

const getCustomer = async (id: string): Promise<Customer | null> => {
    const customer = await client.customer.findFirst({
        where: {
            id: id
        }
    });
    return customer;
};


const addCustomer = async ({ name, email, phone }: InsertCustomerDTO): Promise<Customer> => {
    const customer: Customer = await client.customer.create({
        data: {
            name, email, phone
        }
    });
    return customer;
};

const updateCustomer = async ({ id, name, email, phone }: UpdateCustomerDTO): Promise<Customer> => {
    const customer: Customer = await client.customer.update({
        where: {
            id: id
        },
        data: {
            name, email, phone
        }
    });
    return customer;
};

const deleteCustomer = async (id: string): Promise<Customer> => {
    const customer: Customer = await client.customer.delete({
        where: {
            id: id
        }
    });
    return customer;
};

export {
    Customer,
    getAllCustomer,
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
};