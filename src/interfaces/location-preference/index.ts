import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LocationPreferenceInterface {
  id?: string;
  distance?: number;
  location?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface LocationPreferenceGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  user_id?: string;
}
