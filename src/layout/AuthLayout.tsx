import { Navigate, Outlet } from "react-router-dom"
import useTokenStore from '@/store';

export const AuthLayout = () => {

  const token = useTokenStore((state)=> state.token);

  if(token){
    return <Navigate to={'/dashboard/home'} replace/>
  }

  return (
    <>
        <Outlet/>
    </>
  )
}
