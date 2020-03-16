import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import entityHeading from '../../utils/entityHeading';

const SingleEntityContent = ({
  baseUrl,
  entityCollection,
  data,
  render,
  executeMutation,
  isEdit,
  renderDeleteButton
}) => {

  const heading = isEdit ? `Editing ${entityHeading(data)}` : entityHeading(data);

  return (
    <div>

      <PageHeader
        baseUrl={baseUrl}
        entityCollection={entityCollection}
        entity={{
          _id: data._id,
          author: data.author,
          releaseDate: data.releaseDate,
          createdAt: data.createdAt
        }}
        heading={heading}
        showEditButton={!isEdit}
        onDeleteEntity={() => executeMutation()}
        showDeleteButton={renderDeleteButton}
      />

      {render({
        ...data
      })}

    </div>
  );
}

SingleEntityContent.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  entityCollection: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired,
  executeMutation: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  renderDeleteButton: PropTypes.bool
};

SingleEntityContent.defaultProps = {
  isEdit: false,
  renderDeleteButton: false
};

export default SingleEntityContent;
