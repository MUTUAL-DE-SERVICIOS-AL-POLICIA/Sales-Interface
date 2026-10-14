export interface ResponseData {
  error: boolean;
  message: string;
  [key: string]: any;
}
export interface User {
  name: string;
  username: string;
  email?: string;
  groups: readonly string[];
  clientRoles: readonly string[];
}
export interface ResourcePermission {
  readonly resource: string;
  readonly scopes: readonly string[];
}
export interface UserContext {
  readonly authenticated: true;
  readonly currentTool: string;
  readonly currentClient: string;
  readonly identity: {
    readonly sub: string;
    readonly preferredUsername?: string;
    readonly name?: string;
    readonly givenName?: string;
    readonly familyName?: string;
    readonly email?: string;
  };
  readonly realmRoles: readonly string[];
  readonly clientRoles: readonly string[];
  readonly groups: readonly string[];
  readonly permissions: readonly ResourcePermission[];
  readonly contextExpiresAt: number;
  readonly permissionsExpiresAt: number;
  readonly sessionExpiresAt: number;
  readonly sessionAbsoluteExpiresAt: number;
}

export interface Person {
  id: string;
  uuidColumn?: string;
  fullName: string;
  identityCard: string;
  nup: string | undefined;
  isPolice: boolean;
}

export interface Parameters {
  id: string;
  maxProducts: number;
  maxAmountProduct: number;
  currencySymbol: string;
}

export interface PaymentType {
  id: string;
  name: string;
  description: string;
  shortened: string;
}

export interface FinancialEntities {
  id: string;
  name: string;
  code?: string;
  isActive?: boolean;
}

export interface Products {
  id: number;
  name: string;
  code?: string;
  price: number | string;
}

export interface SaleProduct {
  id?: number;
  productId: number;
  name: string;
  price: number | string;
  amount: number;
  total?: number;
  saleId?: number;
  fileNumber?: FileNumber;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface FileNumber {
  id: number;
  sale_id: number;
  product_id: number;
  fileNumber: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Voucher {
  id?: number;
  saleId?: number;
  total?: number;
  identityCardCustomer?: string;
  paymentLocation?: string;
  receiptNumber?: string;
  description?: string;
  paymentType?: PaymentTypes;
  customer?: string;
  depositDate?: string;
}

export interface PaymentTypes {
  id: string;
  name: string;
  description?: string;
  shortened?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface Groups {
  id: string;
  name: string;
  description: string;
}

export interface Sale {
  id: number;
  code: string;
  saleState: string;
  personId?: number;
  receptionist?: string;
  saleProducts: SaleProduct[];
  voucher: Voucher;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface QrPaymentSale {
  id: number;
  personId?: number;
  qrId?: string;
  qrImagen?: string;
  qrState?: string;
  expirationDate?: string;
  createdAt?: string;
  updatedAt?: string;
  dataResponse?: any;
}
