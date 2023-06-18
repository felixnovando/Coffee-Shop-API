import { InsertMenuDTO, UpdateMenuDTO } from "../dto/menu";
import { client } from "../prisma/prisma";
import { File } from "./File";

type Menu = {
    id: string,
    name: string,
    price: number,
    file_id: string | null,
    file: File | null
};

const getAllMenu = async (): Promise<Menu[]> => {
    const menus: Menu[] = await client.menu.findMany({
        include: { file: true }
    });
    return menus;
};

const getMenu = async (id: string): Promise<Menu | null> => {
    const menu = await client.menu.findFirst({
        where: {
            id: id
        },
        include: { file: true }
    });
    return menu;
};


const addMenu = async ({ name, price, fileId }: InsertMenuDTO): Promise<Menu> => {
    const menu: Menu = await client.menu.create({
        data: {
            name: name,
            price: price,
            file_id: fileId
        },
        include: { file: true }
    });
    return menu;
};

const updateMenu = async ({ id, name, price, fileId }: UpdateMenuDTO): Promise<Menu> => {
    const menu: Menu = await client.menu.update({
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
    return menu;
};

const deleteMenu = async (id: string): Promise<Menu> => {
    const menu: Menu = await client.menu.delete({
        where: {
            id: id
        },
        include: { file: true }
    });
    return menu;
};

export {
    Menu,
    getAllMenu,
    getMenu,
    addMenu,
    updateMenu,
    deleteMenu
};