import * as yup from 'yup';

export const matchValidationSchema = yup.object().shape({
  match_score: yup.number().integer().nullable(),
  match_status: yup.boolean().nullable(),
  matched_user_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
