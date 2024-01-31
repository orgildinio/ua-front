import axios from "axios-base";

export const updateUser = async (user, data) => {
  if (user) {
    const update = await axios.put(`/members/${user._id}`, data);
    return { update };
  }
};

export const updateExperience = async (user, data) => {
  if (user) {
    try {
      return { experience: result.data.data };
    } catch (error) {
      console.log(error);
    }
  }
};

export const createUser = async (user, data) => {
  if (user) {
    const result = await axios.put(`/members/${user._id}`, data);
    return { result };
  }
};

export const changePassword = async (user, data) => {
  if (user) {
    const result = await axios.put(`/members/memberpasswordchange`, data);
    return { result };
  }
};
