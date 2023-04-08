import countries, { Country } from "world-countries";

export type FormattedCountry = {
  value: Country["cca2"];
  flag: Country["flag"];
  label: Country["name"]["common"];
  latlng: Country["latlng"];
  region: Country["region"];
};

const formattedCountries: FormattedCountry[] = countries.map((country) => ({
  flag: country.flag,
  value: country.cca2,
  label: country.name.common,
  latlng: country.latlng,
  region: country.region,
}));

export function useCountries() {
  const findCountryByCca = (cca: string) => {
    return formattedCountries.find((c) => c.value === cca) ?? null;
  };

  return {
    countries: formattedCountries,
    rawCountries: countries,
    findCountryByCca,
  };
}
