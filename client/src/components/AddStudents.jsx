import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { StudentContext } from '../../context/studentContext';
 

export const AddStudents = () => {
  const { students, addStudent, editStudent, deleteStudent } =
    useContext(StudentContext);

  const [form, setForm] = useState({
    name: '',
    roll: '',
    className: ''
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //add
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.roll || !form.className) {
      toast.error('Please fill all fields');
      return;
    }

    if (editId) {
      editStudent(editId, {
        name: form.name,
        roll: Number(form.roll),
        std: Number(form.className)
      });
      setEditId(null);
    } else {
      addStudent({
        name: form.name,
        roll: Number(form.roll),
        std: Number(form.className)
      });
    }

    setForm({ name: '', roll: '', className: '' });
  };

  // EDIT
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      roll: student.roll,
      className: student.std
    });
    setEditId(student._id);
  };

  // DELETE
  const handleDelete = (id) => {
    deleteStudent(id);
  };

  return (
    <div className="max-w-4xl">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded-lg shadow mb-6"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? 'Edit Student' : 'Add Student'}
        </h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="roll"
            placeholder="Roll No"
            value={form.roll}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="className"
            placeholder="Class"
            value={form.className}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 cursor-pointer"
        >
          {editId ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      {/* Student List */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No students added yet
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="border-t">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.roll}</td>
                  <td className="p-3">{student.std}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
