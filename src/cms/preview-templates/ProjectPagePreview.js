import React from 'react'
import PropTypes from 'prop-types'
import {ProjectTemplate} from '../../templates/project'

const ProjectPagePreview = ({entry, widgetFor}) => (
    <ProjectTemplate
    content={widgetFor('body')}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
);

ProjectPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ProjectPagePreview
