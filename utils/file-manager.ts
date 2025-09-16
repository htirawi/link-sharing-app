import { del, put } from '@vercel/blob';

export const uploadFile = async (file: File) => {
    try {
        const { url } = await put(
            `${process.env.BLOB_FOLDER_NAME}/${Date.now()}-${file.name}`,
            file,
            { access: 'public', contentType: file.type },
        );

        return url;
    } catch (error) {
        throw new Error(
            `Failed to upload file: ${
                error instanceof Error ? error.message : 'Unknown error'
            }`,
        );
    }
};

export const deleteFile = async (url: string) => {
    await del(url);
    return true;
};
