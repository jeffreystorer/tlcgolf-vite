import { set } from '@/utils/localStorage';

export default function setLoginTimeStamp() {
  const timeStamp: number = Date.now();
  set('timeStamp', timeStamp);
}
