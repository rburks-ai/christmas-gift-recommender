"use client";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<any[]>([]);

  async function submit(formData: FormData) {
    const res = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({
        age: Number(formData.get("age")),
        gender: formData.get("gender"),
        budget: Number(formData.get("budget"))
      })
    });
    setResults(await res.json());
  }

  return (
    <div className="max-w-xl w-full p-6 bg-slate-800 rounded-xl">
      <h1 className="text-2xl font-bold mb-4">🎁 Christmas Gift Recommender</h1>

      <form action={submit} className="space-y-3">
        <input name="age" placeholder="Age" className="w-full p-2 text-black" />
        <select name="gender" className="w-full p-2 text-black">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          name="budget"
          placeholder="Budget ($)"
          className="w-full p-2 text-black"
        />
        <button className="w-full bg-red-600 p-2 rounded">
          Get Recommendations
        </button>
      </form>

      <div className="mt-4 space-y-3">
        {results.map((r) => (
          <div key={r.id} className="border p-3 rounded">
            <p className="font-semibold">{r.title}</p>
            <p>${r.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
