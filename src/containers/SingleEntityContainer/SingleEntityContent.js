import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from '../../components/ArticleHeader';
import entityHeading from '../../utils/entityHeading';

const SingleEntityContent = ({
  baseUrl,
  data,
  render,
  executeMutation,
  isEdit,
  renderDeleteButton
}) => {

  const heading = isEdit ? `Editing ${entityHeading(data)}` : entityHeading(data);

  return (
    <div>

      <ArticleHeader
        baseUrl={baseUrl}
        article={{
          _id: data._id
        }}
        heading={heading}
        showEditButton={!isEdit}
        onDeleteArticle={() => executeMutation()}
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
