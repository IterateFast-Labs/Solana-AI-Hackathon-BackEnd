export interface LeaderboardEntry {
  rank: number;
  userId: string;
  nickname: string;
  labelingPoints: number;
  validatorPoints: number;
  referralCount: number;
  clickerPoints: number;
  totalPoints: number;
}

export interface UserRankResult {
  rank: number;
  nickname: string;
  labelingPoints: number;
  validatorPoints: number;
  clickerPoints: number;
  referralCount: number;
  totalPoints: number;
}

export enum LeaderboardType {
  TOTAL = 'TOTAL',
  LABELING = 'LABELING',
  CLICKER = 'CLICKER',
  REFERRAL = 'REFERRAL',
  VALIDATOR = 'VALIDATOR',
  /*
  QUEST = 'QUEST',
  INGAME_TASK = 'INGAME_TASK',
  */
}
