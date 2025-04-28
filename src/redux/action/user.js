import axios from "axios";
import {
  btnLoadingStart,
  forgotFail,
  forgotSuccess,
  getUserFail,
  getUserProfileFail,
  getUserProfileSucces,
  getUserSuccess,
  loadingStart,
  loginFail,
  loginSuccess,
  photoUpdateFail,
  photoUpdateSuccess,
  registerFail,
  registerSuccess,
  resetFail,
  resetSuccess,
  resumeUpdateFail,
  resumeUpdateSuccess,
  SkillAddFail,
  skillAddSuccess,
  SkillremoveFail,
  skillremoveSuccess,
  updateFail,
  updateSuccess,
} from "../reducer/userReducer";
import Cookies from "js-cookie";
import { getAllCompany } from "./company";

//registeruser
export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/register", formdata);

    Cookies.set("token", data.token, { expires: 10, secure: true, path: "/" });
    dispatch(registerSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

//loginuser
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/login", { email, password });

    Cookies.set("token", data.token, { expires: 10, secure: true, path: "/" });

    dispatch(loginSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

//getuser
export const getUser = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get(
      "/api/user/myprofile?token=" + Cookies.get("token")
    );

    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.response.data.message));
  }
};

//forgotpassword
export const forgotPassword = (email, setEmail) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/forgot", { email });

    dispatch(forgotSuccess(data));
    setEmail("");
  } catch (error) {
    dispatch(forgotFail(error.response.data.message));
  }
};

//resetpassword
export const resetPassword =
  (password, token, setPassword) => async (dispatch) => {
    try {
      dispatch(btnLoadingStart());

      const { data } = await axios.post("/api/user/reset?token=" + token, {
        password,
      });

      dispatch(resetSuccess(data));
      setPassword("");
    } catch (error) {
      dispatch(resetFail(error.response.data.message));
    }
  };

//updatephoto
export const updatePhoto = (formdata) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.post(
      "/api/user/update/profilepic?token=" + Cookies.get("token"),
      formdata
    );

    dispatch(photoUpdateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(photoUpdateFail(error.response.data.message));
  }
};

//updateprofile
export const updateProfile = (name, phoneNumber, bio) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/user/update/info?token=" + Cookies.get("token"),
      { name, phoneNumber, bio }
    );

    dispatch(updateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(updateFail(error.response.data.message));
  }
};

//updateresume
export const updateResume = (formdata) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.post(
      "/api/user/update/resume?token=" + Cookies.get("token"),
      formdata
    );

    dispatch(resumeUpdateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(resumeUpdateFail(error.response.data.message));
  }
};

//addskill
export const AddSkill = (skill) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/user/skill/add?token=" + Cookies.get("token"),
      { skill }
    );

    dispatch(skillAddSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(SkillAddFail(error.response.data.message));
  }
};


//removeskill
export const removeSkill = (skill) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.delete(
      "/api/user/skill/remove?token=" + Cookies.get("token") + "&skill=" + skill
    );

    dispatch(skillremoveSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(SkillremoveFail(error.response.data.message));
  }
};


//getuserprofile
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get(
      "/api/user/profile?token=" + Cookies.get("token") + "&id=" + id
    );

    dispatch(getUserProfileSucces(data));
  } catch (error) {
    dispatch(getUserProfileFail(error.response.data.message));
  }
};