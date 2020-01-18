import React from 'react';
import PropTypes from 'prop-types';
import ArticleHeader from '../../components/ArticleHeader';

const SingleEntityContent = ({
  baseUrl,
  data,
  component,
  executeMutation,
  renderEditLink,
  renderDeleteButton
}) => (
    <div>

      <ArticleHeader
        baseUrl={baseUrl}
        article={{
          _id: data._id
        }}
        heading='test heading'
        showEditButton={renderEditLink}
        onDeleteArticle={() => executeMutation()}
        showDeleteButton={renderDeleteButton}
      />

      {component({
        ...data
      })}

    </div>
);

SingleEntityContent.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node
  ]).isRequired,
  executeMutation: PropTypes.func,
  renderEditLink: PropTypes.bool,
  renderDeleteButton: PropTypes.bool
};

SingleEntityContent.defaultProps = {
  executeMutation: () => {},
  renderEditLink: false,
  renderDeleteButton: false
};

export default SingleEntityContent;
