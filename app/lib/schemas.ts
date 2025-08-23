import z from "zod/v4";

export const personSchema = z.object({
  id: z.number().nullish(),
  firstname: z.string().min(1, { message: "نام را وارد کنید" }),
  lastname: z.string().min(1, "نام خانوادگی را وارد کنید"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, { message: "شماره را به درستی وارد کنید" }),
});
export const categorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.number().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    description: z.string().nullish(),
    image_url: z.string().nullish(),
    parent: z.string().nullish(),
    order: z.string().min(1, { message: "اولویت را وارد کنید" }),
    parent_name: z.string().nullish(),
    children: z.array(categorySchema).optional(),
    created: z.date().nullish(),
    updated: z.date().nullish(),
  }),
);

export const productSchema = z.object({
  id: z.number().nullish(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().nullish(),
  image_url: z.string().nullish(),
  category: z.string().min(1, { message: "نام را وارد کنید" }),
  info: z.string().min(1, { message: "وارد کنید" }),
  count: z.string().min(1, { message: "تعداد را وارد کنید" }),
  price: z.string().min(1, { message: "قیمت را وارد کنید" }),
  created: z.date().nullish(),
  updated: z.date().nullish(),
});
export const userSchema = z.object({
  email: z.string().min(1, "ایمیل را وارد کنید"),
  password: z.string().min(1, "پسورد را وارد کنید"),
});
export const invoiceItemSchema = z.object({
  id: z.number().nullish(),
  product: z.string(),
  count: z.string().min(1, { message: "تعداد را وارد کنید" }),
  price: z.string().min(1, { message: "قیمت را وارد کنید" }),
  invoice: z.string(),
});
export const invoiceSchema = z.object({
  id: z.number().nullish(),
  person: z.string(),
  personname: z.string(),
  description: z.string().min(1, { message: "توضیح را وارد کنید" }),
  total: z.string(),
  invoiceitems: z.array(invoiceItemSchema),
  type: z.string().nullish(),
  created: z.date().nullish(),
  updated: z.date().nullish(),
});
export type Person = z.infer<typeof personSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export interface SignResponse {
  success: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  data?: {
    email?: string;
  };
}
export type ActionResult = {
  success: boolean;
  error: string | null;
  errors: Record<string, string[]> | null;
  data: Record<string, unknown>;
};
