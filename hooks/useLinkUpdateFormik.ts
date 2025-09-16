import { updateLinksAction } from '@/actions/links';
import {
    linkUpdateDto,
    LinkUpdateDtoType,
} from '@/app/[username]/(authWrapper)/links/link-update.dto';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const initialValues: LinkUpdateDtoType = {
    links: [{ platform: 'GITHUB', url: '' }],
};

export const useLinkUpdateFormik = (links: LinkUpdateDtoType['links']) => {
    const formik = useFormik({
        initialValues,
        validationSchema: linkUpdateDto,
        onSubmit: async (values) => {
            try {
                const links = await updateLinksAction(
                    values.links.map((link, index) => ({
                        ...link,
                        order: index,
                    })),
                );
                formik.setValues({ links });

                toast.success('Links are updated successfully');
            } catch (error) {
                console.error(error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'An unexpected error occurred';
                toast.error(errorMessage);
            }
        },
    });

    useEffect(() => {
        if (!links.length) {
            return;
        }

        formik.setValues({ links });
    }, [links]);

    const handleAddLink = () => {
        formik.setFieldValue('links', [
            ...(formik.values.links || []),
            initialValues.links[0],
        ]);
    };
    const handleRemoveLink = (index: number) => {
        const newLinks = formik.values.links?.filter(
            (_item, idx) => idx !== index,
        );

        formik.setFieldValue('links', newLinks);
    };

    return { formik, handleAddLink, handleRemoveLink };
};
