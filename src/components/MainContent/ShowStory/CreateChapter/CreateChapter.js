import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import ChapterForm from './../../shared/ChapterForm'
import { createChapter } from './../../../../api/chapter'
import Button from 'react-bootstrap/Button'

const CreateChapter = (props) => {
  // add state to check if the user wants to show the chapter form
  const [chapterFormShow, setChapterFormShow] = useState(false)
  // set a state variable for the chapter data
  const [chapter, setChapter] = useState({ name: '', body: '' })
  // set a state variable to check if the story has been submitted
  const [isSubmited, setIsSubmited] = useState(false)

  const handleChange = (event) => {
    event.persist()
    setChapter(prevChapter => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedChapter = Object.assign({}, prevChapter, updatedField)
      return editedChapter
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    createChapter(chapter.name, chapter.body, props.story, props.user)
    setIsSubmited(true)
  }

  // handler function for the add chapter button
  const showChapterForm = (event) => {
    event.preventDefault()
    setChapterFormShow(true)
  }

  if (chapterFormShow) {
    return (
      <ChapterForm
        chapter={chapter}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
  }
  if (isSubmited) {
    console.log(isSubmited)
    return <Redirect to={'/content'}/>
  }
  return (
    <Fragment>
      <Button onClick={showChapterForm} variant="primary">Add Chapter</Button>
    </Fragment>
  )
}

export default withRouter(CreateChapter)
