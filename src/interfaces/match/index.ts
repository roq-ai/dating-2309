import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MatchInterface {
  id?: string;
  matched_user_id: string;
  user_id: string;
  match_score?: number;
  match_status?: boolean;
  created_at?: any;
  updated_at?: any;

  user_match_matched_user_idTouser?: UserInterface;
  user_match_user_idTouser?: UserInterface;
  _count?: {};
}

export interface MatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  matched_user_id?: string;
  user_id?: string;
}
