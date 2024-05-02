import type { Profile } from '@/entities/Profile';
import type { Rating } from '@/entities/Rating';
import type { User } from '@/entities/User';

export interface ProfileRatingEntity {
  feedback?: Rating['feedback'];
  id: string;
  profileId: Profile['id'];
  rate: Rating['rate'];
  userId: User['id'];
}
