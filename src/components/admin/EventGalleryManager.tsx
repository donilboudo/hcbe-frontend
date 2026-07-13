import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../lib/api/events';
import type { EventMedia } from '../../lib/api/types';
import { resolveMediaUrl } from '../../lib/api/media-url';
import { getVideoEmbedInfo } from '../../lib/media/video-embed';

interface EventGalleryManagerProps {
  eventId: string;
  media: EventMedia[];
  onChange: (media: EventMedia[]) => void;
}

export const EventGalleryManager: React.FC<EventGalleryManagerProps> = ({
  eventId,
  media,
  onChange,
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoCaption, setVideoCaption] = useState('');
  const [videoCaptionEn, setVideoCaptionEn] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [error, setError] = useState('');

  const sortedMedia = [...media].sort((a, b) => a.displayOrder - b.displayOrder);

  const handlePhotoUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    setError('');
    setIsUploading(true);

    try {
      const uploaded: EventMedia[] = [];
      for (const file of Array.from(files)) {
        const response = await eventsApi.uploadPhoto(eventId, file);
        if (response.success && response.data) {
          uploaded.push(response.data);
        } else {
          setError(response.message || t('admin.events.gallery.errorUpload'));
          break;
        }
      }

      if (uploaded.length > 0) {
        onChange([...media, ...uploaded]);
      }
    } catch (err) {
      console.error('Error uploading event photo:', err);
      setError(t('admin.events.gallery.errorUpload'));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleAddVideo = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = videoUrl.trim();
    if (!trimmed) return;

    if (!getVideoEmbedInfo(trimmed)) {
      setError(t('admin.events.gallery.errorVideoUrl'));
      return;
    }

    setError('');
    setIsAddingVideo(true);

    try {
      const response = await eventsApi.addVideo(
        eventId,
        trimmed,
        videoCaption.trim() || undefined,
        videoCaptionEn.trim() || undefined,
      );
      if (response.success && response.data) {
        onChange([...media, response.data]);
        setVideoUrl('');
        setVideoCaption('');
        setVideoCaptionEn('');
      } else {
        setError(response.message || t('admin.events.gallery.errorVideo'));
      }
    } catch (err) {
      console.error('Error adding event video:', err);
      setError(t('admin.events.gallery.errorVideo'));
    } finally {
      setIsAddingVideo(false);
    }
  };

  const handleDelete = async (item: EventMedia) => {
    if (!window.confirm(t('admin.events.gallery.confirmDelete'))) return;

    setError('');
    try {
      const response = await eventsApi.deleteMedia(eventId, item.id);
      if (response.success) {
        onChange(media.filter((m) => m.id !== item.id));
      } else {
        setError(response.message || t('admin.events.gallery.errorDelete'));
      }
    } catch (err) {
      console.error('Error deleting event media:', err);
      setError(t('admin.events.gallery.errorDelete'));
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="mb-2 text-lg font-medium text-gray-900">{t('admin.events.gallery.title')}</h3>
      <p className="mb-6 text-sm text-gray-500">{t('admin.events.gallery.hint')}</p>

      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={(e) => handlePhotoUpload(e.target.files)}
        />
        <button
          type="button"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <i className="ri-image-add-line mr-2" aria-hidden="true" />
          {isUploading ? t('admin.events.gallery.uploading') : t('admin.events.gallery.addPhotos')}
        </button>
      </div>

      <form onSubmit={handleAddVideo} className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder={t('admin.events.gallery.videoUrlPlaceholder')}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm sm:col-span-2 lg:col-span-1"
        />
        <input
          type="text"
          value={videoCaption}
          onChange={(e) => setVideoCaption(e.target.value)}
          placeholder={t('admin.events.gallery.captionPlaceholder')}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <input
          type="text"
          value={videoCaptionEn}
          onChange={(e) => setVideoCaptionEn(e.target.value)}
          placeholder={t('admin.events.gallery.captionEnPlaceholder')}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={isAddingVideo || !videoUrl.trim()}
          className="inline-flex items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-50"
        >
          <i className="ri-video-add-line mr-2" aria-hidden="true" />
          {isAddingVideo ? t('admin.events.gallery.adding') : t('admin.events.gallery.addVideo')}
        </button>
      </form>

      {sortedMedia.length === 0 ? (
        <p className="text-sm text-gray-500">{t('admin.events.gallery.empty')}</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedMedia.map((item) => {
            const video = item.mediaType === 'video' ? getVideoEmbedInfo(item.url) : null;
            return (
              <li key={item.id} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                {item.mediaType === 'image' ? (
                  <img
                    src={resolveMediaUrl(item.url)}
                    alt={item.caption || item.fileName || ''}
                    className="h-40 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-gray-900 text-white">
                    <div className="px-4 text-center">
                      <i className="ri-youtube-line text-3xl" aria-hidden="true" />
                      <p className="mt-2 truncate text-xs text-white/80">
                        {video?.provider === 'vimeo' ? 'Vimeo' : 'YouTube'}
                      </p>
                    </div>
                  </div>
                )}
                <div className="space-y-2 p-3">
                  {item.caption && <p className="text-sm text-gray-700">{item.caption}</p>}
                  {item.mediaType === 'video' && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block truncate text-xs text-emerald-700 hover:underline"
                    >
                      {item.url}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="text-sm font-medium text-red-700 hover:text-red-800"
                  >
                    {t('admin.events.gallery.delete')}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
