#![bin]

extern console

import 'download-git-repo' => download

await download('github:kaoscript/highlight-vscode', './vscode_extensions/language-kaoscript', {
	shallow: true
})

await download('github:michaelgmcd/vscode-language-babel', './vscode_extensions/language-javascript', {
	shallow: true
})

await download('github:zokugun/theme-zokugun-vscode', './vscode_extensions/theme-zokugun', {
	shallow: true
})


await download('github:jolaleye/horizon-theme-vscode', './vscode_extensions/theme-horizon', {
	shallow: true
})