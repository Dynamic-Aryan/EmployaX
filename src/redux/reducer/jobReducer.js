import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  jobs: null,
  job: null,
  topSix: null,
  loading: false,
  btnLoading: false,
  locations: null,
  applications: null,
  application: null,
  applicationOfJob: null,
  error: null,
  message: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
    },
    btnLoadingStart: (state) => {
      state.btnLoading = true;
    },
    getAllJobsSuccess: (state, action) => {
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.topSix = action.payload.topSix;
      state.locations = action.payload.locations;
    },
    getAllJobsFail: (state) => {
      state.loading = false;
      state.jobs = null;
    },
    getSingleJobsSuccess: (state, action) => {
      state.loading = false;
      state.job = action.payload;
    },
    getSingleJobsFail: (state) => {
      state.loading = false;
      state.job = null;
    },

    addJobSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    addJobFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
    saveJobSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    saveJobFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
    getSingleJobSuccess: (state, action) => {
      state.loading = false;
      state.job = action.payload;
    },
    getSingleJobFail: (state) => {
      state.loading = false;
      state.job = null;
    },
    getApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload;
    },
    getApplicationsFail: (state, action) => {
      state.loading = false;
      state.applications = null;
    },

    applySuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    applyFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
    updateSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    updateFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },

    getJobofCompanySuccess: (state, action) => {
      state.loading = false;
      state.applicationOfJob = action.payload;
    },
    getJobofCompanyFail: (state) => {
      state.loading = false;
      state.applicationOfJob = null;
    },
    updateAppSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    updateAppFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
    deleteSuccess: (state, action) => {
      state.btnLoading = false;
      state.message = action.payload.message;
    },
    deleteFail: (state, action) => {
      state.btnLoading = false;
      state.error = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  clearError,
  clearMessage,
  btnLoadingStart,
  loadingStart,
  getSingleJobFail,
  getSingleJobSuccess,
   getAllJobsFail,
  getAllJobsSuccess,
  addJobFail,
  addJobSuccess,
  getSingleJobsFail,
  getSingleJobsSuccess,
  saveJobFail,
  saveJobSuccess,
  getApplicationsFail,
  getApplicationsSuccess,
  applyFail,
  applySuccess,
  updateSuccess,
  updateFail,
  getJobofCompanyFail,
  getJobofCompanySuccess,
  updateAppFail,
  updateAppSuccess,
  deleteFail,
  deleteSuccess,
} = jobSlice.actions;

export default jobSlice.reducer;