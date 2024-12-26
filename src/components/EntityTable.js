import React from 'react';
import PropTypes from 'prop-types';

const EntityTable = ({ entities, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(entities[0] || {}).map(key => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entities.map(entity => (
          <tr key={entity.id}>
            {Object.values(entity).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
            <td>
              <button onClick={() => onEdit(entity)} className="btn btn-primary btn-sm">
                Edit
              </button>
              <button onClick={() => onDelete(entity.id)} className="btn btn-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

EntityTable.propTypes = {
  entities: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EntityTable;