'use client';
import React, { useEffect, useState } from 'react';
import { UserDto } from '@/services/user/dto/user.dto';
import findOne from '@/services/user/findOne';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import * as Switch from '@radix-ui/react-switch';
import updateUser from '@/services/user/update';
import { toast } from 'react-toastify';
import AdminLayout from '@/shared/layouts/adminLayout';
import { useRouter } from 'next/navigation';

interface Props {
  params: { id: string };
}

const OrganisationProfile: React.FC<Props> = ({ params }) => {
  const [organisation, setOrganisation] = useState<UserDto | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [active, setActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganisation = async () => {
      const response = await findOne(params.id);
      if (response) {
        setOrganisation(response);
        setActive(response.active);
      }
      setLoading(false);
    };

    fetchOrganisation();
  }, [params.id]);

  const getFullYear = (date: string): string => {
    const d = new Date(date);
    return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
  };

  const updateOrganisation = async () => {
    try {
      setIsSubmitting(true);
      await updateUser(params.id, { active });
      toast('Organisation profile updated', { type: 'success' });
    } catch (error) {
      toast('Something went wrong. Please try again', { type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <>Loading...</>;

  if (!organisation) return null;

  return (
    <AdminLayout headerChildren={<h1>Update user profile</h1>}>
      <div className="flex flex-col md:flex-row">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Profile</CardTitle>
            <p className="text-sm leading-none text-gray-500">
              Update organisation profile information.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="firstName"
                value={organisation.organisationAttributes.name}
                readOnly={true}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Oib</Label>
              <Input
                id="type"
                value={organisation.organisationAttributes.oib}
                readOnly={true}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="active">Active</Label>
              <Switch.Root
                className="bg-blackA6 shadow-blackA4 relative h-[25px] w-[42px] cursor-pointer rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"
                id="active"
                checked={active}
                onCheckedChange={setActive}>
                <Switch.Thumb className="shadow-blackA4 block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Contact Information
              </h3>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={organisation.email}
                  readOnly={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">Street</Label>
                <Input
                  id="city"
                  value={organisation.organisationAttributes.street}
                  readOnly={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={organisation.organisationAttributes.city}
                  readOnly={true}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Meta Information
              </h3>

              <div className="grid gap-2">
                <Label htmlFor="createdAt">Created at</Label>
                <Input
                  id="createdAt"
                  value={getFullYear(organisation.createdAt!).toString()}
                  readOnly={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="updatedAt">Updated at</Label>
                <Input
                  id="updatedAt"
                  value={getFullYear(organisation.updatedAt!)}
                  readOnly={true}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
              <Button
                size="sm"
                onClick={updateOrganisation}
                disabled={isSubmitting}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push('/admin/organisations')}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default OrganisationProfile;
