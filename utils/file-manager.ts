import { del, put } from '@vercel/blob';

export const uploadFile = async (file: File) => {
    try {
        console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);
        console.log('BLOB_FOLDER_NAME:', process.env.BLOB_FOLDER_NAME);
        
        const { url } = await put(
            `${process.env.BLOB_FOLDER_NAME}/${Date.now()}-${file.name}`,
            file,
            { access: 'public', contentType: file.type },
        );

        console.log('Upload successful, URL:', url);
        return url;
    } catch (error) {
        console.error('Upload failed:', error);
        throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};

export const deleteFile = async (url: string) => {
    await del(url);
    return true;
};
