'use client';

import { api } from '@/http/api';
import { useEffect, useState } from 'react';

type User = {
  nu_user: number;
  no_user: string;
};

export default function UsersListPage() {
  const [users, setUsers] = useState<User[] | []>([]);

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
    <main>
      <div>
        <ul>
          {users &&
            users.map((user) => <li key={user.nu_user}>{user.no_user}</li>)}
        </ul>
      </div>
    </main>
  );
}
