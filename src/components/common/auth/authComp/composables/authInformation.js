import { ref } from 'vue';

export const useAuthInformation = (closeClue) => {
  const authInformation = {
    name: ref(''),
    email: ref(''),
    password: ref(''),
    repeatPassword: ref(''),
    updateParameter(parameterName, newValue) {
      this[parameterName].value = newValue;
    }
  };
  const updateParameter = (parameterName, newValue) => {
    authInformation.updateParameter(parameterName, newValue);
    if (authInformation[parameterName].value) closeClue();
  };
  return { authInformation, updateParameter };
};
