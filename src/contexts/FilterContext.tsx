import { createContext, ReactNode, useContext, useState } from 'react';

export interface IFilter {
    name: string;
    assetId: string;
    eventName: string;
}

interface FilterContextData {
    filters: IFilter;
    handleFilters: (filters: IFilter) => void;
}

interface FilterProviderProps {
    children: ReactNode;
}

export const FilterContext = createContext({} as FilterContextData);

export function FilterProvider({ children }: FilterProviderProps) {
    const [filters, setFilters] = useState<IFilter>({} as IFilter);

    function handleFilters(filters: IFilter) {
        setFilters(filters);
    };

    return(
        <FilterContext.Provider
            value={{
                filters,
                handleFilters
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilters = () => useContext(FilterContext);
