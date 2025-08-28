import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Brand,
  Category,
  Entity,
  Invoice,
  InvoiceItem,
  Person,
  Product,
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
        url: `brands/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["brands"],
    }),
    editBrand: build.mutation<void, Partial<Brand>>({
      query: (data) => ({
        url: `brands/${data?.id}/`,
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
        url: `invoices/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices"],
    }),
    editInvoice: build.mutation<void, Partial<Invoice>>({
      query: (data) => ({
        url: `invoices/${data?.id}/`,
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
        url: `invoiceitems/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["invoices", "invoiceitems"],
    }),
    editInvoiceItem: build.mutation<void, Partial<InvoiceItem>>({
      query: (data) => ({
        url: `invoiceitems/${data?.id}/`,
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
        url: `products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    editProduct: build.mutation<void, Partial<Product>>({
      query: (data) => ({
        url: `products/${data?.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
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
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    editCategory: build.mutation<void, Partial<Category>>({
      query: (data) => ({
        url: `categories/${data?.id}/`,
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
        url: `persons/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["persons"],
    }),
    editPerson: build.mutation<void, Partial<Person>>({
      query: (data) => ({
        url: `persons/${data?.id}/`,
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
        url: `entities/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["entities"],
    }),
    editEntity: build.mutation<void, Partial<Entity>>({
      query: (data) => ({
        url: `entities/${data?.id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["entities"],
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
} = api;
