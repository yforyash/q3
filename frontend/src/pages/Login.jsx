import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, forgotPasswordApi, resetPasswordApi, registerApi } from '../api/auth.api';

export default function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('login'); // login | signup | forgot

  // login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // signup
  const [su, setSu] = useState({ name: '', surname: '', email: '', phone: '', area: '', city: '', state: '', pincode: '', password: '', confirm: '' });
  const [suError, setSuError] = useState('');
  const [suSuccess, setSuSuccess] = useState(false);
  const [suLoading, setSuLoading] = useState(false);

  // forgot/reset
  const [forgotStep, setForgotStep] = useState(1);
  const [fpEmail, setFpEmail] = useState('');
  const [fpLoading, setFpLoading] = useState(false);
  const [fpError, setFpError] = useState('');
  const [fpToken, setFpToken] = useState('');
  const [rpPass, setRpPass] = useState('');
  const [rpConfirm, setRpConfirm] = useState('');
  const [rpLoading, setRpLoading] = useState(false);
  const [rpError, setRpError] = useState('');
  const [rpSuccess, setRpSuccess] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      await loginApi(email, password);
      navigate('/dashboard');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleSignup() {
    setSuError('');
    if (!su.name || !su.email || !su.password || !su.confirm) { setSuError('Please fill all required fields'); return; }
    if (su.password !== su.confirm) { setSuError("Passwords don't match"); return; }
    setSuLoading(true);
    try {
      await registerApi({
        name: `${su.name} ${su.surname}`.trim(),
        email: su.email,
        password: su.password,
        phone: su.phone,
        area: su.area,
        city: su.city,
        state: su.state,
        pincode: su.pincode,
      });
      setSuSuccess(true);
    } catch (err) {
      setSuError(err.response?.data?.message || 'Registration failed');
    } finally {
      setSuLoading(false);
    }
  }

  async function handleSendToken() {
    setFpError('');
    if (!fpEmail) { setFpError('Enter your email address'); return; }
    setFpLoading(true);
    try {
      const data = await forgotPasswordApi(fpEmail);
      setFpToken(data.data.resetToken);
      setForgotStep(2);
    } catch (err) {
      setFpError(err.response?.data?.message || 'Email not found');
    } finally {
      setFpLoading(false);
    }
  }

  async function handleResetPassword() {
    setRpError('');
    if (!rpPass) { setRpError('Enter a new password'); return; }
    if (rpPass !== rpConfirm) { setRpError("Passwords don't match"); return; }
    setRpLoading(true);
    try {
      await resetPasswordApi(fpToken, rpPass);
      setRpSuccess(true);
    } catch (err) {
      setRpError(err.response?.data?.message || 'Reset failed');
    } finally {
      setRpLoading(false);
    }
  }

  function goBackToLogin() {
    setTab('login');
    setForgotStep(1); setFpEmail(''); setFpToken(''); setFpError('');
    setRpPass(''); setRpConfirm(''); setRpError(''); setRpSuccess(false);
  }

  const field = (key, placeholder, type = 'text') => (
    <input className="field-input" type={type} placeholder={placeholder}
      value={su[key]} onChange={e => setSu(p => ({ ...p, [key]: e.target.value }))} />
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0d0f14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", padding: '24px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap');
        .card { background:#161a23; border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:40px; width:100%; max-width:460px; box-shadow:0 32px 80px rgba(0,0,0,0.6); }
        .logo-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(234,126,52,0.12); border:1px solid rgba(234,126,52,0.25); border-radius:8px; padding:6px 12px; margin-bottom:20px; }
        .logo-dot { width:8px; height:8px; border-radius:50%; background:#ea7e34; }
        .logo-text { font-family:'Syne',sans-serif; font-size:13px; color:#ea7e34; letter-spacing:0.08em; }
        .heading { font-family:'Syne',sans-serif; font-size:26px; color:#f0f0f0; margin:0 0 4px; font-weight:700; }
        .subheading { font-size:14px; color:#5a6070; margin:0 0 24px; }
        .tab-row { display:flex; gap:4px; background:#1e2330; border-radius:10px; padding:4px; margin-bottom:28px; }
        .tab-btn { flex:1; padding:8px; border:none; border-radius:8px; font-size:13px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; background:transparent; color:#5a6070; transition:all .15s; }
        .tab-btn.active { background:#161a23; color:#f0f0f0; box-shadow:0 1px 4px rgba(0,0,0,0.4); }
        .field-label { display:block; font-size:11px; font-weight:500; color:#8090a0; margin-bottom:5px; letter-spacing:0.05em; text-transform:uppercase; }
        .field-input { width:100%; box-sizing:border-box; background:#1e2330; border:1px solid rgba(255,255,255,0.07); border-radius:10px; padding:11px 14px; font-size:14px; color:#e8eaf0; outline:none; transition:border-color 0.15s; font-family:'DM Sans',sans-serif; margin-bottom:14px; }
        .field-input:focus { border-color:rgba(234,126,52,0.5); }
        .field-input::placeholder { color:#3a4255; }
        .row2 { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .btn-primary { width:100%; padding:13px; background:#ea7e34; color:#fff; border:none; border-radius:10px; font-size:15px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:opacity 0.15s,transform 0.1s; }
        .btn-primary:hover:not(:disabled) { opacity:0.88; }
        .btn-primary:active:not(:disabled) { transform:scale(0.99); }
        .btn-primary:disabled { opacity:0.5; cursor:not-allowed; }
        .btn-ghost { background:none; border:none; color:#ea7e34; font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; padding:0; margin-top:14px; display:block; width:100%; text-align:center; transition:opacity 0.15s; }
        .btn-ghost:hover { opacity:0.7; }
        .error-box { background:rgba(220,60,60,0.1); border:1px solid rgba(220,60,60,0.25); border-radius:8px; padding:10px 14px; font-size:13px; color:#f07070; margin-bottom:14px; }
        .success-box { background:rgba(60,190,120,0.1); border:1px solid rgba(60,190,120,0.25); border-radius:8px; padding:10px 14px; font-size:13px; color:#60c890; margin-bottom:14px; text-align:center; }
        .section-label { font-size:11px; color:#3a4255; letter-spacing:0.06em; text-transform:uppercase; margin:4px 0 12px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:8px; }
        .step-indicator { display:flex; align-items:center; gap:8px; margin-bottom:24px; }
        .step-dot { width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:600; }
        .step-dot.active { background:#ea7e34; color:#fff; }
        .step-dot.done { background:rgba(60,190,120,0.2); color:#60c890; border:1px solid rgba(60,190,120,0.3); }
        .step-dot.inactive { background:rgba(255,255,255,0.05); color:#3a4255; }
        .step-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .back-link { display:flex; align-items:center; gap:6px; font-size:12px; color:#5a6070; cursor:pointer; margin-bottom:24px; width:fit-content; transition:color 0.15s; background:none; border:none; font-family:'DM Sans',sans-serif; padding:0; }
        .back-link:hover { color:#9aa0b0; }
        .required { color:#ea7e34; margin-left:2px; }
      `}</style>

      <div className="card">
        <div className="logo-badge">
          <div className="logo-dot" />
          <span className="logo-text">Q3 ADMIN</span>
        </div>

        {/* Tab switcher — only show for login/signup */}
        {tab !== 'forgot' && (
          <div className="tab-row">
            <button className={`tab-btn ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign in</button>
            <button className={`tab-btn ${tab === 'signup' ? 'active' : ''}`} onClick={() => setTab('signup')}>Create account</button>
          </div>
        )}

        {/* ── LOGIN ── */}
        {tab === 'login' && (
          <>
            <h1 className="heading">Welcome back</h1>
            <p className="subheading">Sign in to your admin portal</p>
            {loginError && <div className="error-box">{loginError}</div>}
            <form onSubmit={handleLogin}>
              <label className="field-label">Email <span className="required">*</span></label>
              <input className="field-input" type="email" placeholder="admin@q3.com" value={email} onChange={e => setEmail(e.target.value)} required />
              <label className="field-label">Password <span className="required">*</span></label>
              <input className="field-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
              <button className="btn-primary" type="submit" disabled={loginLoading}>
                {loginLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <button className="btn-ghost" onClick={() => setTab('forgot')}>Forgot your password?</button>
          </>
        )}

        {/* ── SIGN UP ── */}
        {tab === 'signup' && (
          <>
            <h1 className="heading">Create account</h1>
            <p className="subheading">Fill in your details to get started</p>
            {suError && <div className="error-box">{suError}</div>}
            {suSuccess ? (
              <>
                <div className="success-box">✓ Account created! You can now sign in.</div>
                <button className="btn-primary" onClick={() => { setTab('login'); setSuSuccess(false); setSu({ name:'', surname:'', email:'', phone:'', area:'', city:'', state:'', pincode:'', password:'', confirm:'' }); }}>
                  Go to sign in
                </button>
              </>
            ) : (
              <>
                <p className="section-label">Personal info</p>
                <div className="row2">
                  <div>
                    <label className="field-label">First name <span className="required">*</span></label>
                    {field('name', 'Yash')}
                  </div>
                  <div>
                    <label className="field-label">Last name</label>
                    {field('surname', 'Agarwal')}
                  </div>
                </div>
                <div className="row2">
                  <div>
                    <label className="field-label">Email <span className="required">*</span></label>
                    {field('email', 'you@q3.com', 'email')}
                  </div>
                  <div>
                    <label className="field-label">Phone</label>
                    {field('phone', '+91 98765 43210', 'tel')}
                  </div>
                </div>

                <p className="section-label">Address</p>
                <div className="row2">
                  <div>
                    <label className="field-label">Area</label>
                    {field('area', 'Koramangala')}
                  </div>
                  <div>
                    <label className="field-label">City</label>
                    {field('city', 'Bengaluru')}
                  </div>
                </div>
                <div className="row2">
                  <div>
                    <label className="field-label">State</label>
                    {field('state', 'Karnataka')}
                  </div>
                  <div>
                    <label className="field-label">Pincode</label>
                    {field('pincode', '560034')}
                  </div>
                </div>

                <p className="section-label">Security</p>
                <div className="row2">
                  <div>
                    <label className="field-label">Password <span className="required">*</span></label>
                    {field('password', 'Min. 8 characters', 'password')}
                  </div>
                  <div>
                    <label className="field-label">Confirm password <span className="required">*</span></label>
                    {field('confirm', 'Repeat password', 'password')}
                  </div>
                </div>

                <button className="btn-primary" onClick={handleSignup} disabled={suLoading}>
                  {suLoading ? 'Creating account…' : 'Create account'}
                </button>
              </>
            )}
          </>
        )}

        {/* ── FORGOT PASSWORD ── */}
        {tab === 'forgot' && (
          <>
            <button className="back-link" onClick={goBackToLogin}>← Back to sign in</button>
            <h1 className="heading">Reset password</h1>
            <p className="subheading">{forgotStep === 1 ? 'Enter your email to continue' : 'Choose a new password'}</p>
            <div className="step-indicator">
              <div className={`step-dot ${forgotStep === 1 ? 'active' : 'done'}`}>{forgotStep > 1 ? '✓' : '1'}</div>
              <div className="step-line" />
              <div className={`step-dot ${forgotStep === 2 ? 'active' : 'inactive'}`}>2</div>
            </div>

            {forgotStep === 1 && (
              <>
                {fpError && <div className="error-box">{fpError}</div>}
                <label className="field-label">Email address</label>
                <input className="field-input" type="email" placeholder="admin@q3.com" value={fpEmail} onChange={e => setFpEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendToken()} />
                <button className="btn-primary" onClick={handleSendToken} disabled={fpLoading}>
                  {fpLoading ? 'Verifying…' : 'Continue'}
                </button>
              </>
            )}

            {forgotStep === 2 && (
              <>
                {rpSuccess ? (
                  <>
                    <div className="success-box">✓ Password updated successfully</div>
                    <button className="btn-primary" onClick={goBackToLogin}>Back to sign in</button>
                  </>
                ) : (
                  <>
                    {rpError && <div className="error-box">{rpError}</div>}
                    <div style={{ background:'rgba(60,190,120,0.06)', border:'1px solid rgba(60,190,120,0.15)', borderRadius:'8px', padding:'10px 14px', fontSize:'13px', color:'#5a7060', marginBottom:'16px' }}>
                      ✓ Verified — <span style={{ color:'#8090a0' }}>{fpEmail}</span>
                    </div>
                    <label className="field-label">New password</label>
                    <input className="field-input" type="password" placeholder="Min. 8 characters" value={rpPass} onChange={e => setRpPass(e.target.value)} />
                    <label className="field-label">Confirm password</label>
                    <input className="field-input" type="password" placeholder="Repeat new password" value={rpConfirm} onChange={e => setRpConfirm(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleResetPassword()} />
                    <button className="btn-primary" onClick={handleResetPassword} disabled={rpLoading}>
                      {rpLoading ? 'Updating…' : 'Set new password'}
                    </button>
                    <button className="btn-ghost" onClick={() => { setForgotStep(1); setFpToken(''); setRpError(''); }}>
                      Use a different email
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
