export async function POST(req) {
  const { age, gender, interests, budget } = await req.json();
  
  const prompt = `Suggest 5 specific Christmas gift ideas for a ${age} year old ${gender} who likes ${interests} with a budget of ${budget}. For each gift, provide: name, short description, and estimated price. Format as JSON array with objects having "name", "description", and "price" fields.`;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });

    const data = await response.json();
    let text = data[0]?.generated_text || '';
    
    // Try to extract JSON from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    let gifts = [];
    
    if (jsonMatch) {
      try {
        gifts = JSON.parse(jsonMatch[0]);
      } catch {
        gifts = parseFallback(text, budget);
      }
    } else {
      gifts = parseFallback(text, budget);
    }

    return Response.json({ gifts: gifts.slice(0, 5) });
  } catch (error) {
    return Response.json({ gifts: getFallbackGifts(age, interests, budget) });
  }
}

function parseFallback(text, budget) {
  const lines = text.split('\n').filter(l => l.trim());
  const gifts = [];
  
  for (let line of lines) {
    if (line.match(/^\d+\./)) {
      const name = line.replace(/^\d+\.\s*/, '').split(':')[0].trim();
      if (name) {
        gifts.push({
          name,
          description: 'A great Christmas gift idea',
          price: budget
        });
      }
    }
  }
  
  return gifts.length > 0 ? gifts : getFallbackGifts();
}

function getFallbackGifts(age = 30, interests = 'general', budget = '$50') {
  return [
    { name: 'Cozy Blanket Set', description: 'Soft fleece blanket perfect for winter', price: budget },
    { name: 'Gourmet Coffee Gift Set', description: 'Selection of premium coffee beans', price: budget },
    { name: 'Wireless Earbuds', description: 'Quality audio for music lovers', price: budget },
    { name: 'Scented Candle Collection', description: 'Festive holiday scents', price: budget },
    { name: 'Board Game', description: 'Fun entertainment for gatherings', price: budget }
  ];
}
