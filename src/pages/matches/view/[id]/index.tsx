import { Box, Center, Flex, Link, List, ListItem, Spinner, Stack, Text, Image, Button } from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import { Error } from 'components/error';
import { FormListItem } from 'components/form-list-item';
import { FormWrapper } from 'components/form-wrapper';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { routes } from 'routes';
import useSWR from 'swr';
import { compose } from 'lib/compose';
import {
  AccessOperationEnum,
  AccessServiceEnum,
  requireNextAuth,
  useAuthorizationApi,
  withAuthorization,
} from '@roq/nextjs';
import { UserPageTable } from 'components/user-page-table';
import { EntityImage } from 'components/entity-image';
import { FiEdit2 } from 'react-icons/fi';

import { getMatchById } from 'apiSdk/matches';
import { MatchInterface } from 'interfaces/match';

function MatchViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MatchInterface>(
    () => (id ? `/matches/${id}` : null),
    () =>
      getMatchById(id, {
        relations: ['user_match_matched_user_idTouser', 'user_match_user_idTouser'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

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
              label: 'Match Details',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {isLoading ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <>
            <FormWrapper wrapperProps={{ border: 'none', gap: 3, p: 0 }}>
              <Flex alignItems="center" w="full" justifyContent={'space-between'}>
                <Box>
                  <Text
                    sx={{
                      fontSize: '1.875rem',
                      fontWeight: 700,
                      color: 'base.content',
                    }}
                  >
                    Match Details
                  </Text>
                </Box>
                {hasAccess('match', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                  <NextLink href={`/matches/edit/${id}`} passHref legacyBehavior>
                    <Button
                      onClick={(e) => e.stopPropagation()}
                      mr={2}
                      padding="0rem 0.5rem"
                      height="24px"
                      fontSize="0.75rem"
                      variant="outline"
                      color="state.info.main"
                      borderRadius="6px"
                      border="1px"
                      borderColor="state.info.transparent"
                      leftIcon={<FiEdit2 width="12px" height="12px" color="state.info.main" />}
                    >
                      Edit
                    </Button>
                  </NextLink>
                )}
              </Flex>

              <List
                w="100%"
                css={{
                  '> li:not(:last-child)': {
                    borderBottom: '1px solid var(--chakra-colors-base-300)',
                  },
                }}
              >
                <FormListItem label="Match Score" text={data?.match_score} />

                <FormListItem label="Match Status" text={data?.match_status} />

                <FormListItem
                  label="Created At"
                  text={data?.created_at ? format(parseISO(data?.created_at as unknown as string), 'dd-MM-yyyy') : ''}
                />

                <FormListItem
                  label="Updated At"
                  text={data?.updated_at ? format(parseISO(data?.updated_at as unknown as string), 'dd-MM-yyyy') : ''}
                />

                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User Match Matched User Id Touser"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user_match_matched_user_idTouser?.id}`}>
                        {data?.user_match_matched_user_idTouser?.email}
                      </Link>
                    }
                  />
                )}
                {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                  <FormListItem
                    label="User Match User Id Touser"
                    text={
                      <Link as={NextLink} href={`/users/view/${data?.user_match_user_idTouser?.id}`}>
                        {data?.user_match_user_idTouser?.email}
                      </Link>
                    }
                  />
                )}
              </List>
            </FormWrapper>
          </>
        )}
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
    operation: AccessOperationEnum.READ,
  }),
)(MatchViewPage);
