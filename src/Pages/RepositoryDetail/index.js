import PageHeader from "../../components/PageHeader";

function RepositoryDetail({repo}) {
  const {name, description} = repo
    return (
      <div>
        <PageHeader pageName="Repository Detail Page"/>
        <div className="px-8 py-4 space-y-4">
          <div>
            <label className="text-gray-700 text-sm">Name</label>
            <p>{name}</p>
          </div>

          <div>
            <label className="text-gray-700 text-sm">Description</label>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
}

export default RepositoryDetail;