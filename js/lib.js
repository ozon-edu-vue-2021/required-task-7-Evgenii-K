export function sortBy (name) {
  return (a, b) => a[name] > b[name] ? 1 : -1
}

export async function listApi() {
  try {
    const res =  await fetch('../data.json');
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}