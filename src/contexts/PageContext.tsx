"use client";
import { SOL_PRICE_API } from "@/config";

interface PageContextType {
  solPrice: number;
}


export function useData() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("useData must be used within a ModalProvider");
  }
  return context;
}

interface PageProviderProps {
  children: ReactNode;
}

export function PageProvider({ children }: PageProviderProps) {
  const priceData = useQuery("repoData", () =>
    fetch(SOL_PRICE_API).then(res => res.json())
  );

  const solPrice = priceData.data?.solana?.usd
    ? priceData.data?.solana?.usd
    : 57.5;
  const pageContextValue: PageContextType = {
    solPrice,
  };

  return (
    <PageContext.Provider value={pageContextValue}>
      {children}
    </PageContext.Provider>
  );
}
