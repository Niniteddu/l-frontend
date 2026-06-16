type ContentFeedbackProps = {
  loading: boolean;
  waitingForApi: boolean;
  waitingMessage: string;
  error: string;
};

export function ContentFeedback({ loading, waitingForApi, waitingMessage, error }: ContentFeedbackProps) {
  if (loading) {
    return <p className="mt-4">Caricamento...</p>;
  }

  if (waitingForApi) {
    return (
      <div className="api-waiting-banner mt-4" role="status" aria-live="polite">
        <span className="api-waiting-spinner" aria-hidden="true" />
        <p className="api-waiting-text">{waitingMessage}</p>
      </div>
    );
  }

  if (error) {
    return <p className="mt-4 text-red-700">{error}</p>;
  }

  return null;
}