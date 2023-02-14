import React from 'react';
import Loading from '@/components/fetchdata/Loading';
import useFetchData from '@/services/hooks/useFetchData';

export default function FetchData() {
  const [loading] = useFetchData();

  if (loading) return <Loading />;

  document.location = '/';
}
