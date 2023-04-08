"use client";

import { useCountries } from "@/app/utils/hooks/useCountries";
import { FC, useMemo } from "react";
import { useWatch } from "react-hook-form";
import Heading from "../../../common/Heading";
import CountrySelect from "../components/CountrySelect";
import { useRentContext } from "../controller";
import dynamic from "next/dynamic";

interface LocationStepProps {}

const LocationStep: FC<LocationStepProps> = ({}) => {
  const { formController } = useRentContext();
  const { findCountryByCca } = useCountries();

  const location = useWatch({
    control: formController.control,
    name: "location",
  });
  const country = !location ? null : findCountryByCca(location);

  const LocationMap = useMemo(
    () =>
      dynamic(() => import("@/app/components/common/LocationMap"), {
        ssr: false,
        loading() {
          return <div className="w-full h-[35vh] rounded-lg"></div>;
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />

      <CountrySelect
        onChange={(val) =>
          formController.setValue("location", val?.value ?? null)
        }
        value={country}
      />
      <LocationMap center={country?.latlng} />
    </div>
  );
};

export default LocationStep;
