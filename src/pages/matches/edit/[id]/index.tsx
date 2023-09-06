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
import { getMatchById, updateMatchById } from 'apiSdk/matches';
import { matchValidationSchema } from 'validationSchema/matches';
import { MatchInterface } from 'interfaces/match';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function MatchEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<MatchInterface>(
    () => (id ? `/matches/${id}` : null),
    () => getMatchById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MatchInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMatchById(id, values);
      mutate(updated);
      resetForm();
      router.push('/matches');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<MatchInterface>({
    initialValues: data,
    validationSchema: matchValidationSchema,
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
              label: 'Matches',
              link: '/matches',
            },
            {
              label: 'Update Match',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Match
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Match Score"
            formControlProps={{
              id: 'match_score',
              isInvalid: !!formik.errors?.match_score,
            }}
            name="match_score"
            error={formik.errors?.match_score}
            value={formik.values?.match_score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('match_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl
            id="match_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.match_status}
          >
            <FormLabel htmlFor="switch-match_status">Match Status</FormLabel>
            <Switch
              id="switch-match_status"
              name="match_status"
              onChange={formik.handleChange}
              value={formik.values?.match_status ? 1 : 0}
            />
            {formik.errors?.match_status && <FormErrorMessage>{formik.errors?.match_status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'matched_user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/matches')}
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
    entity: 'match',
    operation: AccessOperationEnum.UPDATE,
  }),
)(MatchEditPage);
