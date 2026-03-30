import { useState } from 'react'

const styles = `
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(55,138,221,0.3); }
    50% { box-shadow: 0 0 0 10px rgba(55,138,221,0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
  @keyframes borderGlow {
    0%, 100% { border-color: #2a2a2a; }
    50% { border-color: #378ADD; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.93); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes ringPulse {
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(55,138,221,0.4); }
    50% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(55,138,221,0); }
  }
  @keyframes textGlow {
    0%, 100% { text-shadow: 0 0 0px #378ADD; }
    50% { text-shadow: 0 0 12px rgba(55,138,221,0.6); }
  }
  @keyframes lineExpand {
    from { width: 0; }
    to { width: 100%; }
  }

  * { transition-property: none; }

  .nav-logo:hover span {
    animation: textGlow 1.5s ease infinite;
  }
  .nav-btn {
    position: relative;
    overflow: hidden;
  }
  .nav-btn::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 0; height: 0;
    background: rgba(255,255,255,0.15);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.4s ease, height 0.4s ease;
  }
  .nav-btn:hover::after { width: 200px; height: 200px; }
  .nav-btn:hover { background: #185FA5 !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(55,138,221,0.3); }
  .nav-btn:active { transform: scale(0.97) !important; }

  .cta-btn {
    position: relative;
    overflow: hidden;
  }
  .cta-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s ease;
  }
  .cta-btn:hover::before { left: 100%; }
  .cta-btn:hover { background: #185FA5 !important; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(55,138,221,0.35); }
  .cta-btn:active { transform: scale(0.97) !important; }

  .feature-card {
    position: relative;
    overflow: hidden;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: #378ADD;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .feature-card:hover::before { transform: scaleX(1); }
  .feature-card:hover {
    border-color: #378ADD !important;
    transform: translateY(-4px) !important;
    box-shadow: 0 8px 24px rgba(55,138,221,0.12) !important;
  }
  .feature-card:hover .feature-icon {
    background: #185FA5 !important;
    transform: scale(1.1) rotate(5deg);
  }
  .feature-icon { transition: background 0.2s, transform 0.3s ease !important; }

  .upload-box {
    position: relative;
    overflow: hidden;
  }
  .upload-box::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(55,138,221,0.06) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .upload-box:hover::before { opacity: 1; }
  .upload-box:hover {
    border-color: #378ADD !important;
    transform: scale(1.01) !important;
    box-shadow: 0 0 0 4px rgba(55,138,221,0.08) !important;
  }

  .submit-btn {
    position: relative;
    overflow: hidden;
  }
  .submit-btn::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 0; height: 0;
    background: rgba(255,255,255,0.12);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease;
  }
  .submit-btn:hover::after { width: 600px; height: 600px; }
  .submit-btn:hover { background: #185FA5 !important; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(55,138,221,0.3); }
  .submit-btn:active { transform: scale(0.98) !important; }

  .feedback-card {
    position: relative;
    overflow: hidden;
  }
  .feedback-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 1px; width: 0;
    background: #378ADD;
    transition: width 0.4s ease;
  }
  .feedback-card:hover::after { width: 100%; }
  .feedback-card:hover { border-color: #2a3a4a !important; transform: translateY(-1px); }

  .back-btn:hover { gap: 10px !important; color: #85B7EB !important; }
  .back-btn:hover span { transform: translateX(-3px); }

  .tag {
    position: relative;
    overflow: hidden;
  }
  .tag::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.1);
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }
  .tag:hover::before { transform: translateX(0); }
  .tag:hover { transform: scale(1.08) translateY(-1px) !important; box-shadow: 0 2px 8px rgba(55,138,221,0.2); }

  .copy-btn:hover { background: #185FA5 !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(55,138,221,0.3); }
  .copy-btn:active { transform: scale(0.97); }

  .new-btn:hover { border-color: #378ADD !important; color: #378ADD !important; transform: translateY(-1px); }
  .btn-secondary:hover { border-color: #378ADD !important; color: #378ADD !important; transform: translateY(-1px); }

  .score-circle:hover { animation: ringPulse 1s ease infinite !important; }

  .hero-badge:hover { transform: scale(1.04); box-shadow: 0 2px 12px rgba(55,138,221,0.2); }

  .loading-text { transition: opacity 0.3s ease, transform 0.3s ease; }
`

