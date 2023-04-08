import _ from "lodash";
import { z } from "zod";

export const rentFormValidator = z.object({
  category: z.string().nonempty(`Please select your place's category`),
  location: z.preprocess((input) => {
    if (_.isNil(input)) {
      return "";
    }

    return input;
  }, z.string().nonempty(`Please select your place's location`)),
});
