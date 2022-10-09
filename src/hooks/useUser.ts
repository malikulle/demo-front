import { useTypedSelector } from "./useTypeSelector";

export const useUser = () => {
  const { userLogin } = useTypedSelector((state) => state.userLogin);
  return {
    ...userLogin,
  };
};
