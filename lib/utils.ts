import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(number: number) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  }).format(number);
}
