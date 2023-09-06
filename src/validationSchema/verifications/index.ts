import * as yup from 'yup';

export const verificationValidationSchema = yup.object().shape({
  verification_status: yup.boolean().required(),
  verification_method: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
