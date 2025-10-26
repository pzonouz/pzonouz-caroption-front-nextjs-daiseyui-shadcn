import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Article,
  Brand,
  Category,
  Entity,
  Image,
  Invoice,
  InvoiceItem,
  Parameter,
  ParameterGroup,
  Person,
  Product,
  ProductParameterValue,
} from "../schemas";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/backend",
    prepareHeaders(headers, { getState }) {
      // @ts-ignore
      const access = getState()?.access?.access;
      if (access) {
        headers.set("Authorization", `JWT ${access}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "invoices",
    "invoiceitems",
    "products",
    "persons",
    "categories",
    "brands",
    "entities",
    "parameterGroups",
    "parameters",
    "productParametersValue",
    "images",
    "articles",
  ],
  endpoints: (build) => ({
    getBrands: build.query<Brand[], void>({
      query: () => `brands/`,
      providesTags: ["brands"],
    }),
    createBrand: build.mutation<Brand, Brand>({
      query: (data) => ({
        url: "brands/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["brands"],
    }),
    deleteBrand: build.mutation<void, any>({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands"],
    }),
    editBrand: build.mutation<void, Partial<Brand>>({
      query: (data) => ({
        url: `brands/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["brands"],
    }),
    getInvoices: build.query<Invoice[], void>({
      query: () => `invoices/`,
      providesTags: ["invoices"],
    }),
    getInvoice: build.query<Invoice, Partial<Invoice> & Pick<Invoice, "id">>({
      query: (id) => `invoices/${id}/`,
    }),
    createInvoice: build.mutation<Invoice, Invoice>({
      query: (data) => ({
        url: "invoices/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["invoices"],
    }),
    deleteInvoice: build.mutation<void, any>({
      query: (id) => ({
        url: `invoices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),
    editInvoice: build.mutation<void, Partial<Invoice>>({
      query: (data) => ({
        url: `invoices/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["invoices"],
    }),
    createInvoiceItem: build.mutation<InvoiceItem, InvoiceItem>({
      query: (data) => ({ url: `invoiceitems/`, method: "POST", body: data }),
      invalidatesTags: ["invoices", "invoiceitems"],
    }),
    deleteInvoiceItem: build.mutation<
      void,
      Partial<InvoiceItem> & Pick<InvoiceItem, "id">
    >({
      query: (id) => ({
        url: `invoiceitems/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices", "invoiceitems"],
    }),
    editInvoiceItem: build.mutation<void, Partial<InvoiceItem>>({
      query: (data) => ({
        url: `invoiceitems/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["invoiceitems", "invoices"],
    }),
    getProducts: build.query<Product[], void>({
      query: () => `products/`,
      providesTags: ["products"],
    }),
    createProduct: build.mutation<Product, Product>({
      query: (data) => ({
        url: "products/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: build.mutation<void, any>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    editProduct: build.mutation<void, Partial<Product>>({
      query: (data) => ({
        url: `products/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    getArticles: build.query<Article[], void>({
      query: () => `articles/`,
      providesTags: ["articles"],
    }),
    createArticle: build.mutation<Article, Article>({
      query: (data) => ({
        url: "articles/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["articles"],
    }),
    deleteArticle: build.mutation<void, any>({
      query: (id) => ({
        url: `articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["articles"],
    }),
    editArticle: build.mutation<void, Partial<Article>>({
      query: (data) => ({
        url: `articles/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["articles"],
    }),
    getParentCategories: build.query<Category[], void>({
      query: () => `parent_categories`,
      providesTags: ["categories"],
    }),
    getCategories: build.query<Category[], void>({
      query: () => `categories/`,
      providesTags: ["categories"],
    }),
    createCategory: build.mutation<Category, Category>({
      query: (data) => ({
        url: "categories/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: build.mutation<void, any>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    editCategory: build.mutation<void, Partial<Category>>({
      query: (data) => ({
        url: `categories/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    getPersons: build.query<Person[], void>({
      query: () => `persons/`,
      providesTags: ["persons"],
    }),
    createPerson: build.mutation<Person, Person>({
      query: (data) => ({
        url: "persons/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["persons"],
    }),
    deletePerson: build.mutation<void, any>({
      query: (id) => ({
        url: `persons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["persons"],
    }),
    editPerson: build.mutation<void, Partial<Person>>({
      query: (data) => ({
        url: `persons/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["persons"],
    }),
    getParentEntities: build.query<Entity[], void>({
      query: () => `parent_entities`,
      providesTags: ["entities"],
    }),
    getEntities: build.query<Entity[], void>({
      query: () => `entities/`,
      providesTags: ["entities"],
    }),
    createEntity: build.mutation<Entity, Entity>({
      query: (data) => ({
        url: "entities/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["entities"],
    }),
    deleteEntity: build.mutation<void, any>({
      query: (id) => ({
        url: `entities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["entities"],
    }),
    editEntity: build.mutation<void, Partial<Entity>>({
      query: (data) => ({
        url: `entities/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["entities"],
    }),
    getParameterGroups: build.query<ParameterGroup[], void>({
      query: () => `parameter-groups`,
      providesTags: ["parameterGroups"],
    }),
    createParameterGroup: build.mutation<ParameterGroup, ParameterGroup>({
      query: (data) => ({
        url: "parameter-groups",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["parameterGroups"],
    }),
    deleteParameterGroup: build.mutation<void, any>({
      query: (id) => ({
        url: `parameter-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["parameterGroups"],
    }),
    editParameterGroup: build.mutation<void, Partial<ParameterGroup>>({
      query: (data) => ({
        url: `parameter-groups/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["parameterGroups"],
    }),
    getParametersByCategory: build.query<Parameter[], string>({
      query: (id) => `parameters/by-group/${id}`,
      providesTags: ["parameters"],
    }),
    getParameters: build.query<Parameter[], void>({
      query: () => `parameters`,
      providesTags: ["parameters"],
    }),
    createParameter: build.mutation<Parameter, Parameter>({
      query: (data) => ({
        url: "parameters",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["parameters"],
    }),
    deleteParameter: build.mutation<void, any>({
      query: (id) => ({
        url: `parameters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["parameters"],
    }),
    editParameter: build.mutation<void, Partial<Parameter>>({
      query: (data) => ({
        url: `parameters/${data?.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["parameters"],
    }),
    getProductParameterValues: build.query<ProductParameterValue[], void>({
      query: () => `product-parameter-values/`,
      providesTags: ["productParametersValue"],
    }),
    getProductParameterValuesByProduct: build.query<
      ProductParameterValue[],
      string
    >({
      query: (id) => `product-parameter-values/product/${id}`,
      providesTags: ["productParametersValue"],
    }),
    createProductParameterValue: build.mutation<
      ProductParameterValue,
      ProductParameterValue
    >({
      query: (data) => ({
        url: "product-parameter-values/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productParametersValue", "products", "parameters"],
    }),
    deleteProductParameterValue: build.mutation<void, any>({
      query: (id) => ({
        url: `product-parameter-values/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productParametersValue", "products", "parameters"],
    }),
    editProductParameterValue: build.mutation<
      void,
      Partial<ProductParameterValue>
    >({
      query: (data) => ({
        url: `product-parameter-values/${data?.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["productParametersValue", "products", "parameters"],
    }),
    getImages: build.query<Image[], void>({
      query: () => `images/`,
      providesTags: ["images"],
    }),
    createImage: build.mutation<Image, Image>({
      query: (data) => ({
        url: "images",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["images"],
    }),
    deleteImage: build.mutation<void, any>({
      query: (id) => ({
        url: `images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["images", "products"],
    }),
    editImage: build.mutation<void, Partial<Image>>({
      query: (data) => ({
        url: `images/${data?.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["images"],
    }),
  }),
});

export const {
  useGetPersonsQuery,
  useCreatePersonMutation,
  useDeletePersonMutation,
  useEditPersonMutation,
  useGetCategoriesQuery,
  useGetParentCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useEditInvoiceMutation,
  useCreateInvoiceItemMutation,
  useDeleteInvoiceItemMutation,
  useEditInvoiceItemMutation,
  useGetBrandsQuery,
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useEditBrandMutation,
  useGetParentEntitiesQuery,
  useGetEntitiesQuery,
  useCreateEntityMutation,
  useDeleteEntityMutation,
  useEditEntityMutation,
  useGetParameterGroupsQuery,
  useCreateParameterGroupMutation,
  useDeleteParameterGroupMutation,
  useEditParameterGroupMutation,
  useGetParametersByCategoryQuery,
  useGetParametersQuery,
  useCreateParameterMutation,
  useDeleteParameterMutation,
  useEditParameterMutation,
  useGetProductParameterValuesQuery,
  useGetProductParameterValuesByProductQuery,
  useCreateProductParameterValueMutation,
  useDeleteProductParameterValueMutation,
  useEditProductParameterValueMutation,
  useGetImagesQuery,
  useCreateImageMutation,
  useDeleteImageMutation,
  useEditImageMutation,
  useGetArticlesQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
} = api;
