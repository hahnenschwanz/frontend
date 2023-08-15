const tareScale = async (onError: (error: Error) => void) => {
  try {
    const response = await fetch('/api/admin/scale/tare', {
      method: 'POST',
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
      );
    }
  } catch (error) {
    onError(error as Error);
  }
};

const setScaleScaling = async (
  scaling: number,
  onError: (error: Error) => void
) => {
  try {
    const response = await fetch('/api/admin/scale/scaling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scaling),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
      );
    }
  } catch (error) {
    onError(error as Error);
  }
};

const cleanStart = async (onError: (error: Error) => void) => {
  try {
    const response = await fetch('/api/admin/clean/start', {
      method: 'POST',
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
      );
    }
  } catch (error) {
    console.log('on error');
    onError(error as Error);
  }
};

const cleanStop = async (onError: (error: Error) => void) => {
  try {
    const response = await fetch('/api/admin/clean/stop', {
      method: 'POST',
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Server antwortete mit Statuscode ${response.status} ${response.statusText}:\n${body}`
      );
    }
  } catch (error) {
    onError(error as Error);
  }
};

export { tareScale, setScaleScaling, cleanStart, cleanStop };
