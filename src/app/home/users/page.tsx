'use client';

import { api } from '@/http/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type User = {
  nu_user: number;
  no_user: string;
};

export default function UsersListPage() {
  const [users, setUsers] = useState<User[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    async function handleFetchUsers() {
      try {
        const { data } = await api.get('/user', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc2MjkwOTA1MywianRpIjoiYzM1MmM3Y2EtYmJhZC00NzFlLTk4YzQtZGI0YmM0MDBlYjFjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjMzMyIsIm5iZiI6MTc2MjkwOTA1MywiY3NyZiI6IjIzMzUwYTNjLWRkYWItNDFmYS05NTM4LWI0NTBkZWNjNzhjZSIsImV4cCI6MTc2Mzc3MzA1M30.0o951Msfb1GuVZ3N4NZwsLT1Wh915t09EoxZFnWNc7I`,
          },
        });
        console.log(data);
        setUsers(data.content);
      } catch (error) {
        console.log(error);
      }
    }

    handleFetchUsers();
  }, []);

  return (
    <main className='flex items-center justify-center min-h-screen h-full w-full'>
      <div className='bg-white p-4 rounded-lg w-[90%] md:w-full max-w-xl shadow'>
        <ul className='flex flex-col gap-2'>
          {users &&
            users.map((user) => (
              <div key={user.nu_user} className='flex justify-between w-full'>
                <li className='text-black text-sm'>{user.no_user}</li>

                <div className='flex gap-2'>
                  <MdEdit
                    onClick={() => router.push(`/users/${user.nu_user}/edit`)}
                    className='text-sky-900 cursor-pointer'
                    size={20}
                  />
                  <FaTrash className='text-red-900 cursor-pointer' size={18} />
                </div>
              </div>
            ))}
        </ul>
      </div>
    </main>
  );
}
