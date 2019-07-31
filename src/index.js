import { init as initContentfulExtension } from 'contentful-ui-extensions-sdk'
import EasyMDE from 'easymde'
import debounce from 'lodash/debounce'

import 'easymde/dist/easymde.min.css'
import './style.css'

initContentfulExtension(extension => {
  console.log(extension)
  const editor = document.getElementById('editor')
  const initialValue = extension.field.getValue()

  if (initialValue) {
    editor.innerHTML = initialValue
  }

  const updateFieldValue = debounce(() => {
    extension.field.setValue(easyMDE.value())
  }, 200)

  const easyMDE = new EasyMDE({
    element: editor,
    onToggleFullScreen: isFullscreen => {
      if (!isFullscreen) {
        return document.exitFullscreen()
      }
      document.documentElement.requestFullscreen()
    },
  })

  easyMDE.codemirror.on('change', updateFieldValue)

  easyMDE.codemirror.on('focus', () => {
    extension.window.startAutoResizer()
  })
})
