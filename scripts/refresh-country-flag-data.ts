import { writeFileSync } from "fs";
import { join } from "path";
import type { Game } from "@/lib/gameTypes";

type RestCountry = {
  cca2: string;
  cca3?: string;
  name: {
    common: string;
    official?: string;
    nativeName?: Record<string, { common?: string; official?: string }>;
  };
  capital?: string[];
  region?: string;
  subregion?: string;
  flags?: { svg?: string; png?: string; alt?: string };
  maps?: { googleMaps?: string; openStreetMaps?: string };
  currencies?: Record<string, { name?: string; symbol?: string }>;
  languages?: Record<string, string>;
};

const REST_COUNTRIES_URL =
  "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,capital,region,subregion,flags,maps,currencies,languages";
const MAPSICON_BASE = "https://raw.githubusercontent.com/djaiss/mapsicon/master/all";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values: Array<string | undefined>) {
  return [...new Set(values.filter((value): value is string => Boolean(value?.trim())))];
}

function countryAliases(country: RestCountry) {
  const nativeNames = Object.values(country.name.nativeName ?? {}).flatMap((name) => [
    name.common,
    name.official,
  ]);

  return unique([
    country.name.common,
    country.name.official,
    country.cca2,
    country.cca3,
    ...nativeNames,
  ]);
}

function hintList(country: RestCountry) {
  const currencies = Object.values(country.currencies ?? {})
    .map((currency) => currency.name)
    .filter(Boolean)
    .join(", ");
  const languages = Object.values(country.languages ?? {}).join(", ");

  return unique([
    country.region ? `Region: ${country.region}` : undefined,
    country.subregion ? `Subregion: ${country.subregion}` : undefined,
    country.capital?.length ? `Capital: ${country.capital.join(", ")}` : undefined,
    currencies ? `Currency: ${currencies}` : undefined,
    languages ? `Languages: ${languages}` : undefined,
  ]);
}

async function main() {
  const response = await fetch(REST_COUNTRIES_URL);
  if (!response.ok) {
    throw new Error(`REST Countries request failed: ${response.status}`);
  }

  const countries = ((await response.json()) as RestCountry[])
    .filter((country) => country.cca2 && country.name?.common && country.flags?.svg)
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  const flags: Game[] = countries.map((country) => {
    const code = country.cca2.toLowerCase();
    return {
      id: `flag-${code}`,
      slug: slugify(country.name.common),
      title: country.name.common,
      acceptableAnswers: countryAliases(country),
      images: [`https://flagcdn.com/${code}.svg`],
      hints: hintList(country),
      metadata: {
        code: country.cca2,
        region: country.region ?? "",
        capital: country.capital ?? [],
      },
      source: {
        name: "REST Countries + FlagCDN",
        url: country.flags?.svg ?? `https://flagcdn.com/${code}.svg`,
        license: "Flag imagery varies by country; metadata from REST Countries.",
      },
    };
  });

  const countryMaps: Game[] = countries.map((country) => {
    const code = country.cca2.toLowerCase();
    return {
      id: `country-${code}`,
      slug: slugify(country.name.common),
      title: country.name.common,
      acceptableAnswers: countryAliases(country),
      images: [`${MAPSICON_BASE}/${code}/vector.svg`],
      hints: hintList(country),
      metadata: {
        code: country.cca2,
        region: country.region ?? "",
        capital: country.capital ?? [],
      },
      source: {
        name: "REST Countries + Mapsicon",
        url: `${MAPSICON_BASE}/${code}/vector.svg`,
        license: "Country metadata from REST Countries; silhouettes from Mapsicon.",
      },
    };
  });

  writeFileSync(join(process.cwd(), "data", "flags.json"), `${JSON.stringify(flags, null, 2)}\n`);
  writeFileSync(join(process.cwd(), "data", "countries.json"), `${JSON.stringify(countryMaps, null, 2)}\n`);
  console.log(`Wrote ${flags.length} flags and ${countryMaps.length} country maps.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
