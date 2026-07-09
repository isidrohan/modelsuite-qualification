import React from 'react';

const ConfirmModal = ({ open, title = 'Are you sure?', message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="bg-bg-card border border-border rounded-xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-[16px] font-semibold text-text-primary mb-2">{title}</h3>
        {message && <p className="text-[13px] text-text-faint mb-4">{message}</p>}

        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 bg-bg-input text-text-muted border border-border rounded-lg text-sm">{cancelText}</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-danger/10 text-danger border border-danger/30 rounded-lg text-sm font-semibold">{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
