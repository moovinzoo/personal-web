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

## TODOs
- [o] Make root index
- [o] Make sample indexes in each directory(category)
- [ ] Build links by post hierarchy
    - [ ] Process vimwiki's markdown link to `<a>` link
- [ ] (Postponed) Append posts in the bottom of every category/index page
- [ ] (Postponed) Append subdirectories in the bottom of every category/index page
    - [ ] Count posts in every subdirectory
- [ ] Add markdown linter to add on pre-commit procedure
