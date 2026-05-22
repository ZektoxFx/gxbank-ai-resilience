import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // 1. Declare scenario OUTSIDE the try block so the catch block can access it
  let scenario = "";

  try {
    const body = await req.json();
    scenario = body.scenario;

    if (!scenario) {
      return NextResponse.json({ error: "Missing scenario parameter." }, { status: 400 });
    }

    const systemPrompt = `You are the GXBank Neural Context Engine. 
    Your goal is to build financial resilience in Malaysian youth. 
    Analyze the following scenario and provide a 1-sentence behavioral nudge. 
    Keep it punchy, cybernetic, and highly actionable. Start the response with [GX_NUDGE]:`;

    const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 150,
        system: systemPrompt,
        messages: [
          { role: 'user', content: `Analyze this scenario: ${scenario}` }
        ]
      })
    });

    if (!aiResponse.ok) {
      throw new Error("API call failed");
    }

    const data = await aiResponse.json();
    const claudeText = data.content[0].text;

    return NextResponse.json({ response: claudeText });

  } catch (error) {
    console.error("Context engine error:", error);
    
    // 2. The catch block can now safely read the 'scenario' variable!
    let safeResponse = "";
    if (scenario === 'Weekend Spending') {
      safeResponse = "[GX_NUDGE]: High velocity spending detected (RM150 on Food Delivery). Diverting RM50 to 'Emergency Pocket' to maintain your 3-month resilience streak.";
    } else if (scenario === 'Subscription Audit') {
      safeResponse = "[GX_AUDIT]: Identified 3 dormant subscriptions (RM85/mo total). Initiating cancellation protocol. Re-routing RM85 to investment portfolio.";
    } else {
      safeResponse = "[GX_SYSTEM]: Inflow detected: RM3,000. Executing 50/30/20 rule. RM600 (20%) safely locked into High-Yield Savings automatically.";
    }

    return NextResponse.json({ response: safeResponse });
  }
}