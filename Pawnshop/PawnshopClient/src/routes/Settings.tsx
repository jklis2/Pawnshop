export default function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome in Settings page</h1>
      <p>This is the main Settings page.</p>
      
      <div className="mt-4">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          Select language:
        </label>
        <select id="language" name="language" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="en">English</option>
          <option value="pl">Polish</option>
        </select>
      </div>

      <button
        type="button"
        className="mt-4 bg-blue-500 rounded-md p-4 w-32"
      >
        Save
      </button>
    </div>
  );
}
