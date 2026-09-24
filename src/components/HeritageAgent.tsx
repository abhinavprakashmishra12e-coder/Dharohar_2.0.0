import { useState } from 'react';
import { Bot, Mic, SendHorizonal, Sparkles, ThumbsDown, ThumbsUp, Volume2 } from 'lucide-react';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import { INDIAN_STATES } from '../data/indiaHeritageData';

const quickPrompts = [
  'Which heritage trail fits a weekend in Rajasthan?',
  'What UNESCO sites should I prioritize in India?',
  'Tell me about temple architecture in South India'
];

function formatHeritageReply(question: string): string {
  const q = question.toLowerCase();

  const stateMatch = INDIAN_STATES.find((state) =>
    q.includes(state.name.toLowerCase()) ||
    q.includes(state.capital.toLowerCase()) ||
    q.includes(state.culturalSummary.toLowerCase().slice(0, 30))
  );
  if (stateMatch) {
    return `${stateMatch.name} is ideal for a cultural immersion: ${stateMatch.culturalSummary.split('. ')[0]}. For a first visit, pair ${stateMatch.capital} with nearby heritage landmarks and craft traditions to see the living history behind the region.`;
  }

  const landmarkMatch = HERITAGE_LANDMARKS.find((landmark) =>
    q.includes(landmark.name.toLowerCase()) ||
    q.includes(landmark.stateName.toLowerCase()) ||
    q.includes(landmark.hindiName.toLowerCase())
  );
  if (landmarkMatch) {
    return `${landmarkMatch.name} stands out because ${landmarkMatch.description.split('. ')[0]}. The best way to experience it is to explore the surrounding neighborhood, local cuisine, and the associated craft or festival traditions linked to the site.`;
  }

  if (q.includes('unesco') || q.includes('world heritage')) {
    return 'Start with the Golden Triangle of Delhi, Agra, and Jaipur for a compact UNESCO journey, then add a temple circuit like Khajuraho or Konark for deeper architectural context. UNESCO heritage sites in India are strongest when seen alongside local rituals and food traditions.';
  }

  if (q.includes('temple') || q.includes('architecture')) {
    return 'Temple architecture in India varies beautifully by region: Nagara forms in the north, Dravidian towers in the south, and hybrid styles in the east and west. Look for carved narratives, sacred geometry, and the way the temple is woven into urban routines and festival calendars.';
  }

  if (q.includes('festival') || q.includes('cuisine') || q.includes('food')) {
    return 'Heritage experiences feel richest when you combine monuments with rituals, street food, and craft markets. Try a morning heritage walk, a local festival afternoon, and an evening meal centered on regional specialties for a fuller cultural story.';
  }

  if (q.includes('weekend') || q.includes('short trip') || q.includes('travel')) {
    return 'For a compact heritage trip, choose a two-city route: one imperial city like Jaipur or Delhi, and one sacred or artistic destination such as Varanasi, Hampi, or Mysore. That mix balances architecture, custom, and everyday living heritage.';
  }

  return 'A strong heritage plan usually starts with one landmark, one local craft cluster, and one food trail. That balance gives you architecture, identity, and living culture rather than a checklist of monuments alone.';
}

export function HeritageAgent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'assistant-0',
      sender: 'assistant',
      text: 'What heritage trail should I explore next in India?'
    },
    {
      id: 'assistant-1',
      sender: 'assistant',
      text: 'Start with Jaipur for the Pink City route, then add a crafted stop in Varanasi or a temple circuit in the south. Each route pairs monuments with local rituals, food, and crafts for a richer story.'
    }
  ] as Array<{ id: string; sender: 'assistant' | 'user'; text: string }>);

  const submitQuestion = (value?: string) => {
    const question = (value ?? input).trim();
    if (!question) {
      return;
    }

    const userMessage = { id: `user-${Date.now()}`, sender: 'user' as const, text: question };
    const assistantMessage = { id: `assistant-${Date.now()}-reply`, sender: 'assistant' as const, text: formatHeritageReply(question) };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className="heritage-agent" aria-label="Ask AI cultural heritage assistant">
      <div className="heritage-agent-shell">
        <div className="heritage-agent-header">
          <div className="heritage-agent-title">
            <span className="heritage-agent-badge"><Sparkles size={15} /></span>
            <span>Ask AI</span>
          </div>
          <button className="heritage-agent-icon" aria-label="Voice input">
            <Volume2 size={16} />
          </button>
        </div>

        <div className="heritage-agent-thread">
          <div className="heritage-message heritage-message-assistant">
            <span className="message-avatar"><Bot size={14} /></span>
            <div className="message-bubble message-bubble-assistant">What heritage trail should I explore next in India?</div>
          </div>

          <div className="heritage-message heritage-message-user">
            <div className="message-bubble message-bubble-user">Start with Jaipur’s Pink City route, then add a crafted stop in Varanasi or a temple circuit in South India.</div>
          </div>

          {messages.slice(2).map((message) => (
            <div key={message.id} className={`heritage-message heritage-message-${message.sender}`}>
              {message.sender === 'assistant' && (
                <span className="message-avatar"><Bot size={14} /></span>
              )}
              <div className={`message-bubble message-bubble-${message.sender}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="prompt-actions">
          {quickPrompts.map((prompt) => (
            <button key={prompt} type="button" className="prompt-chip" onClick={() => submitQuestion(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        <div className="heritage-agent-actions">
          <button type="button" aria-label="Thumbs up" className="mini-action"><ThumbsUp size={15} /></button>
          <button type="button" aria-label="Thumbs down" className="mini-action"><ThumbsDown size={15} /></button>
          <button type="button" aria-label="Voice input" className="mini-action"><Mic size={15} /></button>
        </div>

        <div className="heritage-agent-input-row">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                submitQuestion();
              }
            }}
            placeholder="Ask anything..."
            aria-label="Ask the heritage AI assistant"
          />
          <button type="button" className="send-button" onClick={() => submitQuestion()} aria-label="Send question">
            <SendHorizonal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
