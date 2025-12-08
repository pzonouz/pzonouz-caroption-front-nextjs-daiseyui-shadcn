import z, { nullish } from "zod/v4";

export const personSchema = z.object({
  id: z.string().nullish(),
  firstName: z.string().min(1, { message: "نام را وارد کنید" }),
  lastName: z.string().min(1, "نام خانوادگی را وارد کنید"),
  address: z.string().optional().nullable().nullish(),
  phoneNumber: z
    .string()
    .regex(/^09\d{9}$/, { message: "شماره را به درستی وارد کنید" }),
});
export const categorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    description: z.string().nullish(),
    parentId: z.string().nullish(),
    priority: z.string().min(1, { message: "اولویت را وارد کنید" }).nullish(),
    parentName: z.string().nullish(),
    imageId: z.string().optional().nullish(),
    imageUrl: z.string().optional().nullish(),
    slug: z.string().min(1, { message: "نام مسیر را وارد کنید" }),
    show: z.boolean().optional().nullish().nullable(),
    children: z.array(categorySchema).optional(),
    parameter_groups: z.array(parameterGroupSchema).optional(),
    generator: z.boolean().optional().nullish().nullable(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
  })
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
    categoryId: z.string().nullish(),
    brandId: z.string().nullish(),
    brandName: z.string().nullish(),
    imageId: z.string().nullish(),
    slug: z.string().min(1, { message: "نام مسیر را وارد کنید" }),
    imageIds: z
      .array(z.string())
      .optional()
      .nullable()
      .transform((val) => val ?? []),
    images: z.array(imageSchema).optional().nullish().nullable(),
    info: z.string().min(1, { message: "وارد کنید" }),
    count: z.string().min(1, { message: "تعداد را وارد کنید" }),
    price: z.string().min(1, { message: "قیمت را وارد کنید" }),
    price2: z.string().optional(),
    price3: z.string().optional(),
    generatable: z.boolean().optional().nullable().nullish(),
    generated: z.boolean().optional().nullish().nullable(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
    main_product: productSchema.nullish(),
    parameters: z.array(parameterSchema).nullish().optional().nullable(),
    productParameterValues: z.array(productParameterValueSchema).optional(),
    keywords: z.array(z.string()).optional().nullish(),
    show: z.boolean().optional().nullish().nullable(),
    position: z.string().optional().nullish(),
    code: z.string().optional().nullish(),
  })
);
export const articleSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    description: z.string().nullish(),
    categoryId: z.string().nullish(),
    imageId: z.string().nullish(),
    slug: z.string().min(1, { message: "نام مسیر را وارد کنید" }),
    showInProducts: z.boolean().optional().nullish().nullable(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
    keywords: z.array(z.string()).optional().nullish(),
  })
);

export const invoiceItemSchema = z.object({
  productId: z.string(),
  price: z.number(),
  count: z.number(),
  discount: z.number().nullable().nullish().optional(),
  total: z.number().nullable().nullish().optional(),
  netTotal: z.number().nullable().nullish().optional(),
  description: z.string().optional(),
});

export const invoiceSchema = z.object({
  id: z.string().nullish(),
  personName: z.string().nullable().nullish().optional(),
  personId: z.string().nullable().nullish().optional(),
  number: z.number().nullable().nullish().optional(),
  type: z.string().nullish(),
  total: z.number().nullable().nullish().optional(),
  netTotal: z.number().nullable().nullish().optional(),
  notes: z.string().nullable().nullish().optional(),
  invoiceNumber: z.string().nullable().nullish().optional(),
  items: z
    .array(invoiceItemSchema)
    .min(1, { message: "حداقل یک کالا باید انتخاب شود" }),
  created: z.string().datetime().nullish(),
  updated: z.string().datetime().nullish(),
});
export const brandSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  description: z.string().nullish(),
  created: z.string().datetime().nullish(),
  updated: z.string().datetime().nullish(),
});
export const entitySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string().nullish(),
    name: z.string().min(1, { message: "نام را وارد کنید" }),
    english_name: z.string().nullish(),
    description: z.string().nullish(),
    parentId: z.string().nullish(),
    imageId: z.string().nullish(),
    entitySlug: z.string().optional(),
    show: z.boolean().optional(),
    parentName: z.string().nullish(),
    children: z.array(entitySchema).optional().nullable().nullish(),
    keywords: z.array(z.string()).optional().nullish(),
    created: z.string().datetime().nullish(),
    updated: z.string().datetime().nullish(),
  })
);
export const parameterSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  type: z.string(),
  parameterGroupId: z.string(),
  parameterGroup: z.string(),
  selectables: z.array(z.string()).optional().nullable().nullish(),
  priority: z.string().optional().nullable().nullish(),
});
export const parameterGroupSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  categoryId: z.string(),
  categoryName: z.string().optional().nullish(),
  parameters: z.array(parameterSchema).optional(),
});
export const productParameterValueSchema = z.object({
  id: z.string().nullish(),
  productId: z.string().nullish().optional(),
  parameterId: z.string().nullish().optional(),
  textValue: z.string().nullable().optional(),
  boolValue: z.boolean().nullable().optional(),
  selectableValue: z.string().nullable().optional(),
});
export const imageSchema = z.object({
  id: z.string().nullish(),
  name: z.string().nullish().optional(),
  imageUrl: z.string().optional().nullish(),
  created: z.string().datetime().nullish(),
  updated: z.string().datetime().nullish(),
});
export type Person = z.infer<typeof personSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Product = z.infer<typeof productSchema>;
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
export type Brand = z.infer<typeof brandSchema>;
export type Entity = z.infer<typeof entitySchema>;
export type Parameter = z.infer<typeof parameterSchema>;
export type ParameterGroup = z.infer<typeof parameterGroupSchema>;
export type ProductParameterValue = z.infer<typeof productParameterValueSchema>;
export type Image = z.infer<typeof imageSchema>;
export type Article = z.infer<typeof articleSchema>;
export interface SignResponse {
  success: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  data?: {
    email?: string;
  };
}
export interface ChangePasswordResponse {
  success: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  data?: {
    password?: string;
    confirmPassword?: string;
  };
}
export interface PasswordChangeRequestResponse {
  success: boolean;
  error?: string;
  errors?: Record<string, string[]>;
  data?: {
    email: string;
  };
}
export type ActionResult = {
  success: boolean;
  error: string | null;
  errors: Record<string, string[]> | null;
  data: Record<string, unknown>;
};
