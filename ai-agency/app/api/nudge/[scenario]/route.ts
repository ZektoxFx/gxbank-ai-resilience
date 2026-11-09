import Anthropic from '@anthropic-ai/sdk';
import { scenarios, type ScenarioKey } from '@/lib/data';

const SYSTEM = `You are GX.AI inside the GXBank app, helping young Malaysians build financial resilience.
Given the customer's facts, reply with one sentence under 35 words: what you noticed and one concrete action in ringgit (RM).
Plain text only, no preamble.`;

// Each check sends fixed facts, so its answer is a static response regenerated at most once an hour:
// at most one Claude call per scenario per hour, whatever the traffic.
// shortcut: an offline answer produced during regeneration is also kept for the hour; fine for a demo.
export const revalidate = 3600;
export const dynamicParams = false; // unknown scenarios 404 without calling Claude

export function generateStaticParams() {
  return Object.keys(scenarios).map((scenario) => ({ scenario }));
}

export async function GET(_req: Request, { params }: RouteContext<'/api/nudge/[scenario]'>) {
  const s = scenarios[(await params).scenario as ScenarioKey];

  try {
    // Credentials come from ANTHROPIC_API_KEY (or an `ant auth login` profile).
    const msg = await new Anthropic().messages.create({
      model: 'claude-haiku-5-5',
      max_tokens: 1024,
      output_config: { effort: 'low' },
      system: SYSTEM,
      messages: [{ role: 'user', content: s.facts }],
    });
    const block = msg.content.find((b) => b.type === 'text');
    if (msg.stop_reason !== 'refusal' && block?.type === 'text' && block.text.trim()) {
      return Response.json({ text: block.text.trim(), source: 'ai' });
    }
  } catch (err) {
    console.error('GX.AI nudge failed, using offline answer:', err instanceof Error ? err.message : err);
  }
  return Response.json({ text: s.offline, source: 'offline' });
}
