const tareScale = async () => {
  await fetch('/admin/scale/tare', {
    method: 'POST',
  });
};

const setScaleScaling = async (scaling: number) => {
  await fetch('/admin/scale/scaling', {
    method: 'POST',
    headers: {
      'Content-Type': 'appliation/json',
    },
    body: JSON.stringify(scaling),
  });
};

const cleanStart = async () => {
  await fetch('/admin/clean/start', {
    method: 'POST',
  });
};

const cleanStop = async () => {
  await fetch('/admin/clean/stop', {
    method: 'POST',
  });
};

export { tareScale, setScaleScaling, cleanStart, cleanStop };
