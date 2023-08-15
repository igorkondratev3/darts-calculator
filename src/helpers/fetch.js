export const deleteRefreshTokenFromDB = async (refreshToken) => {
  try {
    await fetch(`${import.meta.env.VITE_BACKEND_URI}/refreshToken`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${refreshToken}`
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export async function getData(player, usersStore) {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/`;
  const fetchParams = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${usersStore.users[player]?.token || ''} ${
        usersStore.users[player]?.refreshToken || ''
      }`,
      'Content-Type': 'application/json'
    }
  };
  let response;
  let json;

  try {
    response = await fetch(URI, fetchParams);
    json = await response.json();
    return { response, json };
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка сервера при получении статистики');
  }
}

export async function setData(player, usersStore, payload) {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/statistic/`;
  const fetchParams = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      authorization: `Bearer ${usersStore.users[player]?.token || ''} ${
        usersStore.users[player]?.refreshToken || ''
      }`,
      'Content-Type': 'application/json'
    }
  };
  let response;
  let json;

  try {
    response = await fetch(URI, fetchParams);
    json = await response.json();
    return { response, json };
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка сервера при получении статистики');
  }
}

export async function changeData(player, usersStore, payload) {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/user/`;
  const fetchParams = {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      authorization: `Bearer ${usersStore.users[player]?.token || ''} ${
        usersStore.users[player]?.refreshToken || ''
      }`,
      'Content-Type': 'application/json'
    }
  };
  let response;
  let json;

  try {
    response = await fetch(URI, fetchParams);
    json = await response.json();
    return { response, json };
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка сервера при изменении параметров');
  }
}

export async function deleteData(player, usersStore) {
  const URI = `${import.meta.env.VITE_BACKEND_URI}/user/`;
  const fetchParams = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${usersStore.users[player]?.token || ''} ${
        usersStore.users[player]?.refreshToken || ''
      }`
    }
  };
  let response;
  let json;

  try {
    response = await fetch(URI, fetchParams);
    json = await response.json();
    return { response, json };
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка сервера при удалении');
  }
}

export const checkCustomError = async (json, response) => {
  if (json && Object.hasOwn(json, 'error')) {
    console.error(json.error);
    throw new Error(json.error);
  }

  if (!json || (!response.ok && !Object.hasOwn(json, 'error')))
    throw new Error('Не удалось обоработать данные');
};
