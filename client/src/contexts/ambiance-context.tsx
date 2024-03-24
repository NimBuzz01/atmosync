"use client";
import { createHistoryEntry } from "@/lib/utils/feedback";
import { getRecommendedGenre } from "@/lib/utils/music";
import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the type of the context
interface AmbianceContextType {
  ambiance: string;
  setAmbiance: (value: string) => void;
  soundLevel: string;
  setSoundLevel: (value: string) => void;
  humanCount: string;
  setHumanCount: (value: string) => void;
  recommendedGenre: string[];
  setRecommendedGenre: (value: string[]) => void;
}

// Define the context
const AmbianceContext = createContext<AmbianceContextType | undefined>(
  undefined
);

// Define the provider component
export const AmbianceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ambiance, setAmbiance] = useState<string>("");
  const [soundLevel, setSoundLevel] = useState<string>("");
  const [humanCount, setHumanCount] = useState<string>("");
  const [recommendedGenre, setRecommendedGenre] = useState<string[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    const createEntry = async () => {
      if (session?.user.id) {
        await createHistoryEntry(
          session?.user?.id,
          ambiance,
          humanCount,
          soundLevel
        );
      }
    };
    if (ambiance) {
      setRecommendedGenre(getRecommendedGenre(ambiance));
      createEntry();
    }
  }, [ambiance]);

  return (
    <AmbianceContext.Provider
      value={{
        ambiance,
        setAmbiance,
        soundLevel,
        setSoundLevel,
        humanCount,
        setHumanCount,
        recommendedGenre,
        setRecommendedGenre,
      }}
    >
      {children}
    </AmbianceContext.Provider>
  );
};

// Custom hook that shorthands the context!
export const useAmbianceContext = (): AmbianceContextType => {
  const context = useContext(AmbianceContext);
  if (!context) {
    throw new Error(
      "useAmbianceContext must be used within an AmbianceProvider"
    );
  }
  return context;
};
