import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import api from '../services/api';

const schemes = {
  'pm-kisan': 'PM-KISAN',
  pmfby: 'PM Fasal Bima Yojana',
  kcc: 'Kisan Credit Card',
  'sub-mission-agri-mechanization': 'Sub-Mission on Agricultural Mechanization',
  'certified-seed-subsidy': 'Certified Seed Subsidy Scheme',
};

export function SchemeMatcherPage() {
  const navigate = useNavigate();
  const [isMatching, setIsMatching] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleMatch = async (event) => {
    event.preventDefault();
    setIsMatching(true);
    setMessage('');
    try {
      const response = await api.matchSchemes({
        crops: ['Wheat (PBW 343)'],
        location: 'Sangrur, Punjab',
        farmSize: '3',
      });
      setResults(response.recommendations || []);
      setMessage(response.message || 'Your best matching schemes are ready.');
    } catch (error) {
      setMessage(`Could not complete AI matching: ${error.message}`);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] text-[#173f31]">
      <AppHeader activeKey="governmentSchemes" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <button type="button" onClick={() => navigate('/government-schemes')} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#173f31]">
          <ArrowLeft size={16} /> Back to Government Schemes
        </button>
        <section className="bg-[#173f31] text-white rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-emerald-300"><Sparkles size={20} /><span className="font-bold">AI Scheme Matcher</span></div>
          <h1 className="text-3xl font-extrabold">Find schemes matched to your farm</h1>
          <p className="text-sm text-emerald-100">Agrova AI uses your crop, location, and farm size to rank relevant government support.</p>
          <form onSubmit={handleMatch}>
            <button type="submit" disabled={isMatching} className="px-5 py-3 rounded-xl bg-white text-[#173f31] font-bold text-sm disabled:opacity-60">
              {isMatching ? 'Matching schemes…' : 'Run AI Matching'}
            </button>
          </form>
        </section>
        {message && <p role="status" className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-900">{message}</p>}
        {results.length > 0 && (
          <section className="space-y-3">
            {results.map((result) => (
              <article key={result.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-extrabold text-lg">{schemes[result.id] || result.id}</h2>
                  <p className="text-sm text-gray-600 mt-1">{result.reason}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold"><CheckCircle2 size={14} /> {result.score}% match</span>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default SchemeMatcherPage;
