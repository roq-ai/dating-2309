import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VerificationInterface {
  id?: string;
  verification_status: boolean;
  verification_method: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface VerificationGetQueryInterface extends GetQueryInterface {
  id?: string;
  verification_method?: string;
  user_id?: string;
}
