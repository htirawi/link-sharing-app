import { useFormik } from 'formik';
import { getPropertyByPath } from './property-by-path';

export const formikPropsGenerator = (
    formik: ReturnType<typeof useFormik<any>>,
    name: string,
) => {
    const { values, handleChange, handleBlur, touched, errors } = formik;

    return {
        name,
        value: values[name],
        onChange: handleChange,
        onBlur: handleBlur,
        error: (getPropertyByPath(touched, name) &&
            getPropertyByPath(errors, name)) as string,
    };
};
