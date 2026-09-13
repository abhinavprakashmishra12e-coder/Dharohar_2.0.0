import { useMemo, useState } from 'react';

export function HeritageTrail() {
  const [trailEntries, setTrailEntries] = useState<Array<{ name: string; idea: string; location: string }>>([
    { name: 'Aarav', idea: 'Heritage is a living conversation. Every monument should invite every generation to ask, reflect, and belong.', location: 'Jaipur' },
    { name: 'Meher', idea: 'Our traditions can inspire action today: preserving memory, protecting places, and building empathy across communities.', location: 'Amritsar' },
    { name: 'Nisha', idea: 'The strongest way to honor heritage is to let people contribute their own visions and values to the story.', location: 'Varanasi' }
  ]);
  const [trailForm, setTrailForm] = useState({ name: '', location: '', idea: '' });

  const hasTrailDraft = useMemo(
    () => trailForm.name.trim() || trailForm.location.trim() || trailForm.idea.trim(),
    [trailForm]
  );

  const submitTrailIdea = () => {
    if (!trailForm.name.trim() || !trailForm.location.trim() || !trailForm.idea.trim()) return;

    setTrailEntries(prev => [
      { name: trailForm.name.trim(), idea: trailForm.idea.trim(), location: trailForm.location.trim() },
      ...prev
    ]);

    setTrailForm({ name: '', location: '', idea: '' });
  };

  return (
    <section className="heritage-trail">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A SHARED JOURNEY</span>
          <h2>Heritage Trail</h2>
        </div>
      </div>
      <div className="trail-layout">
        <div className="trail-form">
          <h3>Share your ideology</h3>
          <div className="trail-field">
            <label htmlFor="trail-name">Your name</label>
            <input
              id="trail-name"
              value={trailForm.name}
              onChange={e => setTrailForm({ ...trailForm, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div className="trail-field">
            <label htmlFor="trail-location">Location</label>
            <input
              id="trail-location"
              value={trailForm.location}
              onChange={e => setTrailForm({ ...trailForm, location: e.target.value })}
              placeholder="City or state"
            />
          </div>
          <div className="trail-field">
            <label htmlFor="trail-idea">Your idea</label>
            <textarea
              id="trail-idea"
              value={trailForm.idea}
              onChange={e => setTrailForm({ ...trailForm, idea: e.target.value })}
              placeholder="Tell the community what heritage means to you..."
            />
          </div>
          <button className="primary-button" onClick={submitTrailIdea} disabled={!hasTrailDraft}>
            Post on the trail
          </button>
        </div>

        <div className="trail-list">
          {trailEntries.map((entry, index) => (
            <article className="trail-entry" key={`${entry.name}-${entry.location}-${index}`}>
              <div className="trail-author">
                <strong>{entry.name}</strong>
                <small>{entry.location}</small>
              </div>
              <p>{entry.idea}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
