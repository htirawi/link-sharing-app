'use server';
import { revalidatePath } from 'next/cache';

import prisma from '@/prisma/client';
import {
    profileUpdateDto,
    ProfileUpdateDtoType,
} from '@/app/[username]/(authWrapper)/edit/profile-update.dto';
import { authCheck } from '@/utils/authCheck';
import { deleteFile, uploadFile } from '@/utils/file-manager';
import { formDataToObject } from '@/utils/formData';
import { getCurrentUser } from '@/utils/session';

export const profileUpdateAction = async (data: FormData) => {
    await authCheck();
    const user = await getCurrentUser();

    // Extract File object directly from FormData
    const avatarFile = data.get('avatar') as File | null;
    
    const formDataObj = formDataToObject(data);
    
    const dataObj: ProfileUpdateDtoType & { avatar: File | null } = {
        firstName: formDataObj.firstName as string,
        lastName: formDataObj.lastName as string,
        username: formDataObj.username as string,
        email: formDataObj.email as string,
        avatar: avatarFile,
    };

    await profileUpdateDto.validate(dataObj);

    // upload the new file to vercel
    let newAvatarUrl;

    if (dataObj.avatar instanceof File) {
        try {
            newAvatarUrl = await uploadFile(dataObj.avatar);
        } catch (error) {
            throw new Error('Failed to upload avatar image');
        }
    }

    // if new file uploaded and previous file exists, delete old file
    if (dataObj.avatar instanceof File && user!.avatar)
        deleteFile(user!.avatar);

    // Update user profile
    const newUser = await prisma.user.update({
        where: { id: user!.id },
        data: {
            ...dataObj,
            avatar: newAvatarUrl,
        },
    });

    revalidatePath('/[username]/(authWrapper)', 'layout');

    return newUser;
};
