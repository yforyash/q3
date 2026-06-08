import React from 'react';

const VARIANTS = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  danger: 'btn btn-danger',
  ghost: 'btn btn-ghost',
};

const Button = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  style = {},
}) => {
  return (
    <button
      type={type}
      className={VARIANTS[variant] || VARIANTS.primary}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        width: fullWidth ? '100%' : undefined,
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...style,
      }}
    >
      {loading && (
        <span
          style={{
            width: 14,
            height: 14,
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid #fff',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.7s linear infinite',
          }}
        />
      )}
      {children}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default Button;