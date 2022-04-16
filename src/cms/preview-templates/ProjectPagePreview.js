import React from 'react'
import PropTypes from 'prop-types'
import ProjectTemplate from "../../templates/project-template";

const ProjectPagePreview = ({entry, widgetFor, widgetsFor, getAsset}) => {
    const imageUrls = widgetsFor('galleryImages')
        .map(img => img.get("data"))
        .map(url => getAsset(url).toString())
        .toArray();

    return <ProjectTemplate
        content={widgetFor('body')}
        tags={entry.getIn(['data', 'tags'])}
        title={entry.getIn(['data', 'title'])}
        participants={entry.getIn(['data', 'participants'])}
        gallery={imageUrls}
        credits={entry.getIn(['data', 'credits'])}
    />;
};

ProjectPagePreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
};

export default ProjectPagePreview
