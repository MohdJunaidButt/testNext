import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { Text } from '../Text';

interface AgentCardProps {
  id: string;
  src: string;
  agentName: string;
  agentLocation: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  youtube_url: string;
  agentUsername?: string;
}

export default function AgentCard({
  id,
  src,
  agentName,
  agentUsername,
  agentLocation,
  facebook_url,
  twitter_url,
  instagram_url,
  youtube_url,
}: AgentCardProps) {
  const router = useRouter();
  return (
    <Box
      // height={'320px'}
      position='relative'
      sx={{
        '&, & *': {
          cursor: 'pointer',
        },
        aspectRatio: '1/1.05',
        '& img': {
          objectFit: 'cover',
          objectPosition: 'center top',
          borderRadius: '10px',
          boxShadow:
            'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        },
      }}
      onClick={() => {
        router.push(`/agents/${agentUsername}`);
      }}
    >
      <NextImage
        src={src}
        alt={`${agentName}`}
        width={0}
        height={0}
        sizes='100%'
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 15, sm: 18 },
          left: { xs: 10, sm: 13 },
          right: { xs: 10, sm: 13 },
          width: { xs: 'calc(100% - 17px)', sm: 'calc(100% - 26px)' },
          padding: { xs: '5px 10px', sm: '7px 10px' },
          backgroundColor: colors.whiteFF,
          borderRadius: '10px',
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-start'}
          spacing={'5px'}
        >
          <Text
            text={agentName}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            textAlign='left'
            styles={{
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          />
          {/* <Stack
            direction='row'
            alignItems={'center'}
            sx={{ gap: '5px', flexShrink: 0 }}
          >
            <IconButton
              sx={{
                p: 0,
              }}
            >
              <NextImage
                src={'/icons/insta-bl.svg'}
                alt={'facebook'}
                width={0}
                height={0}
                sizes='100%'
                style={{
                  width: 'fit-content',
                  height: '20px',
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                p: 0,
              }}
            >
              <NextImage
                src={'/icons/yt-bl.svg'}
                alt={'facebook'}
                width={0}
                height={0}
                sizes='100%'
                style={{
                  width: 'fit-content',
                  height: '20px',
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              />
            </IconButton>
            <IconButton
              sx={{
                p: 0,
              }}
            >
              <NextImage
                src={'/icons/fb-bl.svg'}
                alt={'facebook'}
                width={0}
                height={0}
                sizes='100%'
                style={{
                  width: 'fit-content',
                  height: '20px',
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              />
            </IconButton>
          </Stack> */}
        </Stack>
      </Box>
    </Box>
  );
  // return (
  //   <Box
  //     className='cursorPointer'
  //     onClick={() => onClick && onClick(agentName)}
  //     sx={{
  //       borderRadius: '10px',
  //       outline: `1px solid ${colors.greyEC}`,
  //       flexDirection: 'column',
  //       paddingBlock: '10px',
  //       ...displayFlexAlignItemsCenterJustifyContentFlexStart,
  //     }}
  //   >
  //     <Box
  //       sx={{
  //         ...displayFlexAlignItemsCenterJustifyContentCenter,
  //         objectFit: 'contain',
  //         width: '100%',
  //         overflow: 'hidden',
  //         height: { xs: '140px', sm: '255px' },
  //       }}
  //     >
  //       <Image
  //         src={src}
  //         alt={alt}
  //         width={0}
  //         // width={agentImageWidth}
  //         height={0}
  //         priority
  //         sizes={'100%'}
  //         style={{
  //           width: agentImageWidth,
  //           height: 'auto',
  //         }}
  //       />
  //     </Box>
  //     <Box
  //       mt={'20px'}
  //       mx='auto'
  //       {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
  //       width={agentImageWidth}
  //       gap={'15px'}
  //       className='cursorPointer'
  //     >
  //       <Box
  //         sx={{
  //           width: '100%',
  //           // overflow: 'hidden',
  //           // textOverflow: 'ellipsis',
  //           // whiteSpace: 'nowrap',
  //         }}
  //       >
  //         <Text
  //           text={agentName}
  //           token={isMobile ? tokens.FS14FW400LH19R : tokens.FS20FW500LH22_72SB}
  //           color={colors.black21}
  //           textAlign='left'
  //           cursor='pointer'
  //         />
  //         {agentLocation && (
  //           <Text
  //             text={agentLocation}
  //             token={isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
  //             color={colors.grey96}
  //             textAlign='left'
  //             styles={{
  //               marginBottom: '10px',
  //             }}
  //           />
  //         )}
  //       </Box>
  //       <Box
  //         {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
  //         padding={'5px'}
  //         borderRadius='50%'
  //         sx={{ backgroundColor: colors.black21 }}
  //       >
  //         <Image
  //           width={isMobile ? 15 : 20}
  //           height={isMobile ? 15 : 20}
  //           src={'/icons/arrow-right.svg'}
  //           alt='rightDirectionfilled'
  //         />
  //       </Box>
  //     </Box>
  //   </Box>
  // );
}
