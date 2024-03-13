'use client';
/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/QCBCWvTPZPj
 */
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import {
  PaginationContent,
  Pagination,
  PaginationPages,
} from '@/components/ui/pagination';
import { SVGProps, useEffect, useState } from 'react';
import findUsers, { Sort } from '@/services/user/find';
import { UserDto } from '@/services/user/dto/user.dto';
import { ArrowUpDown, CheckCircle2, XCircle } from 'lucide-react';

type TSVGElementProps = SVGProps<SVGSVGElement>;

const UserList = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<Sort>({ id: 'asc' });
  const [totalPageNumber, setTotalPageNumber] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await findUsers({
          page,
          sort: Object.keys(sort)[0],
          dir: Object.values(sort)[0],
        });

        setUsers(data.data);
        setTotalPageNumber(Math.ceil(data.meta.count / data.meta.take));
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, [page, sort]);

  const sortUsers = (key: string) => {
    if (sort[key]) {
      setSort({ [key]: sort[key] === 'asc' ? 'desc' : 'asc' });
      return;
    }

    const _sort: Sort = { [key]: 'asc' };
    setSort(_sort);
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <span className="">User Management</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                href="#">
                <UsersIcon className="h-4 w-4" />
                User List
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                href="#">
                <ListIcon className="h-4 w-4" />
                Organisation list
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6">
          <Link className="lg:hidden" href="#">
            <UsersIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                  placeholder="Search users..."
                  type="search"
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">User List</h1>
          </div>
          <div className="border shadow-sm rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="w-[80px] cursor-pointer"
                    onClick={() => sortUsers('id')}>
                    <div className="flex justify-between">
                      ID
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden md:table-cell cursor-pointer align-middle grid-cols-1"
                    onClick={() => sortUsers('email')}>
                    <div className="flex justify-between">
                      Email
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => sortUsers('userAttributes.firstname')}>
                    <div className="flex justify-between">
                      First Name
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => sortUsers('userAttributes.lastname')}>
                    <div className="flex justify-between">
                      Last Name
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead
                    className="hidden md:table-cell cursor-pointer"
                    onClick={() => sortUsers('role')}>
                    <div className="flex justify-between">
                      Role
                      <ArrowUpDown size={16} />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.userAttributes.firstname}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.userAttributes.lastname}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.role}
                    </TableCell>
                    <TableCell>
                      {user.active ? <CheckCircle2 /> : <XCircle />}
                    </TableCell>
                    <TableCell>
                      <Button className="ml-2" size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button className="ml-2" size="sm" variant="outline">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationPages
                totalPageNumber={totalPageNumber}
                currentPage={page + 1}
                onChangePage={(pageNumber) => setPage(pageNumber)}
                onPreviousPage={() => {
                  if (page === 0) return;
                  setPage(page - 1);
                }}
                onNextPage={() => {
                  if (page === totalPageNumber - 1) return;
                  setPage(page + 1);
                }}
              />
            </PaginationContent>
          </Pagination>
        </main>
      </div>
    </div>
  );
};

const UsersIcon = (props: TSVGElementProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0-4-4H6a4 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 1 7.75" />
    </svg>
  );
};

const ListIcon = (props: TSVGElementProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
};

const SearchIcon = (props: TSVGElementProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

export default UserList;
