import {
  GridContainer,
  SearchBar,
  Text,
  TextInputWithBorder,
} from '@/components';
import PlaceholderDataPropertyCard from '@/components/Cards/PlaceholderDataPropertyCard';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import Select from '@/components/Select/Select';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Divider, Grid, Stack, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

export default function PrivacyPolicy() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const router = useRouter();
  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <GridContainer>
          <Grid item xs={12}>
            <Text
              text='Privacy Policy'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '30px' : '50px' }}
            />

            <Text
              text={'Effective Date: March 5,2018'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '30px' : '40px' }}
            />
            <Text
              text={
                'This Privacy Policy outlines the practices and policies of UB Realty Inc. (“UB Realty,” “we,” “us,” or “our”) regarding the collection, use, disclosure, and protection of personal information in connection with our real estate brokerage services. By using our services, you consent to the practices described in this Privacy Policy.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '30px' }}
            />
            <Text
              text={'1. Collection of Information:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'We may collect personal information from clients, customers, and website visitors, including but not limited to names, contact details, property preferences, and financial information. We may collect this information through our website, in-person meetings, telephone conversations, and email correspondence.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'2. Use of Information:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'We use the collected information to provide real estate brokerage services, communicate with clients, offer property listings, facilitate transactions, and improve our services. Personal information may also be used for marketing purposes, but you can opt out of receiving marketing communications at any time.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'3. Disclosure  of Information:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'We may share personal information with our affiliated agents, service providers, and partners as necessary to fulfill our services. We may also disclose information as required by law or to protect our legal rights. Your information may be transferred outside of Canada for processing and storage, but appropriate safeguards will be in place.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'4. Data Security:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'We employ reasonable security measures to protect personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage can be guaranteed as completely secure.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'5. Client Access and Choice:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'You can review and update your personal information by contacting us. You can also opt out of marketing communications by following the instructions in those communications.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'6. Cookies and Tracking:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can manage your cookie preferences through your browser settings.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'7. Changes to Privacy Policy:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'We may update this Privacy Policy as our practices evolve. The revised policy will be posted on our website, and the date of the latest revision will be indicated.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'8. Our Privacy Commitment:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'UB Realty Inc. is dedicated to upholding the security, confidentiality, and privacy of your personal information. This Privacy Policy outlines our unwavering commitment to you and has been crafted in accordance with the Personal Information Protection and Electronic Documents Act. Please note that this Privacy Policy is subject to periodic revisions.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'9. Scope of Privacy Policy:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'This Policy pertains exclusively to UB Realty Inc. and its official website,  www.ubrealty.com. It addresses personal information relating to identifiable individuals and does not apply to data collected, utilized, or revealed in connection with corporate or commercial entities. It’s important to highlight that this Policy does not place any restrictions on the gathering, usage, or disclosure of your business contact information, as well as certain publicly available details.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'10. Public Forums and Third-Party Links:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'UB Realty Inc. operates the website  www.ubrealty.com, and other project related website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites which may incorporate public forums, message boards, and other interactive spaces for users. Please be aware that information shared within these sections of the website becomes publicly accessible and is not governed by this Privacy Policy. Furthermore, when referring users to third-party goods and services providers, these entities maintain their own independent privacy policies, which are separate from UB Realty Inc.’s.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'11. Collection and Usage of Personal Information:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'A representative from UB Realty Inc. may contact you via email, phone, or text to offer information about real estate products or services that might interest and benefit you. When gathering your personal information, UB Realty Inc. will always clarify the purpose of collection and seek your consent.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '15px' }}
            />
            <Text
              text={
                'Most personal information is directly collected from you through various contracts, discussions with UB Realty Inc. representatives, or via www.ubrealty.com. Certain information might also be obtained from other sources like government departments and agencies.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'12. Sharing of Personal Information:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'Your information might be shared with real estate boards, associations, government bodies, financial institutions, Builder, legal advisors, third-party goods and services providers, and more. These disclosures are for purposes outlined in the Privacy Policy.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '15px' }}
            />
            <Text
              text={
                'UB Realty Inc. and its partners might collect, use, and disclose your personal information for purposes such as connecting you with agents or third-party service providers, marketing properties, managing relationships, enhancing customer service, and complying with legal obligations.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'13. Additional Uses and Consent:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'UB Realty Inc. could contact you for additional real estate-related services or to offer information about products/services that might be of interest. If you wish to prevent such communication, you can notify UB Realty Inc. Privacy Officer in writing.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Stack direction='row' spacing={'3px'} mb={'10px'}>
              <Text
                text={'14. Regarding'}
                color={colors.black21}
                token={
                  isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                }
                textAlign='left'
              />
              <Text
                text={'www.ubrealty.com:'}
                color={colors.blueC2}
                token={
                  isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                }
                redirect='/'
                textAlign='left'
              />
            </Stack>
            <Text
              text={
                'The website may use your IP address and cookies for diagnostic and administrative purposes, including tailoring content and ads to your preferences.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'15. Privacy Safeguards UB Realty Inc:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'Implements reasonable security measures to protect personal information, including physical, organizational, and electronic safeguards. The company has guidelines in place, and employees are trained accordingly.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={'16. Access and Complaints:'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Text
              text={
                'You have the right to access your personal information held by UB Realty Inc. Upon written request and proper verification, you can receive information about how your data is being used and to whom it has been disclosed. Please note that certain exceptions might apply.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '15px' }}
            />
            <Text
              text={
                'Complaints or inquiries about this Privacy Policy should be directed to UB Realty Inc.’s designated Privacy Officer. Their contact information is provided below.'
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: isMobile ? '15px' : '25px' }}
            />
            <Text
              text={
                'UB REALTY INC., Brokerage 2985 Drew Rd., Suite – 216 Mississauga ON '
              }
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '15px', maxWidth: '220px' }}
            />
            <Text
              text={'L4T 0A4'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
              styles={{ marginBottom: '15px' }}
            />
            <Text
              text={'info@ubrealty.com'}
              color={colors.blueC2}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              redirect={'mailto:info@ubrealty.com'}
              textAlign='left'
              styles={{ marginBottom: '5px' }}
            />
            <Text
              text={'647-910-9000'}
              color={colors.black21}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH21_86R
              }
              textAlign='left'
            />
          </Grid>
        </GridContainer>
      </ResponsiveContainer>
    </Box>
  );
}

const privacyTextPara1 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, purus a dictum euismod, ante sapien facilisis odio, non lobortis magna dolor quis dolor. Praesent efficitur nunc vitae mollis cursus. Maecenas ultrices est ornare aliquam consectetur. Curabitur porttitor lacus velit, vitae hendrerit neque tincidunt a. Fusce et convallis dolor, ut commodo nunc. Vestibulum dapibus sodales laoreet. Nullam pretium, nibh ut ullamcorper fermentum, orci nulla bibendum ligula, vel rutrum nulla ex sed mi. Donec vel venenatis arcu, a maximus massa. In hac habitasse platea dictumst. Aliquam at ultricies libero. Suspendisse potenti.';
const privacyTextPara2 =
  'Integer convallis metus vitae libero congue tristique. Donec varius urna molestie cursus dapibus. Aenean tincidunt vel arcu quis aliquet. Nunc urna est, vestibulum et ex ultrices, ornare dictum mi. In vehicula est sit amet ipsum cursus, commodo fermentum lectus dictum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam hendrerit tortor non lacus pharetra efficitur. Nullam mattis neque eget lectus vulputate, et efficitur est vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.';
const privacyTextPara3 =
  'Morbi mattis vehicula sapien, sed viverra felis tempus vitae. Vivamus faucibus sed ex non faucibus. Nulla tristique elit a elit eleifend sodales. Phasellus vehicula lacinia sagittis. Phasellus varius accumsan nunc, vel porttitor magna blandit ut. Quisque sit amet purus arcu. Duis euismod, libero sed dictum placerat, massa erat bibendum nibh, quis tempor enim orci quis felis. Mauris nisi nulla, tempus sit amet molestie sed, ultricies vel ipsum. Sed porta maximus tincidunt. Nunc auctor rhoncus ante vel accumsan.';
const privacyTextPara4 =
  'Pellentesque suscipit gravida sapien, quis mollis nulla convallis nec. Nullam a sagittis mi. Nunc viverra, eros sed hendrerit venenatis, mi nibh eleifend mauris, in blandit neque arcu sit amet neque. Integer euismod condimentum eros id viverra. Sed dignissim sem eget justo pulvinar vehicula. Duis non rutrum eros. Sed accumsan dictum felis non aliquam. Fusce quis aliquam lacus, non ultricies augue. In leo velit, facilisis a nisl a, fringilla tincidunt lorem. Suspendisse vestibulum pulvinar condimentum. Vestibulum molestie tincidunt mi eget consectetur. Maecenas rutrum convallis ipsum eu imperdiet. Donec in arcu dictum, posuere dolor eu, faucibus orci.';
const privacyTextPara5 =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a nulla non nisl congue blandit. Curabitur condimentum risus eget odio venenatis, quis iaculis felis molestie. Vestibulum nibh sem, semper eget ultrices ac, lacinia nec risus. Morbi magna ligula, fermentum eget consectetur quis, convallis vel sapien. Phasellus feugiat felis erat, vitae mollis neque viverra ac. Vivamus quis purus ex. Duis hendrerit convallis velit, dapibus vulputate velit. Nunc interdum pellentesque gravida. Sed iaculis pulvinar vestibulum. Aenean ac magna sapien. Quisque a est lacus.';
