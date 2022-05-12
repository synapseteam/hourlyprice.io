import { useAppSelector } from "../../store/hooks";

const useAuth = () => {
  const { email, token, id } = useAppSelector((state) => state.auth.user);

  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};

export default useAuth;
