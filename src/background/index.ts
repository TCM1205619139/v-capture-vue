let color = '#3aa757'

chrome.runtime.onInstalled.addListener(() => {
  console.log(`background had installed!`, chrome)
  chrome.storage.sync.set({ color })
  console.log('Default background color set to %cgreen', `color: ${color}`)
});
