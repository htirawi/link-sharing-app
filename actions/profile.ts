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
    console.log('Profile update action started');
    await authCheck();
    const user = await getCurrentUser();
    console.log('User authenticated:', user?.username);

    const formDataObj = formDataToObject(data);
    console.log('Form data object:', formDataObj);

    const dataObj: ProfileUpdateDtoType & { avatar: File } = {
        firstName: formDataObj.firstName as string,
        lastName: formDataObj.lastName as string,
        username: formDataObj.username as string,
        email: formDataObj.email as string,
        avatar: formDataObj.avatar as unknown as File,
    };

    console.log('Data object created:', dataObj);
    console.log('Avatar is File?', dataObj.avatar instanceof File);
    console.log('Avatar value:', dataObj.avatar);
    console.log('Avatar type:', typeof dataObj.avatar);

    await profileUpdateDto.validate(dataObj);

    // upload the new file to vercel
    let newAvatarUrl;

    if (dataObj.avatar instanceof File) {
        try {
            newAvatarUrl = await uploadFile(dataObj.avatar);
            console.log('Avatar uploaded successfully:', newAvatarUrl);
        } catch (error) {
            console.error('Avatar upload failed:', error);
            throw new Error('Failed to upload avatar image');
        }
    }

    // if new file uploaded and previous file exists, delete old file
    if (dataObj.avatar instanceof File && user!.avatar)
        deleteFile(user!.avatar);

    // Update user profile
    console.log('Updating user with avatar URL:', newAvatarUrl);
    const newUser = await prisma.user.update({
        where: { id: user!.id },
        data: {
            ...dataObj,
            avatar: newAvatarUrl,
        },
    });
    console.log('User updated successfully:', newUser);

    revalidatePath('/[username]/(authWrapper)', 'layout');

    return newUser;
};
