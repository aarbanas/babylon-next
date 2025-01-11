'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { forgotPassword } from '@/app/actions/forgot-password';

export function ForgotPasswordForm() {
  const [state, formAction] = useFormState(forgotPassword, null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true);
    formAction(formData);
    setIsSubmitting(false);
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Zaboravljena lozinka</CardTitle>
        <CardDescription>
          Unesite vašu email adresu kako bi te postavili novu lozinku.
        </CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Unesite vašu email adresu"
              />
            </div>
            {state?.error && (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle size={20} />
                <span>{state.error}</span>
              </div>
            )}
            {state?.success && (
              <div className="flex items-center space-x-2 text-green-500">
                <CheckCircle size={20} />
                <span>{state.success}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Šaljem...' : 'Pošalji'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
