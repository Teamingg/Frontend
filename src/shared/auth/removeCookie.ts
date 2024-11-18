'use server';

import { cookies } from 'next/headers';

export const removeCookie = (key: string) => {
  console.log(key);
  console.log(cookies().get('accessToken'));

  cookies().delete('accessToken');
  console.log(cookies().get('accessToken'));
};
