export interface ApiData {
    message: string,
    statusCode: number,
    status: string,
    withdrawData?:any
    data: {
    totalPlayers: number;
    todaysUserAddition: number;
    lastSevenDaysUserAddition: number;
    lastThirtyDaysUsersAddition: number;
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    totalGames: number;
    totalRake: number;
    totalPotAmount: number;
    totalDepositCount: number;
    totalDepositAmount: number;
    totalAdminDepositCount: number;
    totalAdminDepositAmount: number;
    totalAdminBonusCount: number;
    totalAdminBonusAmount: number;
    withdrawData: {
      _id: string;
      totalAmount: number;
      tdsAmount: number;
      count: number;
    }[];
  }
}

export interface ApiDataProps {
    apiData : ApiData
}
  