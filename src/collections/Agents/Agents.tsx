/* eslint-disable react-hooks/exhaustive-deps */
import { GridContainer, SearchBar, Text } from '@/components';
import AgentCard from '@/components/Cards/AgentCard';
import Divider from '@/components/Divider/Divider';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { getAgents } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { IAgent } from '@/types/collections/agent';
import ObjectToPrams from '@/utils/ObjectToParams';
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

interface IAgents {
  initialState: any;
}

export default function Agents({ initialState }: IAgents) {
  const isMobile = useMediaQuery(' (max-width: 620px)');
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const { ref, inView } = useInView();
  const { t } = useTranslation();
  const [initialLoad, setInitialLoad] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [state, setState] = useState<{
    fetchMore: boolean;
    data: any;
  }>({
    fetchMore:
      initialState?.length === 0
        ? false
        : initialState?.filteredUsersCount <=
          initialState?.userStasts?.total_agents
        ? false
        : true,
    data: initialState.users || [],
  });
  const [searchInput, setSearchInput] = useState('');
  const [params, setParams] = useState({
    page: 1,
    limit: 16,
    search: '',
  });

  useEffect(() => {
    // if (!state.fetchMore) return;
    if (initialLoad) return setInitialLoad(false);

    const fetchUser = async (params?: any) => {
      try {
        setFetching(true);
        const agentUsers: any = await getAgents(ObjectToPrams(params));
        setState((st) => ({
          ...st,
          fetchMore: agentUsers.users.length !== 0,
          data:
            params.page === 1
              ? agentUsers.users
              : st.data.length === 0
              ? agentUsers.users
              : [...st.data, ...agentUsers.users],
        }));
      } catch (e) {
        console.log(e);
      } finally {
        setFetching(false);
        setInitialLoad(false);
      }
    };

    fetchUser(params);
  }, [params]);

  useEffect(() => {
    if (inView && !fetching && state.fetchMore) {
      setParams((st) => ({ ...st, page: st.page + 1 }));
    }
  }, [inView, fetching]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (searchInput.length >= 2) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setState((st) => ({ ...st, fetchMore: true }));
        setParams((prevPage) => ({
          ...prevPage,
          page: 1,
          search: searchInput,
        }));
      }, 750);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchInput]);

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <>
          <GridContainer>
            <>
              <Grid item xs={12}>
                <Text
                  text={t('Agents')}
                  color={colors.black21}
                  token={
                    isMobile
                      ? tokens.FS16FW600LH21_86SB
                      : tokens.FS36FW700LH49_18B
                  }
                  textAlign='left'
                  styles={{ marginBottom: '10px' }}
                />
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  marginBottom={isMobile ? '30px' : '50px'}
                  gap={'15px'}
                >
                  <SearchBar
                    backGroundColor={colors.greyEB}
                    color={colors.black21}
                    token={tokens.FS16FW500LH21_86R}
                    placeholder={t('Search Agent')}
                    width={'30%'}
                    height='50px'
                    borderRadius='8px'
                    allowClear={isMobile ? false : true}
                    value={searchInput}
                    onChange={(value: string) => {
                      setSearchInput(value);
                    }}
                    handleClear={() => {
                      setSearchInput('');
                      setState((st) => ({ ...st, fetchMore: true }));
                      setTimeout(() => {
                        setParams((prevPage) => ({
                          ...prevPage,
                          search: '',
                          page: 1,
                        }));
                      }, 0);
                    }}
                    styles={{
                      maxWidth: '500px',
                      width: isMd && !isMobile ? '68%' : '100%',
                    }}
                  />
                </Box>
                <Divider />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  mt: { xs: '30px', sm: '50px' },
                }}
              >
                <Grid container spacing={isMobile ? 2 : 3.5}>
                  {state.data.length > 0 &&
                    state.data.map((item: IAgent) => (
                      <Grid
                        key={item.id}
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2.4}
                        sx={{ height: 'max-content' }}
                      >
                        <AgentCard
                          id={item.id}
                          src={item.profile.image_url}
                          agentLocation=''
                          facebook_url=''
                          twitter_url=''
                          instagram_url=''
                          youtube_url=''
                          agentName={item.profile.name}
                          agentUsername={item.profile.username || ''}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  my={3}
                  ref={ref}
                >
                  {fetching && state.fetchMore ? (
                    <CircularProgress />
                  ) : (
                    <Text
                      text={t('No more Exists')}
                      color={colors.black21}
                      token={tokens.FS16FW600LH21_86SB}
                      styles={{
                        padding: '5px 15px',
                        border: `1px solid ${colors.black21}`,
                        borderRadius: '49px',
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </>
          </GridContainer>
        </>
      </ResponsiveContainer>
    </Box>
  );
}
