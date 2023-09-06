import * as yup from 'yup';

export const locationPreferenceValidationSchema = yup.object().shape({
  distance: yup.number().integer().nullable(),
  location: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
