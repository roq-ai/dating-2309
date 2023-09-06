import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SocialMediaInterface {
  id?: string;
  platform_name: string;
  profile_link: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface SocialMediaGetQueryInterface extends GetQueryInterface {
  id?: string;
  platform_name?: string;
  profile_link?: string;
  user_id?: string;
}