function App() {
  const [page, setPage] = useState('landing')
  const [results, setResults] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <style>{styles}</style>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', borderBottom: '0.5px solid #2a2a2a',
        background: '#0a0a0a', position: 'sticky', top: 0, zIndex: 100,
        animation: 'fadeIn 0.6s ease both'
      }}>
        <div
          className="nav-logo"
          onClick={() => setPage('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#378ADD', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#fff', transition: 'color 0.2s' }}>ResumeIQ</span>
        </div>
        <button
          className="nav-btn"
          onClick={() => setPage('upload')}
          style={{
            padding: '6px 16px', background: '#378ADD', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '13px',
            cursor: 'pointer', transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s'
          }}
        >
          Analyze resume
        </button>
      </nav>

      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'upload' && <Upload setPage={setPage} setResults={setResults} />}
      {page === 'results' && results && <Results results={results} setPage={setPage} />}
    </div>
  )
}

function Landing({ setPage }) {
  return (
    <div>
      <div style={{ padding: '80px 32px 60px', textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
        <div
          className="hero-badge"
          style={{
            display: 'inline-block', fontSize: '12px', padding: '4px 12px',
            borderRadius: '8px', background: '#0C447C', color: '#85B7EB',
            marginBottom: '20px', animation: 'fadeUp 0.5s ease both',
            cursor: 'default', transition: 'transform 0.2s, box-shadow 0.2s'
          }}
        >
          AI-powered resume analysis
        </div>
        <h1 style={{
          fontSize: '40px', fontWeight: 500, color: '#fff', lineHeight: 1.2,
          marginBottom: '16px', animation: 'fadeUp 0.5s ease 0.1s both'
        }}>
          Get your resume{' '}
          <span style={{ color: '#378ADD', animation: 'textGlow 2s ease infinite' }}>roasted</span>
          {' '}by AI
        </h1>
        <p style={{
          fontSize: '16px', color: '#888', lineHeight: 1.7,
          marginBottom: '32px', animation: 'fadeUp 0.5s ease 0.2s both'
        }}>
          Upload your resume, paste a job description, and get instant brutally honest feedback — score, weaknesses, missing keywords, and rewritten bullet points.
        </p>
        <button
          className="cta-btn"
          onClick={() => setPage('upload')}
          style={{
            padding: '12px 32px', background: '#378ADD', color: '#fff', border: 'none',
            borderRadius: '8px', fontSize: '15px', cursor: 'pointer',
            transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
            animation: 'fadeUp 0.5s ease 0.3s both'
          }}
        >
          Analyze my resume
        </button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px', padding: '0 32px 60px', maxWidth: '900px', margin: '0 auto'
      }}>
        {[
          { title: 'Resume score', desc: 'Get an overall score out of 10 with detailed breakdown of strengths and weaknesses.' },
          { title: 'Keyword match', desc: 'Find missing keywords from the job description that ATS systems scan for.' },
          { title: 'Rewritten bullets', desc: 'Get stronger, metric-driven bullet points that make your experience stand out.' }
        ].map((f, i) => (
          <div
            key={i}
            className="feature-card"
            style={{
              background: '#111', border: '0.5px solid #2a2a2a', borderRadius: '12px',
              padding: '20px', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
              animation: `fadeUp 0.5s ease ${0.35 + i * 0.1}s both`, cursor: 'default'
            }}
          >
            <div
              className="feature-icon"
              style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0C447C', marginBottom: '12px' }}
            />
            <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#fff', marginBottom: '6px' }}>{f.title}</h3>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Upload({ setPage, setResults }) {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('Reading your resume...')

  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert('Please upload a resume and add a job description')
      return
    }
    setLoading(true)
    const messages = ['Reading your resume...', 'Analyzing content...', 'Matching job description...', 'Generating feedback...']
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i < messages.length) setLoadingText(messages[i])
    }, 1500)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobDescription', jobDesc)

      const res = await fetch('http://localhost:8000/api/resume/upload', {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      clearInterval(interval)
      setLoading(false)
      if (data.success) {
        setResults(data.feedback)
        setPage('results')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (err) {
      clearInterval(interval)
      setLoading(false)
      alert('Could not connect to server. Make sure backend is running on port 8000.')
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', animation: 'fadeIn 0.4s ease both' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '10px', height: '10px', borderRadius: '50%', background: '#378ADD',
              animation: `dotBounce 1.4s infinite ease-in-out ${[-0.32, -0.16, 0][i]}s both`
            }} />
          ))}
        </div>
        <p className="loading-text" style={{ fontSize: '14px', color: '#888' }}>{loadingText}</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 32px', animation: 'fadeUp 0.5s ease both' }}>
      <button
        className="back-btn"
        onClick={() => setPage('landing')}
        style={{
          fontSize: '13px', color: '#378ADD', background: 'none', border: 'none',
          cursor: 'pointer', marginBottom: '24px', display: 'flex',
          alignItems: 'center', gap: '6px', padding: 0,
          transition: 'gap 0.2s, color 0.2s'
        }}
      >
        <span style={{ transition: 'transform 0.2s' }}>←</span> Back
      </button>

      <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#fff', marginBottom: '8px' }}>Analyze your resume</h2>
      <p style={{ fontSize: '14px', color: '#888', marginBottom: '32px' }}>Upload your resume PDF and paste the job description below.</p>

      <div
        className="upload-box"
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          border: '1.5px dashed #2a2a2a', borderRadius: '12px', padding: '40px',
          textAlign: 'center', background: '#111', marginBottom: '20px',
          cursor: 'pointer', transition: 'border-color 0.25s, transform 0.2s, box-shadow 0.2s',
          animation: 'borderGlow 3s ease infinite', position: 'relative'
        }}
      >
        <div style={{ fontSize: '28px', marginBottom: '10px', animation: 'float 3s ease-in-out infinite' }}>📄</div>
        <p style={{ fontSize: '14px', color: file ? '#378ADD' : '#888', marginBottom: '4px', transition: 'color 0.2s' }}>
          {file ? `✓  ${file.name}` : 'Click to upload your resume PDF'}
        </p>
        <span style={{ fontSize: '13px', color: '#555' }}>PDF only, max 5MB</span>
        <input type="file" id="fileInput" accept=".pdf" style={{ display: 'none' }}
          onChange={e => setFile(e.target.files[0])} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#ccc', marginBottom: '8px' }}>
          Job description
        </label>
        <textarea
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          placeholder="Paste the job description you are applying for..."
          style={{
            width: '100%', padding: '12px', border: '0.5px solid #2a2a2a',
            borderRadius: '8px', fontSize: '14px', color: '#e8e8e8',
            background: '#111', resize: 'vertical', minHeight: '120px',
            outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s, box-shadow 0.2s'
          }}
          onFocus={e => {
            e.target.style.borderColor = '#378ADD'
            e.target.style.boxShadow = '0 0 0 3px rgba(55,138,221,0.1)'
          }}
          onBlur={e => {
            e.target.style.borderColor = '#2a2a2a'
            e.target.style.boxShadow = 'none'
          }}
        />
      </div>

      <button
        className="submit-btn"
        onClick={handleSubmit}
        style={{
          width: '100%', padding: '14px', background: '#378ADD', color: '#fff',
          border: 'none', borderRadius: '8px', fontSize: '15px',
          cursor: 'pointer', fontWeight: 500,
          transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
          position: 'relative', overflow: 'hidden'
        }}
      >
        Analyze resume
      </button>
    </div>
  )
}

