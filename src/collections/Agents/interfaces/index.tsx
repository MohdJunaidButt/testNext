interface UserProfile {
    id: string;
    name: string;
    mobile_no: string;
    is_active: boolean;
    image_url: string;
    username: string;
    // Add other properties as needed
  }
  
 export interface User {
    code_2fa: null | string;
    created_at: string;
    created_by: null | string;
    email: string;
    hach_refresh_token: null | string;
    has_logged_in: boolean;
    id: string;
    is_active: boolean;
    is_banned: boolean;
    is_social_login: boolean;
    last_login: null | string;
    password: string;
    profile: UserProfile; // Define the profile property here
    role: string;
    updated_at: string;
    // Add other properties as needed
  }
  
  interface UserStats {
    all_users: number;
    total_agents: string;
    total_users: string;
  }
  
  export interface UserData {
    userStasts: UserStats;
    users: User[];
  }
  