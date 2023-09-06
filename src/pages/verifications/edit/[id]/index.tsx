import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getVerificationById, updateVerificationById } from 'apiSdk/verifications';
import { verificationValidationSchema } from 'validationSchema/verifications';
import { VerificationInterface } from 'interfaces/verification';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function VerificationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<VerificationInterface>(
    () => (id ? `/verifications/${id}` : null),
    () => getVerificationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: VerificationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateVerificationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/verifications');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<VerificationInterface>({
    initialValues: data,
    validationSchema: verificationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Verifications',
              link: '/verifications',
            },
            {
              label: 'Update Verification',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Verification
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl
            id="verification_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.verification_status}
          >
            <FormLabel htmlFor="switch-verification_status">Verification Status</FormLabel>
            <Switch
              id="switch-verification_status"
              name="verification_status"
              onChange={formik.handleChange}
              value={formik.values?.verification_status ? 1 : 0}
            />
            {formik.errors?.verification_status && (
              <FormErrorMessage>{formik.errors?.verification_status}</FormErrorMessage>
            )}
          </FormControl>

          <TextInput
            error={formik.errors.verification_method}
            label={'Verification Method'}
            props={{
              name: 'verification_method',
              placeholder: 'Verification Method',
              value: formik.values?.verification_method,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/verifications')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'verification',
    operation: AccessOperationEnum.UPDATE,
  }),
)(VerificationEditPage);
