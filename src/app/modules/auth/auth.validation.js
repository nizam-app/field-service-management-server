import { z } from "zod";

const login = z.object({
    phone: z.string({ message: "Phone is required" })
});

export const AuthValidator = {
  login
};