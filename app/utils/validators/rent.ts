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
  imageSrc: z.string().nonempty(`Please select your place's image`),
  title: z
    .string()
    .nonempty(`Please enter your place's title`)
    .max(100, "Title can not more than 100 characters"),
  description: z
    .string()
    .nonempty(`Please enter your place's description`)
    .max(100, "Title can not more than 5000 characters"),
  price: z.preprocess(
    (input) => Number(input),
    z
      .number()
      .min(0, "Price can not be less than 0")
      .max(999999, "Price can not be more than $999999")
  ),
});
