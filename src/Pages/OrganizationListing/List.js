import React from "react";

export function List({orgName, repos, isFetching, orgNotFound, open_repo_detail_page, handleSortBy, sortBy}) {
  if (isFetching) return <p>Loading...</p>;
  if (!orgName) return <p>Search for an Org</p>;
  if (orgNotFound) return <p>Org not found</p>;
  if (!repos.length) return <p>Org found but no repos</p>;

  return (
    <div>
      <div className="flex justify-between bg-gray-200 p-2">
        <p className="text-2xl">Search Result</p>
        <div className="space-x-2">
          <label>SortBy</label>
          <select
            value={sortBy}
            onChange={handleSortBy}
            className="w-32 py-2 px-2"
          >
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="pushed">Pushed</option>
            <option value="full_name">full Name</option>
          </select>
        </div>
      </div>
      <ul className="border even:border-b-2">
        {repos.map(repo =>
          <li
            key={repo.id}
            className="cursor-pointer hover:bg-slate-50 py-2 border-b px-2"
            onClick={() => open_repo_detail_page(repo)}>{repo.name}</li>)}
      </ul>
    </div>
  );
}