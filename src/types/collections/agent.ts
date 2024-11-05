export interface IAgent {
  id: string;
  email: string;
  created_at: string;
  is_active: boolean;
  is_banned: boolean;
  role: string;
  password: string;
  profile: IProfile;
}

export interface IProfile {
  id: number;
  name: string;
  mobile_no: string;
  is_active: boolean;
  image_url: string;
  city: string;
  gender: string;
  username: string | null;
  description: string | null;
  location: string | null;
  experience: string | null;
  receive_notifications_listings: boolean;
  receive_notifications_favourites: boolean;
  receive_notifications_sales: boolean;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
}
