'use client';

import React from 'react';
import { MediaDeviceMenu, TrackReference, useLocalParticipant } from '@livekit/components-react';
import { Track } from 'livekit-client';

export function CameraSettings() {
  const { cameraTrack, localParticipant } = useLocalParticipant();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="lk-button-group">
        <MediaDeviceMenu kind="videoinput" />
      </div>
    </div>
  );
}
