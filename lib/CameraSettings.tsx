'use client';

import React from 'react';
import { MediaDeviceMenu, useLocalParticipant } from '@livekit/components-react';

export function CameraSettings() {
  useLocalParticipant();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className="lk-button-group">
        <MediaDeviceMenu kind="videoinput" />
      </div>
    </div>
  );
}
