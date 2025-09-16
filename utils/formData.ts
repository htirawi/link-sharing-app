type FormDataValue = string | number | boolean | File | Blob | any;

export const objectToFormData = (
    object: Record<string, FormDataValue | FormDataValue[] | null | undefined>,
): FormData => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => {
        const value = object[key];
        if (value === undefined || value === null) return;

        if (Array.isArray(value)) {
            value.forEach((item: FormDataValue) => {
                formData.append(`${key}[]`, item.toString());
            });
            return;
        }

        formData.append(key, value.toString());
    });
    return formData;
};

export const formDataToObject = (
    formData: FormData,
): Record<string, string | (string | File)[] | boolean | File> => {
    const object: Record<string, string | (string | File)[] | boolean | File> = {};

    formData.forEach((value, key) => {
        if (value === 'true') {
            object[key] = true;
            return;
        } else if (value === 'false') {
            object[key] = false;
            return;
        }

        if (key.includes('[]')) {
            const newKey = key.replace('[]', '');
            if (object[newKey] && Array.isArray(object[newKey])) {
                (object[newKey] as (string | File)[]).push(value);
            } else {
                object[newKey] = [value];
            }
            return;
        }

        object[key] = value;
    });
    return object;
};
