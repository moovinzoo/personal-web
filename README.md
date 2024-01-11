[![CI](https://github.com/moovinzoo/personal-web/actions/workflows/publish-asset-by-new-tag.yml/badge.svg)](https://github.com/moovinzoo/personal-web/actions/workflows/publish-asset-by-new-tag.yml)

## Quick start

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

## TODO -implementation
- [ ] Improve displaying subdirectories in index to show number of posts inside
- [ ] Add markdown linter to add on pre-commit procedure inside

## TODO -in-the-middle
- [ ] Enable tagbar by chainging file format of all posts mdx -> md to get 

## TODO -productivity
- [X] Enable vim-wiki's markdown checkbox toggling feature
    - [X] Change vim-wiki's keymap from <C-Space> to <Leader>
    - [X] Change vim-wiki config to recognize all md/mdx files
