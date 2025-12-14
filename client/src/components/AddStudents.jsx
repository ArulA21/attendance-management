import React, { useState } from 'react';
import toast from 'react-hot-toast';
export const AddStudents = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: '',
    roll: '',
    className: ''
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.roll || !form.className) {
      toast.error('Please fill all fields');
      return;
    }

    if (editId) {
      setStudents(
        students.map((s) =>
          s.id === editId ? { ...s, ...form } : s
        )
      );
      toast.success('Student updated successfully');
      setEditId(null);
    } else {
      setStudents([
        ...students,
        { id: Date.now(), ...form }
      ]);
      toast.success('Student added successfully');
    }

    setForm({ name: '', roll: '', className: '' });
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      roll: student.roll,
      className: student.className
    });
    setEditId(student.id);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    toast.info('Student deleted');
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
                <tr key={student.id} className="border-t">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.roll}</td>
                  <td className="p-3">{student.className}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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
