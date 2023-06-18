import { client } from "../prisma/prisma";

type File = {
    id: string,
    name: string,
    path: string,
    size: number,
};

type FileInput = {
    name: string,
    path: string,
    size: number
};

const getAllFile = async () => {
    const files: File[] = await client.file.findMany();
    return files;
};

const getFile = async (id: string) => {
    const file: File | null = await client.file.findFirst({
        where: { id: id }
    });
    return file;
};

const addFile = async ({ name, path, size }: FileInput) => {
    const file: File = await client.file.create({
        data: {
            name, path, size
        }
    });
    return file;
};

const deleteFile = async (id: string) => {
    const file: File = await client.file.delete({
        where: { id: id }
    });
    return file;
};

export {
    File,
    FileInput,
    getAllFile,
    getFile,
    addFile,
    deleteFile
};
