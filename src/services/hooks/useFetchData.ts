import React, { useEffect, useState } from 'react';
import {
  BATCH_URL,
  WEDNESDAY_URL,
  SHEET_URL,
  BASE_URL,
  SHEET_ID,
  KEY,
} from '@/services/constants';
import setCaptains from '@/services/utils/setCaptains';
import setWednesdaySchedules from '@/services/utils/setWednesdaySchedules';
import setTutorials from '@/services/utils/setTutorials';
import setBets from '@/services/utils/setBets';
import setSchedules from '@/services/utils/setSchedules';
import setSheetUrl from '@/services/utils/setSheetUrl';
import useFetchSheetsData from '@/services/hooks/useFetchSheetsData';
import useFetchToken from '@/services/hooks/useFetchToken';
import { get, set } from '@/utils/localStorage';
import setFoundGolferAndIsLoggedIn from '@/services/utils/setFoundGolferAndIsLoggedIn';
import setPlayersAndGroups from '@/services/utils/setPlayersAndGroups';

export default function useFetchData() {
  const [loading, setLoading] = useState(true);
  const ghinNumber = get('ghinNumber');
  const PLAYERSANDGROUPS_URL =
    BASE_URL + SHEET_ID + '/values/' + ghinNumber + KEY;
  const dataMode = get('dataMode');
  const [wednesdayValues, wednesdayLoading] = useFetchSheetsData(
    WEDNESDAY_URL,
    'one'
  );
  const [batchData, batchLoading] = useFetchSheetsData(BATCH_URL, 'many');
  const [sheetsData, sheetsLoading] = useFetchSheetsData(SHEET_URL, 'many');
  const [playersAndGroupsValues, playersAndGroupsLoading] = useFetchSheetsData(
    PLAYERSANDGROUPS_URL,
    'one'
  );
  const [token, tokenLoading] = useFetchToken();

  useEffect(() => {
    if (
      !wednesdayLoading &&
      !batchLoading &&
      !sheetsLoading &&
      !playersAndGroupsLoading &&
      !tokenLoading
    ) {
      if (ghinNumber === '585871') setWednesdaySchedules(wednesdayValues);
      setSchedules(batchData.valueRanges[0].values);
      setTutorials(batchData.valueRanges[1].values);
      setBets(batchData.valueRanges[2].values);
      setCaptains(batchData.valueRanges[3].values);
      set('roster', batchData.valueRanges[4].values);
      dataMode === 'roster' && setFoundGolferAndIsLoggedIn(null);
      setSheetUrl(sheetsData);
      const hasGoogleSheet = get('hasGoogleSheet');
      hasGoogleSheet && setPlayersAndGroups(playersAndGroupsValues);
      set('token', token.golfer_user.golfer_user_token);
      setLoading(false);
    }
  }, [
    wednesdayLoading,
    batchLoading,
    sheetsLoading,
    playersAndGroupsLoading,
    tokenLoading,
  ]);

  return [loading];
}
