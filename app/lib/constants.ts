export const INVOICE_TYPES = {
  SALE: "S",
  PURCHASE: "P",
} as const;

export const INVOICE_TYPE_LABELS = {
  [INVOICE_TYPES.SALE]: "فروش",
  [INVOICE_TYPES.PURCHASE]: "خرید",
} as const;

export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  INPUT: 500,
  API_CALL: 1000,
} as const;

export const TABLE_COLUMNS = {
  INVOICE_ITEMS: {
    PRODUCT: "product",
    COUNT: "count",
    PRICE: "price",
    TOTAL: "total",
    ACTIONS: "actions",
  },
} as const;

export const MODAL_SIZES = {
  SMALL: "sm",
  MEDIUM: "md",
  LARGE: "lg",
  EXTRA_LARGE: "xl",
  DOUBLE_EXTRA_LARGE: "2xl",
} as const;
