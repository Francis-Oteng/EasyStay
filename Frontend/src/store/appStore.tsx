import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface SearchFilters {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

interface AppState {
  sidebarOpen: boolean;
  searchFilters: SearchFilters;
  pageTitle: string;
  pageLoading: boolean;
}

interface AppStoreContext extends AppState {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSearchFilters: (filters: SearchFilters) => void;
  clearSearchFilters: () => void;
  setPageTitle: (title: string) => void;
  setPageLoading: (loading: boolean) => void;
}

const AppStore = createContext<AppStoreContext | null>(null);

const initialState: AppState = {
  sidebarOpen: false,
  searchFilters: {},
  pageTitle: '',
  pageLoading: false,
};

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(initialState.sidebarOpen);
  const [searchFilters, setSearchFiltersState] = useState<SearchFilters>(initialState.searchFilters);
  const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
  const [pageLoading, setPageLoading] = useState(initialState.pageLoading);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const clearSearchFilters = useCallback(() => {
    setSearchFiltersState({});
  }, []);

  return (
    <AppStore.Provider
      value={{
        sidebarOpen,
        searchFilters,
        pageTitle,
        pageLoading,
        toggleSidebar,
        setSidebarOpen,
        setSearchFilters: setSearchFiltersState,
        clearSearchFilters,
        setPageTitle,
        setPageLoading,
      }}
    >
      {children}
    </AppStore.Provider>
  );
}

export function useAppStore(): AppStoreContext {
  const context = useContext(AppStore);
  if (!context) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return context;
}