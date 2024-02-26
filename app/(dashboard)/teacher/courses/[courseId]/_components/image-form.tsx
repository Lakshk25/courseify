import FileUpload from '@/components/ui/file-upload'
import React from 'react'

const ImageForm = () => {
  return (
    <div>
        <FileUpload
        endpoint="courseImage"/>
    </div>
  )
}

export default ImageForm