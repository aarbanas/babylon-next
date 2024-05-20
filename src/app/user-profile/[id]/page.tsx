'use client';
import React, { useEffect, useState } from 'react';
import { BookUser, Building, CircleUser, Mail, Phone } from 'lucide-react';
import DashboardLayout from '@/shared/layouts/dashboardLayout';
import { UserDto } from '@/services/user/dto/user.dto';
import findOne from '@/services/user/findOne';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { translateUserTypes } from '@/utils';
import CertificateTable from '@/app/profile/certificates/components/certificateTable/CertificateTable';

interface Props {
  params: { id: string };
}

const UserProfilePage: React.FC<Props> = ({ params }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await findOne(params.id);
      if (response) setUser(response);
      setLoading(false);
    };

    fetchUser();
  }, [params.id]);

  if (isLoading) return <DashboardLayout>Loading...</DashboardLayout>;

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-10 md:flex-row">
        <Card className="w-full px-10 py-6 md:w-1/3">
          <div className="mb-8 flex justify-center">
            <Image
              src={user.profilePhoto || '/user-icon.png'}
              style={{ borderRadius: '100000px' }}
              alt={user.userAttributes.firstname}
              width={150}
              height={150}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-2">
              <BookUser />
              <span>
                {`${user.userAttributes.firstname} ${user.userAttributes.lastname}`}
              </span>
            </div>
            {user.userAttributes.city && (
              <div className="flex flex-row gap-2">
                <Building />
                <span>{user.userAttributes.city}</span>
              </div>
            )}
            {user.userAttributes.type && (
              <div className="flex flex-row gap-2">
                <CircleUser />
                <span>{translateUserTypes(user.userAttributes.type)}</span>
              </div>
            )}
            {user.email && (
              <div className="flex flex-row gap-2">
                <Mail />
                <span>{user.email}</span>
              </div>
            )}
            {user.userAttributes.phone && (
              <div className="flex flex-row gap-2">
                <Phone />
                <span>{user.userAttributes.phone}</span>
              </div>
            )}
          </div>
          <Button
            color={'primary'}
            className={'mt-6 w-full'}
            onClick={() => (window.location.href = `mailto:${user.email}`)}>
            Kontakt
          </Button>
        </Card>
        <Card className="w-full px-10 py-6 md:w-2/3">
          <CertificateTable
            certificates={user.userAttributes.certificates ?? []}
            allowedActions={['download']}
            hiddenColumns={['actions']}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserProfilePage;
