import AgentForm from '@/collections/BecomeAgent/AgentForm';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { colors, tokens } from '@/styles';
import { Avatar, Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BecomeAgent = () => {
  const { t } = useTranslation();

  return (
    <>
      <ResponsiveContainer>
        <>
          <Stack
            my={4}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              padding: '20px',
              backgroundImage: 'url(/images/banner/agent/agentBg.png)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: { xs: '300px', sm: '500px', md: '650px' },
              width: '100%',
              borderRadius: '10px',
              position: 'relative',
              overflow: 'hidden',
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
              zIndex={2}
              alignItems={'center'}
              justifyContent={'center'}
              sx={{
                gap: { xs: 2, sm: 5 },
              }}
            >
              <Text
                text={t('Find a career at Ubrealty')}
                token={tokens.FS64FW600LH87_14SB}
                color={colors.whiteFF}
                styles={{
                  fontSize: { xs: '32px', sm: '56px', md: '64px' },
                  lineHeight: { xs: '1.25', sm: '1.25', md: '1.25' },
                  maxWidth: '700px',
                }}
              />
              <Text
                text={t(
                  `Join our family! We're overflowing with opportunities.`
                )}
                token={tokens.FS16FW500LH18M}
                color={colors.whiteFF}
                styles={{
                  fontSize: { xs: '16px', sm: '18px', md: '20px' },
                }}
              />
              <Link href='#applyNow' scroll={false}>
                <Button
                  token={tokens.FS14FW600LH16SB}
                  variant={'transparent'}
                  text={t('Apply Now')}
                  onClick={() => {}}
                  justifyContent='center'
                  iconReverse
                  style={{
                    height: { xs: '43px', sm: '50px' },
                    paddingInline: '25px',
                    width: '150px',
                  }}
                />
              </Link>
            </Stack>
          </Stack>
          <Stack
            alignItems={'center'}
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              rowGap: { xs: '5px', sm: '15px' },
            }}
          >
            <Text
              token={tokens.FS48FW800LH61_36B}
              text={t('Why Register With Us?')}
              color={colors.black21}
              textAlign='left'
              styles={{
                maxWidth: { md: '400px' },
                fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },
              }}
            />
            <Text
              text={t(
                `Elevate your real estate game with our cutting-edge platform. Enjoy seamless listing management and insights that help you sell smarter, not harder.`
              )}
              token={tokens.FS16FW500LH18M}
              color={colors.black21}
              textAlign='left'
              styles={{ maxWidth: { md: '500px' }, lineHeight: '1.5' }}
            />
          </Stack>
        </>
      </ResponsiveContainer>
      <ResponsiveContainer isSidePadding={false}>
        <>
          <Stack
            sx={{
              marginBlock: { xs: 4, sm: 8 },
              paddingInline: { xs: '15px', sm: '20px' },
            }}
          >
            <GridContainer
              justifyContent='space-between'
              spacing={2}
              alignItems='center'
            >
              <>
                <Grid item xs={12} lg={7}>
                  <GridContainer
                    spacing={3}
                    alignItems='center'
                    justifyContent='space-between'
                    styles={{
                      rowGap: { xs: '15', sm: '25px' },
                    }}
                  >
                    <>
                      <Grid item xs={12} sm={6}>
                        <RenderJoinUsBlock
                          image='/images/app/network.png'
                          title={t('Networking Opportunities')}
                          description={t(
                            'Unlock the door to valuable collaborations. Our platform bridges connections with professionals eager to network and expand their horizons.'
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RenderJoinUsBlock
                          image='/images/app/expand.png'
                          title={t('Expand your Reach')}
                          description={t(
                            'Amplify your visibility across new markets. Our platform ensures your listings get the spotlight they deserve, attracting buyers far and wide.'
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RenderJoinUsBlock
                          image='/images/app/profile.png'
                          title={t('Personalized Profile')}
                          description={t(
                            'Make your mark with a customized profile. Highlight your successes and specialties to attract clients who are looking for exactly what you offer.'
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <RenderJoinUsBlock
                          image='/images/app/listing.png'
                          title={t('Access to Exclusive Listings')}
                          description={t(
                            'Unlock exclusive listings and offer your clients something unique. Gain early access to premier properties that can elevate your portfolio.'
                          )}
                        />
                      </Grid>
                    </>
                  </GridContainer>
                </Grid>
                <Grid
                  item
                  lg={5}
                  sx={{
                    display: { xs: 'none', lg: 'block' },
                  }}
                >
                  <Box
                    position='relative'
                    width='max-content'
                    height='auto'
                    display='flex'
                    mr={'15px'}
                    ml={'auto'}
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'right center',
                        maxHeight: '400px',
                      }}
                      src='/images/banner/agent/whyJoinUs.png'
                      alt='why us'
                      loading='lazy'
                      placeholder='blur'
                      blurDataURL={'/images/banner/agent/whyJoinUs.png'}
                    />
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: '15px',
                        right: '-15px',
                        backgroundColor: colors.blueC2,
                        zIndex: -1,
                      }}
                    />
                  </Box>
                </Grid>
              </>
            </GridContainer>
          </Stack>
        </>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <>
          <GridContainer
            alignItems='stretch'
            styles={{ backgroundColor: colors.greyF6, marginBottom: 6 }}
          >
            <>
              <Grid
                item
                xs={0}
                md={6}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  '& img': {
                    objectFit: 'cover',
                    objectPosition: 'left center',
                  },
                }}
              >
                <Image
                  width={0}
                  height={0}
                  sizes='100%'
                  style={{
                    width: '100%',
                    height: '-webkit-fill-available',
                  }}
                  src='/images/banner/agent/agentbanner2.png'
                  alt='why us'
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL={'/images/banner/agent/agentbanner2.png'}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  width='100%'
                  sx={{
                    padding: { xs: '20px', md: '50px', lg: '70px' },
                    gap: { xs: 1.5, md: 3 },
                  }}
                  justifyContent='center'
                  height='100%'
                >
                  <Text
                    text={'Where Do You See YourSelf?'}
                    token={tokens.FS32FW500LH43_71SB}
                    color={colors.black21}
                    textAlign='left'
                    styles={{
                      fontSize: { xs: '22px', sm: '24px', lg: '32px' },
                    }}
                  />
                  <Text
                    text={t(
                      `Imagine a place where your career is always moving forward, where each day offers a new opportunity for success. At our platform, we're not just about listings; we're about building futures. Here, you’re more than an agent - you’re a partner in innovation, a pioneer in the real estate landscape. With access to top-tier listings, a network of like-minded professionals, and tools that empower you to maximize your potential, the question isn’t where you see yourself now but where you can go. Let us be the launchpad for your ambitions, a place where your skills are celebrated, and your victories are shared. Join us, and together, we'll redefine the essence of real estate success`
                    )}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='left'
                    styles={{ lineHeight: '2' }}
                  />
                </Stack>
              </Grid>
            </>
          </GridContainer>
          <Stack
            mb={6}
            bgcolor={colors.whiteFF}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
              borderRadius: '10px',
            }}
          >
            <Stack
              spacing={2}
              id='applyNow'
              sx={{
                padding: { xs: '20px', sm: '30px' },
              }}
            >
              <Text
                token={tokens.FS48FW800LH61_36B}
                text={t('Apply Now')}
                color={colors.black21}
                styles={{
                  fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },
                }}
              />
              <Text
                text={t(
                  'Transform Your Potential into Achievement. Click Apply and Start Shaping Your Future Today'
                )}
                token={tokens.FS16FW400LH18R}
                color={colors.black21}
                styles={{ lineHeight: '1.5', maxWidth: '500px' }}
              />
            </Stack>
            <AgentForm />
          </Stack>
        </>
      </ResponsiveContainer>
    </>
  );
};

const RenderJoinUsBlock = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Avatar
          variant='rounded'
          src={image}
          alt={'join-us'}
          sx={{
            width: { xs: 50, sm: 55 },
            height: { xs: 50, sm: 55 },
            flexShrink: 0,
          }}
        />
        <Stack
          flexGrow={1}
          sx={{
            gap: '7px',
          }}
        >
          <Text
            text={title}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            textAlign='left'
            styles={{
              maxWidth: { sm: '180px' },
              fontSize: { xs: '18px', sm: '20px' },
              lineHeight: { xs: '1.4' },
            }}
          />
          <Text
            text={description}
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
            textAlign='left'
            styles={{ maxWidth: { sm: '330px' } }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default BecomeAgent;
