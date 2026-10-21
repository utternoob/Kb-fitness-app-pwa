let tokenClient = null;

function initGoogleDriveSync(clientId) {
  if (window.google && google.accounts && google.accounts.oauth2) {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/drive.appdata',
      callback: () => {}
    });
  }
}

function triggerDriveSync(completedSets, updateStatusFn) {
  if (!tokenClient) {
    initGoogleDriveSync(APP_CONFIG.CLIENT_ID);
  }

  if (!tokenClient) {
    alert('Google SDK loading. Please try again in 5 seconds.');
    return;
  }

  updateStatusFn('Syncing...');

  tokenClient.callback = async (resp) => {
    if (resp.access_token) {
      await uploadDataToDrive(resp.access_token, completedSets, updateStatusFn);
    } else {
      updateStatusFn('Failed');
    }
  };

  tokenClient.requestAccessToken({ prompt: '' });
}

async function uploadDataToDrive(accessToken, completedSets, updateStatusFn) {
  try {
    const fileContent = JSON.stringify({
      appName: 'kb-fitness-app-pwa',
      lastUpdated: new Date().toISOString(),
      sets: completedSets
    });

    const metadata = {
      name: 'kb_workout_history.json',
      parents: ['appDataFolder']
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([fileContent], { type: 'application/json' }));

    const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      body: form
    });

    if (res.ok) {
      updateStatusFn('Synced ✓');
      setTimeout(() => updateStatusFn('Sync'), 3000);
    } else {
      updateStatusFn('Error!');
    }
  } catch (err) {
    updateStatusFn('Failed');
  }
}
