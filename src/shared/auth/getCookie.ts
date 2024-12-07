'use server';

import { cookies } from 'next/headers';

export const getCookie = (key: string) => {
  return cookies().get(key)?.value;
};

export default getCookie;
