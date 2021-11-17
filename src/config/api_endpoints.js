const API_ENDPOINTS = {
  experiments: "/experiments",
  train: "/train",
  remove: (runId) => `/delete_run/${runId}`,
};

export default API_ENDPOINTS;