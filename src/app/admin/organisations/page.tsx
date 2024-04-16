'use client';
import AdminLayout from '@/shared/layouts/adminLayout';
import React, { useRef } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';

const Organisations = () => {
  const debounceSearch = useRef(
    debounce((criteria) => {
      console.log(criteria);
      // setFilter(criteria);
      // setPage(0);
    }, 500)
  ).current;

  const searchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(e.target.value);
  };

  return (
    <AdminLayout
      headerChildren={<AdminOrganisationHeader searchText={searchText} />}>
      <div>
        <h1>Organisations</h1>
      </div>
    </AdminLayout>
  );
};

type AdminOrganisationHeaderProps = {
  searchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AdminOrganisationHeader: React.FC<AdminOrganisationHeaderProps> = ({
  searchText,
}) => {
  return (
    <div className="w-full">
      <form>
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            className="w-full appearance-none bg-white pl-8 shadow-none md:w-2/3 lg:w-1/3"
            placeholder="Search organisations by name..."
            type="search"
            onChange={searchText}
          />
        </div>
      </form>
    </div>
  );
};

export default Organisations;
