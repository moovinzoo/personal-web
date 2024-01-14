# Quick start

1.  **Start developing**
```shell
docker-compose up develop # Running at http://localhost:8000
```

2.  **Build**
```shell
docker-compose run build
```

2.  **Cleanup build productions**
```shell
docker-compose run clean
```

# TODO

## Implementation
- [ ] Improve displaying subdirectories in index to show number of posts inside
- [ ] Add markdown linter to add on pre-commit procedure inside
- [o] Modify URI/slug
  - [X] Append /archieve in the front of to all post URI
  - [X] Creating each pages with excluding following /index in node
  - [ ] Excluding following /index in links
- [ ] Improve post page

## In-the-middle
- [X] Enable tagbar in .mdx
  - [X] Write down extention of Universal Ctags for .mdx as vimwiki
  - [X] Add vim-gutentags plugin to automatical refreshing the index
- [ ] Improve pre-commit logic via Husky not to manage script out-of-box
- [ ] Enable Gatsby local functionality

## Productivity
- [o] Enable vim-wiki's markdown checkbox toggling feature
  - [X] Change vim-wiki's keymap from <C-Space> to <Leader>
  - [X] Change vim-wiki config to recognize all md/mdx files
- [ ] (Postponed) Java dev-environment setup
  - [ ] Setup LSP
