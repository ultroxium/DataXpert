import { cookies } from 'next/headers';

export function getTokenFromCookies(): string | null {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    return token;
  }

  return null;
}
