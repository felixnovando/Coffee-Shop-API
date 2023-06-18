import { InsertToppingDTO, UpdateToppingDTO } from "../dto/topping";
import { client } from "../prisma/prisma";
import { File } from "./File";

type Topping = {
    id: string,
    name: string,
    file_id: string | null,
    file: File | null,
};

const getAllTopping = async (): Promise<Topping[]> => {
    const toppings: Topping[] = await client.topping.findMany({
        include: { file: true }
    });
    return toppings;
};

const getTopping = async (id: string): Promise<Topping | null> => {
    const topping = await client.topping.findFirst({
        where: {
            id: id
        },
        include: { file: true }
    });
    return topping;
};

const addTopping = async ({ name, price, fileId }: InsertToppingDTO): Promise<Topping> => {
    const topping: Topping = await client.topping.create({
        data: {
            name: name,
            price: price,
            file_id: fileId
        },
        include: { file: true }
    });
    return topping;
};


const updateTopping = async ({ id, name, price, fileId }: UpdateToppingDTO): Promise<Topping> => {
    const topping: Topping = await client.topping.update({
        where: {
            id: id
        },
        data: {
            name: name,
            price: price,
            file_id: fileId
        },
        include: { file: true }
    });
    return topping;
};

const deleteTopping = async (id: string): Promise<Topping> => {
    const topping: Topping = await client.topping.delete({
        where: {
            id: id
        },
        include: { file: true }
    });
    return topping;
};

export {
    Topping,
    getAllTopping,
    getTopping,
    addTopping,
    updateTopping,
    deleteTopping
};