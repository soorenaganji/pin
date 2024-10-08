import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useReload } from "../../context/ReloadContext";
import Modal from "../modules/FormModal";
import { updateOne ,getData  } from "../../api/api";
const EditPage = () => {
  const { userEmail } = useParams(); // Assuming the URL is /edit/:userEmail
  const [formData, setFormData] = useState(null);
  const { setShouldBeReloaded } = useReload();
  useEffect(() => {
    const data = getData();
    const userToEdit = data.find((user) => user.id == userEmail);
    if (userToEdit) {
      setFormData(userToEdit);
      setShouldBeReloaded(true)
    }
  }, [userEmail]);

  const handleSave = (updatedData) => {
    updateOne(formData.id, updatedData);
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <Modal
      isOpen={true}
      onClose={() => window.history.back()}
      onSave={handleSave}
      initialData={formData} // Pass the initial data to the modal
    />
  );
};

export default EditPage;
