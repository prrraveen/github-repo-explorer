import React, {useRef, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import OrganizationListing from './Pages/OrganizationListing'
import RepositoryDetail from './Pages/RepositoryDetail';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {debounce} from "lodash";


const GITHUB_ACCESS_TOKEN = process.env.REACT_APP_GITHUB_ACCESS_TOKEN


function App() {
  const navigate = useNavigate();
  const [currentRepo, setCurrentRepo] = useState(null);
  const [orgName, setOrgName] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [orgNotFound, setOrgNotFound] = useState(false);
  const [sortBy, setSortBy] = useState('created');

  async function fetchOrgRepos(orgName, sortBy) {
    setIsFetching(true);
    setRepositories([])
    const url = `https://api.github.com/orgs/${orgName}/repos`;
    try {
      const response = await axios({
        url: url,
        params: {
          sort: sortBy
        },
        headers: {
          "Authorization": `Bearer ${GITHUB_ACCESS_TOKEN}`,
        }
      });

      setOrgNotFound(false);
      setRepositories(response.data);
    } catch (error) {
      if(error.response?.status === 404) {
        setOrgNotFound(true);
      }
    } finally {
      setIsFetching(false);
    }
  }

  const debouncedFetch = useRef(debounce(fetchOrgRepos, 1000)).current

  const handleChange = (event) => {
    const { value: nextValue } = event.target
    setOrgName(nextValue)
    debouncedFetch(nextValue)
  }

  const handleSoryBy = (event) => {
    const { value: nextValue } = event.target
    setSortBy(nextValue)
    fetchOrgRepos(orgName, nextValue)
  }


  function open_repo_detail_page(repo) { //why it should not be an arrow function
    setCurrentRepo(repo)
    navigate('/repo-detail')
  } 


  return (
    <div>
      <Routes>
        <Route path="/"  element={
          <OrganizationListing
            open_repo_detail_page={open_repo_detail_page}
            orgName={orgName}
            handleChange={handleChange}
            repos={repositories}
            isFetching={isFetching}
            orgNotFound={orgNotFound}
            handleSortBy={handleSoryBy}
            sortBy={sortBy}
          />
        }/>
        <Route path="/repo-detail" element={<RepositoryDetail repo={currentRepo} />} />
      </Routes>
    </div>
  );
}

export default App;