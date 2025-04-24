import React from 'react';
import { useForm } from 'react-hook-form';
import './styles.css';

const Searchbar = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto p-4">
      <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className={`block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 
              ${errors.search ? 'border-2 border-red-500' : 'border border-gray-300'} 
              focus:outline-none focus:ring-2 
              ${errors.search ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
            placeholder="Search..."
            {...register("search", { required: true })}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
        {errors.search && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            Input should not be empty
          </p>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
