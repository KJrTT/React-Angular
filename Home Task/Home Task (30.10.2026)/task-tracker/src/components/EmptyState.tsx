interface EmptyStateProps {
    title: string;
    hint?: string;
  }
  
  export default function EmptyState({ title, hint }: EmptyStateProps) {
    return (
      <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>
        <p style={{ fontSize: 18, fontWeight: 600 }}>{title}</p>
        {hint && <p style={{ fontSize: 14 }}>{hint}</p>}
      </div>
    );
  }