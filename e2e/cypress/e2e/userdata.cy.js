export function uniqueuser() {
  const time = Date.now();
  return {
    username: `user${time}`,
    lastname: `last${time}`,
    email: `email${time}@gmail.com`,
    password: `Sklepzelektronika${time}`,
  };
}