function Results({ results, setPage }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(results)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px', animation: 'fadeUp 0.5s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 500, color: '#fff', marginBottom: '4px' }}>Analysis complete</h2>
          <p style={{ fontSize: '13px', color: '#666' }}>Here is your AI feedback</p>
        </div>
        <button
          className="new-btn"
          onClick={() => setPage('upload')}
          style={{
            padding: '8px 18px', background: 'none', border: '0.5px solid #2a2a2a',
            borderRadius: '8px', color: '#ccc', fontSize: '13px', cursor: 'pointer',
            transition: 'border-color 0.2s, color 0.2s, transform 0.15s'
          }}
        >
          New analysis
        </button>
      </div>

      <div
        className="feedback-card"
        style={{
          background: '#111', border: '0.5px solid #2a2a2a', borderRadius: '12px',
          padding: '28px', whiteSpace: 'pre-wrap', fontSize: '14px',
          color: '#ccc', lineHeight: 1.9, marginBottom: '20px',
          animation: 'scaleIn 0.5s ease 0.1s both',
          transition: 'border-color 0.2s, transform 0.2s',
          position: 'relative', overflow: 'hidden'
        }}
      >
        {results}
      </div>

      <div style={{ display: 'flex', gap: '12px', animation: 'fadeUp 0.5s ease 0.3s both' }}>
        <button
          className="copy-btn"
          onClick={handleCopy}
          style={{
            flex: 1, padding: '12px', background: copied ? '#1a5c2a' : '#378ADD',
            color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px',
            cursor: 'pointer', transition: 'background 0.3s, transform 0.15s, box-shadow 0.2s'
          }}
        >
          {copied ? '✓ Copied to clipboard!' : 'Copy feedback'}
        </button>
        <button
          className="btn-secondary"
          onClick={() => setPage('upload')}
          style={{
            flex: 1, padding: '12px', background: 'none', color: '#ccc',
            border: '0.5px solid #2a2a2a', borderRadius: '8px', fontSize: '14px',
            cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s, transform 0.15s'
          }}
        >
          Analyze another resume
        </button>
      </div>
    </div>
  )
}

export default App