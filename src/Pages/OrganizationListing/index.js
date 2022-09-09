import React from 'react';
import PageHeader from "../../components/PageHeader";
import {List} from "./List";


function OrganizationListing(props) {
  return (
    <div className="space-y-4">
      <PageHeader pageName="Github Organization Explorer"/>
      <div className="px-4">
        <input
          placeholder='Search for Org. e.g. github'
          onChange={props.handleChange}
          value={props.orgName}
          className="border-solid border-2 py-2 px-w-full"
          autoFocus
        />
        <div className="border-solid border-0 my-8">
          <List
            orgName={props.orgName}
            open_repo_detail_page={props.open_repo_detail_page}
            orgNotFound={props.orgNotFound}
            repos={props.repos}
            handleSortBy={props.handleSortBy}
            isFetching={props.isFetching}
            sortBy={props.sortBy}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizationListing;