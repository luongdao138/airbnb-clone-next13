"use client";

import { FormattedCountry, useCountries } from "@/app/utils/hooks/useCountries";
import { FC } from "react";
import Select from "react-select";

interface CountrySelectProps {
  value: FormattedCountry | null;
  onChange: (value: FormattedCountry | null) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ onChange, value }) => {
  const { countries } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={countries}
        value={value}
        onChange={onChange}
        formatOptionLabel={(option) => {
          return (
            <div className="flex items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},{" "}
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </div>
            </div>
          );
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
