export const getData = () => {
  const data = JSON.parse(localStorage.getItem("tableData"));
  const confirmedData = data ? data : localStorage.setItem("tableData" , JSON.stringify([]))
  return confirmedData;
};
export const updateData = (newData) => {
    console.log(newData)
  const data = JSON.parse(localStorage.getItem("tableData"));
  const updatedData = [...data, newData];
  localStorage.setItem("tableData", JSON.stringify(updatedData));
  return;
};
export const deleteOne = (id) => {
  const data = JSON.parse(localStorage.getItem("tableData"));
  const updatedData = data.filter((user) => user.id !== id);
  localStorage.setItem("tableData", JSON.stringify(updatedData));
  return;
};
export const updateOne = (id, updatedUserData) => {
  const data = JSON.parse(localStorage.getItem("tableData"));
  const updatedData = data.map((user) =>
    user.id === id ? { ...user, ...updatedUserData, id: user.id } : user
  );
  localStorage.setItem("tableData", JSON.stringify(updatedData));

  return;
};
