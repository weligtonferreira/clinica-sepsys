'use client';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from 'jwt-decode';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { AuthContextType, User } from '@/interfaces';

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUser = useCallback(() => {
    setIsLoading(true);

    const authUser = Cookies.get('auth_user');
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      try {
        const decoded: JwtPayload = jwtDecode(accessToken);

        const currentTime = Date.now() / 1000;

        if (decoded.exp && currentTime > decoded.exp) {
          logout();
          setIsLoading(false);
          return;
        }
      } catch (error) {
        logout();
        setIsLoading(false);
        return;
      }
    }

    if (authUser) {
      const parsedUser = JSON.parse(authUser);

      if (JSON.stringify(parsedUser) !== JSON.stringify(user)) {
        setUser(JSON.parse(authUser));
      }
    } else if (user !== null) {
      setUser(null);
    }

    setIsLoading(false);
  }, [user]);

  const updateUser = useCallback((userData: Partial<User>) => {
    try {
      const savedUserRaw = Cookies.get('auth_user');
      if (!savedUserRaw) return;

      const savedUser = JSON.parse(savedUserRaw);

      const updatedUser = {
        ...savedUser,
        no_user: userData.no_user,
      };

      Cookies.set('auth_user', JSON.stringify(updatedUser), {
        sameSite: 'strict',
      });

      setUser(updatedUser);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const login = useCallback((user: User) => {
    if (user.access_token) {
      Cookies.set('access_token', user.access_token, {
        sameSite: 'strict',
      });

      Cookies.set('auth_user', JSON.stringify(user), { sameSite: 'strict' });

      setUser(user);
    } else {
      throw new Error('Token is missing');
    }
  }, []);

  const logout = useCallback(() => {
    Cookies.remove('access_token');
    Cookies.remove('auth_user');
    setUser(null);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const contextValue = useMemo(
    () => ({ user, isLoading, login, logout, updateUser }),
    [user, isLoading, login, logout, updateUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
