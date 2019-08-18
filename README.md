# EasyMDE for Contentful

Integrates the [EasyMDE markdown editor](https://easymde.tk/) as [extension into the Contentful admin UI](https://www.contentful.com/developers/docs/extensibility/ui-extensions/)

## Features

* Works fine with MD and MDX
* Closer to your favorite code editor
* Better syntax highlighting, especially when using MDX
* Side by side preview
* Full screen editing
* Hotkeys like <kbd>Tab</kbd> for indent, <kbd>Shift</kbd> + <kbd>Tab</kbd> for outdent
* Automatically trims spaces from empty lines to avoid confusing the MDX renderer
* Upcoming: Editor markdown cheat sheet
* Upcoming: Contentful asset selector / listing

## Quick Install

It is already deployed to `https://axe312ger.github.io/contentful-extension-easymde/` so all you have to do is:

* Create new extension within Contentful UI
* Pick any name
* Field types: Select `Text` (Deselect any others. It won't work!)
* Hosting: Select `src`
* Paste the following url to use the predeployed version of the UI extension: `https://axe312ger.github.io/contentful-extension-easymde/`

## Custom install

Gives you full control, but you need to merge updates in on your own.

* Fork it
* Change it if needed (See [Development](#Development))
* Deploy it (`npm run deploy` deploy it on GitHub pages like the demo)
* Follow quick install or use the Contenful cli (https://www.contentful.com/developers/docs/extensibility/ui-extensions/hosting/)

## Development

* Clone repository
* Run `npm run dev`
* Follow quick install, but use `http://localhost:1234/` as Contentful src.
* Hack