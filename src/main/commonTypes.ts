export type ForAxiosDefs =
    | "get"
    | "GET"
    | "delete"
    | "DELETE"
    | "head"
    | "HEAD"
    | "options"
    | "OPTIONS"
    | "post"
    | "POST"
    | "put"
    | "PUT"
    | "patch"
    | "PATCH"
    | "link"
    | "LINK"
    | "unlink"
    | "UNLINK"
    | undefined;

export type Status = "rest" | "loading" | "failure" | "success";

export interface Data {
    data: ReadonlyArray<Product>;
    error: string | null;
}
export interface Product {
    id: string;
    displayId: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string | null;
    updatedBy: string | null;
    name: string;
    displayName: string;
    description: string;
    provider: string;
    type: string;
    metadata: Metadata;
    version: string;
    isPublic: boolean;
    isValid: boolean;
    isRestricted: boolean;
    isAccessGranted: boolean;
    isCreditPurchased: boolean;
    tags: ReadonlyArray<string>;
    isPublicVersion: boolean;
    mainfestVersion: number;
}

export interface Metadata {
    blockThumbnailUrl: string;
    pricingStrategy: {
        type: string;
        credits: number;
    };
    blockPricingStrategy: {
        name: string;
        unit: string;
        direction: string;
        credits: number;
    };
}
