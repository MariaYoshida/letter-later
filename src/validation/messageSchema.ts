import { z } from "zod";

export const messageSchema = z.object({
  title: z
    .string()
    .min(1, { message: "form.validation.requiredTitle" })
    .max(30, { message: "form.validation.maxTitle" }),
  body: z
    .string()
    .min(1, { message: "form.validation.requiredBody" })
    .max(1000, { message: "form.validation.maxBody" }),
  sendDate: z
    .string()
    .min(1, { message: "form.validation.requiredDate" })
    .refine(
      (val) => {
        if (!val) return false;
        const [y, m, d] = val.split("-").map(Number);
        const selected = new Date(y, m - 1, d);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      },
      { message: "form.validation.futureOnly" }
    ),
});
