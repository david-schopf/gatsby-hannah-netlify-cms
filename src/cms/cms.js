import CMS from 'decap-cms-app'
import uploadcare from 'decap-cms-media-library-uploadcare'
import cloudinary from 'decap-cms-media-library-cloudinary'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import ProjectPagePreview from "./preview-templates/ProjectPagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('projects', ProjectPagePreview);
