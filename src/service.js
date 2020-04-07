export async function verifyLogin({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'raman' && password === 'password') {
        resolve();
      } else {
        reject();
      }
    }, 2000);
  });
}
