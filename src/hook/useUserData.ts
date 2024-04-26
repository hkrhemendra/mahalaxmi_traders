import { userAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function useUserData(){
  const [data, setData] = useState({
    token: "",
  });

  const userData: any = useAtomValue(userAtom);

  setData(userData);
  return [data];
};
