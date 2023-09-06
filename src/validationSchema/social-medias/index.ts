import * as yup from 'yup';

export const socialMediaValidationSchema = yup.object().shape({
  platform_name: yup.string().required(),
  profile_link: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
