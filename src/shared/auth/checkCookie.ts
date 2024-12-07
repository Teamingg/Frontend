'use server';

import { cookies } from 'next/headers';

export const checkCookie = (key: string) => {
  return cookies().has(key);
};

export default checkCookie;
