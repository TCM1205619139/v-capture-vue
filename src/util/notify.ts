enum ExtensionPageType {
  Content = 'content-page',
  Popup = 'popup-page',
  Background = 'background-page',
  Option = 'option-page',
  Tab = 'tab-page',
  Devtool = 'devtool-page',
  Inject = 'inject-page'
}

interface Notify {
  readonly from: ExtensionPageType,
  readonly to: ExtensionPageType
}

export {
  ExtensionPageType,
  Notify
}
