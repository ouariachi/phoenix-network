import { cn, debounce } from '@/lib/utils';
import { Search } from 'lucide-react';
import React from 'react'

export const SearchBar = ({ className, onSearch }: { className?: string, onSearch?: (value: string) => void }) => {
  const onSearchDebounced = debounce(onSearch || (() => { }));

  return (
    <div className={cn("relative", className)}>
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="w-5 h-5 text-foreground" />
      </span>
      <input
        type="text"
        placeholder="Buscar..."
        className="
              w-full rounded-full bg-transparent pl-10 pr-4 py-1.5 
              outline-none ring-foreground ring-1
              placeholder:text-foreground/50 transition-all duration-300
            "
        onChange={(e) => onSearchDebounced(e.target.value)}
      />
    </div>
  )
}
