import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  setQuery: (value: string | ((value: string) => string)) => void;
  manufacturer: string;
  setManufacturer: (value: string) => void;
}
interface ManufacturerProps {
  manufacturer: string;
  setManufacturer: (value: string) => void;
}

function Search({
  query,
  setQuery,
  manufacturer,
  setManufacturer,
}: SearchProps) {
  function querryToUperCase(query: string) {
    if (query.length < 2) {
      return query.toUpperCase();
    } else {
      return query.charAt(0).toUpperCase() + query.slice(1);
    }
  }
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code === "Enter") {
        inputEl.current?.focus();
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [inputEl]);

  return (
    <div className="flex  h-14 items-center justify-center bg-red-800 text-lg md:h-20 md:text-2xl">
      <SelectManufacturer
        manufacturer={manufacturer}
        setManufacturer={setManufacturer}
      />
      <input
        className=" ml-5 h-10 w-80 rounded-lg border-2 bg-gray-200 text-red-800 md:h-14 md:w-96"
        id="search"
        placeholder="Search car model.."
        type="text"
        value={query}
        onChange={(e) => setQuery(querryToUperCase(e.target.value))}
        ref={inputEl}
      />
    </div>
  );
}
function SelectManufacturer({
  manufacturer,
  setManufacturer,
}: ManufacturerProps) {
  return (
    <div>
      <select
        className="h-10 rounded-lg border-2 bg-gray-200  md:h-14 md:w-96"
        id="select"
        value={manufacturer}
        onChange={(e) => {
          setManufacturer(e.target.value);
        }}
      >
        <option value="">Search by manufacturer</option>
        <option value="Audi">Audi</option>
        <option value="BMW">BMW</option>
        <option value="Mercedes-Benz">Mercedes-Benz</option>
        <option value="Ferrari">Ferrari</option>
        <option value="Porsche">Porsche</option>
        <option value="Volkswagen">Volkswagen</option>
        <option value="Toyota">Toyota</option>
      </select>
    </div>
  );
}

export default Search;
