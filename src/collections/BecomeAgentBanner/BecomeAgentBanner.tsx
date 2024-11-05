import { Text } from '@/components';
import Button from '@/components/Button/Button';
import { getAgents } from '@/services/api';
import { colors, tokens } from '@/styles';
import ObjectToPrams from '@/utils/ObjectToParams';
import { Avatar, AvatarGroup, Box, Skeleton, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BecomeAgentBanner = ({ bannerImg }: { bannerImg: string }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [getAgentList, setGetAgentList] = useState<{
    fetching: boolean;
    agents: any;
    totalAgents: number;
  }>({
    fetching: true,
    agents: null,
    totalAgents: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const agentList = await getAgents(ObjectToPrams({ limit: 4, page: 1 }));
        setGetAgentList({
          fetching: false,
          agents: agentList?.users,
          totalAgents: +agentList?.userStasts?.total_agents,
        });
      } catch (er) {
        setGetAgentList({ fetching: false, agents: null, totalAgents: 0 });
      }
    })();
  }, []);

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      sx={{
        backgroundImage: `url(${bannerImg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: { xs: '250px', sm: '280px', md: '370px' },
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        padding: { xs: '20px', sm: '25px', md: '35px' },
        marginTop: { xs: '30px', sm: '40px' },
      }}
    >
      <Box
        sx={{
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
      <Stack
        width='100%'
        zIndex={2}
        alignItems={'start'}
        justifyContent={'space-between'}
        spacing={'15px'}
        sx={{
          alignItems: { xs: 'center', sm: 'start' },
        }}
      >
        <Text
          text={t('Become A UBRealty Agent')}
          token={tokens.FS24FW400LH32_78R}
          color={colors.whiteFF}
          styles={{
            letterSpacing: '1px',
            marginBottom: '10px',
            fontSize: { xs: '35px', sm: '45px', md: '55px' },
            maxWidth: '500px',
            lineHeight: { xs: '1.25', sm: '60px', md: '72px' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        />
        <Stack
          width='100%'
          alignItems={'center'}
          sx={{
            justifyContent: { xs: 'center', sm: 'space-between' },
            flexDirection: { xs: 'column', sm: 'row' },
            rowGap: '20px',
          }}
        >
          {getAgentList.fetching ? (
            <AvatarGroup
              max={4}
              sx={{
                '& .MuiAvatar-root': {
                  border: `2px solid #1E2B3E`,
                  width: { xs: '35px', sm: '40px' },
                  height: { xs: '35px', sm: '40px' },
                },
              }}
              total={4}
              spacing={'small'}
            >
              {[...Array(4)].map((_, ind) => (
                <Avatar key={ind}>
                  <Skeleton
                    key={ind}
                    variant='circular'
                    width='30px'
                    height='30px'
                  />
                </Avatar>
              ))}
            </AvatarGroup>
          ) : (
            getAgentList.agents &&
            getAgentList.agents?.length > 0 && (
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatar-root': {
                    border: `2px solid #1E2B3E`,
                    width: { xs: '35px', sm: '40px' },
                    height: { xs: '35px', sm: '40px' },
                  },
                }}
                total={getAgentList.totalAgents}
                spacing={'small'}
              >
                {getAgentList.agents?.map((user: any, ind: number) => (
                  <Avatar
                    key={ind}
                    alt={user.profile.name}
                    src={`${process.env.BASE_URL}/images/${user?.profile?.image_url}`}
                  />
                ))}
              </AvatarGroup>
            )
          )}
          <Button
            token={tokens.FS14FW600LH16SB}
            variant={'white'}
            text={t('Become An Agent')}
            onClick={() => router.push(`/become-an-agent`)}
            justifyContent='center'
            marginRight='10px'
            icon={'/icons/arrow-right-black.svg'}
            iconAlt='/icons/arrow-right.svg'
            iconSize={{ width: 15, height: 15 }}
            iconReverse
            style={{
              height: { xs: '43px', sm: '50px' },
              paddingInline: '27px',
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BecomeAgentBanner;
