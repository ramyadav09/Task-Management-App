import React from "react";

const TaskForm = ({
  title,
  setTitle,
  setIsForm,
  description,
  setDescription,
  dueDate,
  setDueDate,
  errorMessages,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col gap-4 mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
    >
      <p className="text-red-500 text-sm">{errorMessages}</p>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Todo Title"
        className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-24 resize-none"
      />
      <div className="relative">
        <label
          htmlFor="due-date"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Due date
        </label>
        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          id="due-date"
          type="date"
          className="w-full p-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 [color-scheme:dark]"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        <span>Add</span>
      </button>
      <button
        type="button"
        onClick={() => setIsForm(false)}
        className="w-full text-center text-gray-300 font-semibold py-3 rounded-xl transition-all duration-300 hover:bg-white/5"
      >
        <span>Cancel</span>
      </button>
    </form>
  );
};

export default TaskForm;
