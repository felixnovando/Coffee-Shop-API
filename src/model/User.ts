import { InsertUserDTO, UpdateUserDTO } from "../dto/user";
import { client } from "../prisma/prisma";

type User = {
    id: string,
    email: string,
    name: string,
    role: string,
}

type FullUser = {
    id: string,
    password: string,
    email: string,
    name: string,
    role: string,
};

const selectedProperties = {
    id: true,
    email: true,
    name: true,
    role: true
};

type LoggedUser = {
    id: string,
    role: string,
};

export const USER_ROLES = process.env.USER_ROLES ?
    process.env.USER_ROLES?.split(";").map((role) => role.toLowerCase())
    : [];

const getAllUser = async (): Promise<User[]> => {
    const users: User[] = await client.user.findMany({
        select: selectedProperties
    });
    return users;
};

const getUser = async (id: string): Promise<User | null> => {
    const user = await client.user.findFirst({
        where: {
            id
        },
        select: selectedProperties
    });
    return user;
};

const getUserByEmail = async (email: string): Promise<FullUser | null> => {
    const user = await client.user.findFirst({
        where: {
            email: email
        },
    });
    return user;
};

const addUser = async ({ email, name, password, role }: InsertUserDTO): Promise<User> => {
    const user: User = await client.user.create({
        data: {
            email, name, password, role
        },
        select: selectedProperties
    });
    return user;
};

const updateUser = async ({ id, email, password, name, role }: UpdateUserDTO): Promise<User> => {
    const user: User = await client.user.update({
        where: {
            id
        },
        data: {
            email, name, password, role
        },
        select: selectedProperties
    });
    return user;
};

const deleteUser = async (id: string): Promise<User> => {
    const user: User = await client.user.delete({
        where: {
            id: id
        },
        select: selectedProperties
    });
    return user;
};

export {
    User,
    FullUser,
    LoggedUser,
    getAllUser,
    getUser,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
};