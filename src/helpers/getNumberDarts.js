export const getNumberDarts = async (numberDarts) => {
  numberDarts.showModal();
  const promise = new Promise((resolve) => {
    numberDarts.children[0].addEventListener(
      'click',
      function hadler(event) {
        if (event.target.nodeName === 'BUTTON') {
          numberDarts.children[0].removeEventListener('click', hadler);
          resolve(Number(event.target.innerHTML));
        }
      }
    );
  });
  const endNumberDarts = await promise;
  numberDarts.close();
  return endNumberDarts;
};