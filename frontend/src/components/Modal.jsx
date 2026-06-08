import React, { useEffect } from 'react';

const Modal = ({
  isOpen = false,
  onClose,
  title = '',
  children,
  width = 480,
  hideClose = false,
}) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(9,16,29,0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <div
        style={{
          background: '#0f172af5',
          border: '1px solid rgba(148,163,184,0.12)',
          borderRadius: 20,
          width: '100%',
          maxWidth: width,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(15,23,42,0.5)',
          animation: 'slideUp 0.2s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px 0',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>
            {title}
          </h3>
          {!hideClose && (
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: 'none',
                color: 'var(--muted)',
                width: 32,
                height: 32,
                borderRadius: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
              title="Close"
            >
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px 24px' }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Modal;