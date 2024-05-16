import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email address",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters",
  }),
});


export const RegisterSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters",
  }),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters",
  }),
  email: z.string().email({
    message: "Please enter valid email address",
  }),
  aadhar_number:z.preprocess(
    (a) => parseInt(z.string().parse(a), 12),
    z.number().gte(0, "Must be 1 and above")
  ),
  pan: z.string().min(8, {
    message: "Pan number must be at least 8 characters",
  }),
  dob: z.string().min(6, {
    message: "Must be 6 or above"
  }),
  password: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters",
    })
    .optional(),
});

export const PortfolioSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email address",
  }),
  stock_name: z.string().min(1, {
    message: "Stock Name is require and must of 3 characters",
  }),
  buy_price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Must be 1 and above")
  ),
  buy_quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Must be 1 and above")
  ),
  sell_price: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Must be 1 and above")
  ),
  sell_quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Must be 1 and above")
  ),
  profit: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().default(0)
  ),
  loss: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().default(0)
  ),
});

export const WalletSchema = z.object({
  invested_amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Must be 1 and above")
  ),
  transaction_type:z.string().min(1, {
    message: "Stock Name is require and must of 3 characters",
  }),
  email: z.string().email({
    message: "Please enter valid email address",
  }),
});

export const WithdrawalSchema = z.object({
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(0, "Must be 1 and above")
  ),
  accountHolderName: z.string().min(1, {
    message: "Account holder name must be at least 1 character",
  }),
  accountNumber: z.string().min(3, {
    message: "Password must be at least 3 characters",
  }),
  ifscCode: z.string().min(4, {
    message: "ifscCode must be at least 4 characters",
  }),
});

export const QRImageSchema = z.object({
  image_link: z.string().url({
    message: "Please enter valid image link",
  }),
});

