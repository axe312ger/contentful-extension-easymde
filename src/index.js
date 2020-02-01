import { init as initContentfulExtension } from 'contentful-ui-extensions-sdk'
import EasyMDE from 'easymde'
import debounce from 'lodash/debounce'
import mdx from '@mdx-js/mdx'

import 'easymde/dist/easymde.min.css'
import './style.css'

const trimContent = content => content.replace(/^\s+$/gm, '').trim()

initContentfulExtension(extension => {
  const editor = document.getElementById('editor')
  const error = document.getElementById('error')
  const status = document.getElementById('status')
  const initialValue = extension.field.getValue()
  let lastValue

  if (initialValue) {
    editor.innerHTML = initialValue
  }

  function updateStatus(value) {
    status.classList.add('show')
    status.innerText = value
    setTimeout(() => status.classList.remove('show'), 5000)
  }

  const updateFieldValue = debounce(() => {
    const trimmedValue = trimContent(easyMDE.value())
    if (trimmedValue !== lastValue) {
      updateStatus('🕵️‍♀️')

      mdx(trimmedValue)
        .then(() => {
          extension.field.setValue(trimmedValue)
          lastValue = trimmedValue
          error.innerText = null
          updateStatus('✅')
          error.style.opacity = 0
        })
        .catch(e => {
          console.error(e)
          error.innerText = e.message
          error.style.opacity = 1
          updateStatus('💔')
        })
    }
  }, 200)

  const easyMDE = new EasyMDE({
    element: editor,
    autofocus: false,
    lineWrapping: false,
    minHeight: '500px',
    spellChecker: false,
    onToggleFullScreen: isFullscreen => {
      if (!isFullscreen) {
        return document.exitFullscreen()
      }
      const doc = document.documentElement
      if (doc.requestFullscreen) {
        doc.requestFullscreen()
      } else if (doc.mozRequestFullScreen) {
        /* Firefox */
        doc.mozRequestFullScreen()
      } else if (doc.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        doc.webkitRequestFullscreen()
      } else if (doc.msRequestFullscreen) {
        /* IE/Edge */
        doc.msRequestFullscreen()
      }
    },
  })

  easyMDE.codemirror.on('change', updateFieldValue)

  easyMDE.codemirror.on('focus', () => {
    extension.window.startAutoResizer()
  })

  easyMDE.codemirror.on('blur', e => {
    const trimmedContent = trimContent(easyMDE.value())
    easyMDE.codemirror.doc.setValue(trimmedContent)
  })
})
