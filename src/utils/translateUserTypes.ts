import { Type } from '@/app/register/types';

export function translateUserTypes(type: Type): string {
  if (type === Type.DOCTOR) return 'Liječnik';
  if (type === Type.NURSE) return 'Tehničar';
  if (type === Type.LIFEGUARD) return 'Spasioc';

  return 'NA';
}
