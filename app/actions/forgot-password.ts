'use server';

import { z } from 'zod';
import { resetForgottenPassword } from '@/services/user/resetPassword';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function forgotPassword(prevState: unknown, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return { error: 'Nepravilna email adresa' };
  }

  const { email } = validatedFields.data;

  try {
    await resetForgottenPassword(email);
  } catch (e) {
    return { error: 'Greška prilikom resetiranja lozinke' };
  }

  return { success: `Link za postavljanje nove lozinke je poslan na ${email}` };
}
