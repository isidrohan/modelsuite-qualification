import { useEffect, useState } from 'react';
import TalentSidebar from '../../components/talent/TalentSidebar';
import { fetchSubmissionHistory } from '../../api/submissions';
import formatDate from '../../utils/formatDate';

const REVIEW_BADGE_CLASS = {
  Approved: 'status-badge-Approved',
  Rejected: 'status-badge-Rejected',
};

const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10l4 4 8-8" />
  </svg>
);

const IconReject = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);

const IconFile = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h5l5 5v11H6z" />
    <path d="M11 2v5h5" />
  </svg>
);

const TalentHistoryPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await fetchSubmissionHistory();
      setSubmissions(data);
    } catch {
      setError('Failed to load submission history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const approvedCount = submissions.filter((submission) => submission.reviewStatus === 'Approved').length;
  const rejectedCount = submissions.filter((submission) => submission.reviewStatus === 'Rejected').length;

  return (
    <div className="flex min-h-screen" style={{ background: '#050505' }}>
      <TalentSidebar />

      <main className="ml-59 flex-1 px-8 py-8" style={{ maxWidth: 'calc(100vw - 236px)' }}>
        <div className="mb-7 page-section">
          <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: '#F0F0F0', fontFamily: 'Poppins, sans-serif' }}>
            Submission History
          </h1>
          <p className="mt-0.5 text-[13px]" style={{ color: '#6B7280' }}>
            A timeline of your completed work that was approved or rejected.
          </p>
        </div>

        {error && (
          <p className="text-[13px] mb-4 px-4 py-3 rounded-lg"
            style={{ color: '#F87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7 page-section">
          {[
            { label: 'Reviewed', value: submissions.length, tone: 'text-[color:var(--color-text-primary)]' },
            { label: 'Approved', value: approvedCount, tone: 'text-[color:var(--color-success)]' },
            { label: 'Rejected', value: rejectedCount, tone: 'text-[color:var(--color-danger)]' },
          ].map(({ label, value, tone }) => (
            <div key={label} className="stat-card stat-card-default">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">{label}</p>
              <p className={`mt-2 text-[28px] font-semibold tracking-tight ${tone}`}>{value}</p>
            </div>
          ))}
        </section>

        <section className="page-section">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#4B5563', fontFamily: 'Inter, sans-serif' }}>
                Timeline
              </h2>
              <p className="mt-1 text-[13px]" style={{ color: '#6B7280' }}>
                Most recent decisions appear first.
              </p>
            </div>
            <button
              onClick={loadHistory}
              className="px-3 py-1.5 rounded-full text-[12px] font-semibold border"
              style={{ background: 'rgba(255,255,255,0.03)', color: '#E5E2E1', borderColor: 'rgba(255,255,255,0.08)' }}>
              Refresh
            </button>
          </div>

          <div className="bg-bg-card border border-border rounded-xl overflow-hidden">
            {loading ? (
              <div className="py-16 text-center text-[13px]" style={{ color: '#6B7280' }}>
                Loading your history...
              </div>
            ) : submissions.length === 0 ? (
              <div className="py-16 px-6 text-center" style={{ color: '#6B7280' }}>
                No approved or rejected submissions yet.
              </div>
            ) : (
              <div className="relative px-4 sm:px-6 py-6">
                <div className="absolute left-8.5 top-6 bottom-6 w-px bg-[rgba(255,255,255,0.08)]" />

                <div className="flex flex-col gap-4">
                  {submissions.map((submission, index) => {
                    const task = submission.taskId || {};
                    const reviewStatus = submission.reviewStatus || 'Approved';
                    const isApproved = reviewStatus === 'Approved';

                    return (
                      <article
                        key={submission._id}
                        className="relative pl-16 pr-2 py-1 table-row-animate"
                        style={{ animationDelay: `${index * 0.06}s` }}>
                        <div
                          className="absolute left-6.75 top-6 z-10 flex h-4 w-4 items-center justify-center rounded-full border"
                          style={{
                            background: isApproved ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                            borderColor: isApproved ? 'rgba(16,185,129,0.35)' : 'rgba(239,68,68,0.35)',
                            color: isApproved ? '#34D399' : '#F87171',
                          }}>
                          {isApproved ? <IconCheck /> : <IconReject />}
                        </div>

                        <div className="rounded-xl border border-border bg-bg-surface px-5 py-4 transition-colors hover:border-border-light">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <p className="text-[15px] font-semibold text-text-primary truncate">
                                {task.title || 'Untitled task'}
                              </p>
                              <p className="mt-1 text-[12px]" style={{ color: '#6B7280' }}>
                                Submitted {formatDate(submission.createdAt)} · Reviewed {formatDate(submission.updatedAt)}
                              </p>
                            </div>

                            <span
                              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-0.75 text-[11px] font-semibold ${REVIEW_BADGE_CLASS[reviewStatus] || 'status-badge-Submitted'}`}
                              style={{ fontFamily: 'Inter, sans-serif' }}>
                              {isApproved ? <IconCheck /> : <IconReject />}
                              {reviewStatus}
                            </span>
                          </div>

                          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#4B5563' }}>
                                Notes
                              </p>
                              <p className="mt-1 text-[13px] leading-relaxed" style={{ color: '#B3B3B3' }}>
                                {submission.notes || 'No notes provided.'}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-[13px]">
                              {submission.fileUrl ? (
                                <a
                                  href={submission.fileUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-primary underline underline-offset-2 transition-colors hover:text-secondary">
                                  <IconFile />
                                  View file
                                </a>
                              ) : (
                                <span style={{ color: '#6B7280' }}>No file attached</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TalentHistoryPage;