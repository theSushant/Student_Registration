import * as Yup from 'yup';

export const personalInfoValidation = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});
