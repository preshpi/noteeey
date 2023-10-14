import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.user.user);
    const router = useRouter();

    if(!user){
        router.push("/");
        return null;
    }
  return (
    <>{children}</>
  )
}

export default ProtectedRoute