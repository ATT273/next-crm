"use server";
import {
  CreateProductType,
  IProductSku,
  ProductType,
} from "@/types/product.type";
import { getLocalUser } from "@/utils/session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "${API_URL}";
export const getServerSession = async () => {
  const cookieStore = cookies();
  const session = await cookieStore.get("session");
  if (!session) return null;
  return session;
};

export const getProducts = async () => {
  const session = await getServerSession();
  const user = JSON.parse(session!.value);
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const jsonRes = await res.json();
    if (jsonRes.status === 400) {
      throw Error(
        JSON.stringify({
          message: jsonRes.message,
          ok: false,
          status: 400,
          url: null,
        })
      );
    }
    if (jsonRes.status === 200) {
      return jsonRes;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const createProduct = async (data: CreateProductType) => {
  const session = await getServerSession();
  const user = JSON.parse(session!.value);

  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    // if (jsonRes.status === 400) {
    //   throw Error(JSON.stringify({ message: jsonRes.message, ok: false, status: 400, url: null }))
    // }
    if (jsonRes.status === 200) {
      revalidatePath("/(app)/product", "page");
    }
    return jsonRes;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const updateProduct = async (data: ProductType) => {
  const session = await getServerSession();
  const user = JSON.parse(session!.value);
  try {
    const res = await fetch(`${API_URL}/products/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    if (jsonRes.status === 200) {
      revalidatePath("/(app)/product", "page");
    }
    return jsonRes;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const deleteProduct = async (id: string) => {
  const session = await getServerSession();
  const user = JSON.parse(session!.value);
  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    const jsonRes = await res.json();
    if (jsonRes.status === 200) {
      revalidatePath("/(app)/product", "page");
    }
    return jsonRes;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const createProductSku = async (id: string, data: IProductSku[]) => {
  const session = await getServerSession();
  const user = JSON.parse(session!.value);

  try {
    const res = await fetch(`${API_URL}/products/${id}/product-sku`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const jsonRes = await res.json();
    // if (jsonRes.status === 400) {
    //   throw Error(JSON.stringify({ message: jsonRes.message, ok: false, status: 400, url: null }))
    // }
    if (jsonRes.status === 200) {
      revalidatePath("/(app)/product", "page");
    }
    return jsonRes;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
