import { NextResponse } from "next/server";
import { scoreProduct } from "@/lib/recommend";

export async function POST(req: Request) {
  const { age, gender, budget } = await req.json();

  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const ranked = products
    .map((p: any) => ({
      ...p,
      score: scoreProduct(p, age, gender, budget)
    }))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 5);

  return NextResponse.json(ranked);
}
