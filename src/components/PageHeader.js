import React from 'react';

function PageHeader({pageName}){
  return (
    <p className="bg-indigo-600 text-white text-2xl px-8 py-4">{pageName}</p>
  )
}

export default PageHeader