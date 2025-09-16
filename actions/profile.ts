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

    const formDataObj = formDataToObject(data);
    const dataObj: ProfileUpdateDtoType & { avatar: File } = {
        firstName: formDataObj.firstName as string,
        lastName: formDataObj.lastName as string,
        username: formDataObj.username as string,
        email: formDataObj.email as string,
        avatar: formDataObj.avatar as unknown as File,
    };

    await profileUpdateDto.validate(dataObj);

    // upload the new file to vercel
    let newAvatarUrl;

    if (dataObj.avatar instanceof File) {
        newAvatarUrl = await uploadFile(dataObj.avatar);
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
