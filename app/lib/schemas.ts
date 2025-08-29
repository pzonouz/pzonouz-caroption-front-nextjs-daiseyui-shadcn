import z from "zod/v4";

export const personSchema = z.object({
  id: z.string().nullish(),
  firstname: z.string().min(1, { message: "نام را وارد کنید" }),
  lastname: z.string().min(1, "نام خانوادگی را وارد کنید"),
  phone: z
    .string()
    .regex(/^09\d{9}$/, { message: "شماره را به درستی وارد کنید" }),
});
export const categorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    description: z.string().nullish(),
    image_url: z.string().nullish(),
    parent: z.string().nullish(),
    order: z.string().min(1, { message: "اولویت را وارد کنید" }),
    parent_name: z.string().nullish(),
    children: z.array(categorySchema).optional(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
  }),
);
export const userSchema = z.object({
  email: z.string().min(1, "ایمیل را وارد کنید"),
  password: z.string().min(1, "پسورد را وارد کنید"),
});
export const productSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    description: z.string().nullish(),
    image_url: z.string().nullish(),
    category: z.string().nullish(),
    brand: z.string().nullish(),
    info: z.string().min(1, { message: "وارد کنید" }),
    count: z.string().min(1, { message: "تعداد را وارد کنید" }),
    price: z.string().min(1, { message: "قیمت را وارد کنید" }),
    price2: z.string().optional(),
    price3: z.string().optional(),
    generatable: z.boolean(),
    generated: z.boolean().optional(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
    main_product: productSchema.nullish(),
  }),
);

export const invoiceItemSchema = z.object({
  id: z.string().nullish(),
  product: z.string(),
  count: z.string().min(1, { message: "تعداد را وارد کنید" }),
  price: z.string().min(1, { message: "قیمت را وارد کنید" }),
  invoice: z.string(),
});
export const invoiceSchema = z.object({
  id: z.string().nullish(),
  person: z.string(),
  personname: z.string(),
  description: z.string().min(1, { message: "توضیح را وارد کنید" }),
  total: z.string(),
  invoiceitems: z.array(invoiceItemSchema),
  type: z.string().nullish(),
  created: z.string().datetime().nullish(),
  updated: z.string().datetime().nullish(),
});
export const brandSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().nullish(),
  image_url: z.string().nullish(),
  created: z.string().datetime().nullish(),
  updated: z.string().datetime().nullish(),
});
export const entitySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    english_name: z.string().nullish(),
    description: z.string().nullish(),
    image_url: z.string().nullish(),
    parent: z.string().nullish(),
    parent_name: z.string().nullish(),
    order: z.string().min(1, { message: "اولویت را وارد کنید" }),
    children: z.array(entitySchema).optional(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
  }),
);
export type Person = z.infer<typeof personSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Entity = z.infer<typeof entitySchema>;
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
