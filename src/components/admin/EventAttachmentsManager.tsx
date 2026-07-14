import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../lib/api/events';
import type { EventAttachment } from '../../lib/api/types';
import { formatFileSize, resolveMediaUrl } from '../../lib/api/media-url';

interface EventAttachmentsManagerProps {
  eventId: string;
  attachments: EventAttachment[];
  onChange: (attachments: EventAttachment[]) => void;
}

export const EventAttachmentsManager: React.FC<EventAttachmentsManagerProps> = ({
  eventId,
  attachments,
  onChange,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setError('');
    setIsUploading(true);

    try {
      const uploaded: EventAttachment[] = [];
      for (const file of Array.from(files)) {
        const response = await eventsApi.uploadAttachment(eventId, file);
        if (response.success && response.data) {
          uploaded.push(response.data);
        } else {
          setError(response.message || t('admin.events.attachments.errorUpload'));
          break;
        }
      }

      if (uploaded.length > 0) {
        onChange([...attachments, ...uploaded]);
      }
    } catch (err) {
      console.error('Error uploading event attachment:', err);
      setError(t('admin.events.attachments.errorUpload'));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (item: EventAttachment) => {
    if (!window.confirm(t('admin.events.attachments.confirmDelete'))) return;

    setError('');
    try {
      const response = await eventsApi.deleteAttachment(eventId, item.id);
      if (response.success) {
        onChange(attachments.filter((a) => a.id !== item.id));
      } else {
        setError(response.message || t('admin.events.attachments.errorDelete'));
      }
    } catch (err) {
      console.error('Error deleting event attachment:', err);
      setError(t('admin.events.attachments.errorDelete'));
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="mb-2 text-lg font-medium text-gray-900">
        {t('admin.events.attachments.title')}
      </h3>
      <p className="mb-6 text-sm text-gray-500">{t('admin.events.attachments.hint')}</p>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="ri-attachment-2 mr-2" aria-hidden="true" />
          {isUploading
            ? t('admin.events.attachments.uploading')
            : t('admin.events.attachments.add')}
        </button>
      </div>

      {attachments.length === 0 ? (
        <p className="text-sm text-gray-500">{t('admin.events.attachments.empty')}</p>
      ) : (
        <ul className="space-y-2">
          {attachments.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
            >
              <a
                href={resolveMediaUrl(item.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 truncate text-sm font-medium text-emerald-700 hover:underline"
              >
                <i className="ri-attachment-2 mr-2" aria-hidden="true" />
                {item.fileName}
                <span className="ml-2 text-gray-500">({formatFileSize(item.sizeBytes)})</span>
              </a>
              <button
                type="button"
                onClick={() => handleDelete(item)}
                className="text-sm font-medium text-red-700 hover:text-red-800"
              >
                {t('admin.events.attachments.delete')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
