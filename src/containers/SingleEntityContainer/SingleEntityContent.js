import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import entityHeading from '../../utils/entityHeading';
import { getPressCategoryById } from '../../helpers';

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

  let category;

  if (entityCollection === 'press' && data.categoryId) {
    category = getPressCategoryById(data.categoryId).TEXT;
  }

  return (
    <div>

      <PageHeader
        baseUrl={baseUrl}
        entityCollection={entityCollection}
        entity={{
          _id: data._id,
          author: data.author,
          categoryId: data.categoryId,
          releaseDate: data.releaseDate,
          createdAt: data.createdAt
        }}
        heading={heading}
        category={category}
        renderEditButton={!isEdit}
        onDeleteEntity={() => executeMutation()}
        renderDeleteButton={renderDeleteButton}
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
