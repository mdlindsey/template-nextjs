# NextJS Template

Common tooling built with TypeScript, Redux, and Styled Components. Outlined use cases include styles/themes, branding, redux persistence, Google Analytics, and SSO/OAuth. Developer experience (DX) enhancements include testing, linting, and relative path imports. Boilerplate is provided for Docker, Terraform, GitHub Actions, and more. Example favicon and other branding artifacts were generated using [RealFaviconGenerator](https://realfavicongenerator.net/).

Authentication functionality can be accompanied by [NestJS Template](https://github.com/mdlindsey/template-nestjs).

## Prerequisites

See explanations in [Notes](#notes)

- `nodejs >= v12`
- `nextjs >= v12.1`
- `next-redux-wrapper@v6.*.*`

## Upcoming Improvements

- Code coverage
- Feature branching
    - `template/base`
    - `template/oauth`
    - `template/tailwind`

## Docker Shortcuts

```
docker build --platform=linux/amd64 -t nextjs-image .
docker run --name nextjs-local -p 3000:3000 --platform=linux/amd64 nextjs-image:latest
```

## Deploying to AWS

Terraform and GitHub Actions are provided for AWS App Runner which allows deployments to run automatically when a new image is pushed to the ECR repository.

The Terraform located in `infrastructure/*` declares resources for both ECR and App Runner.

The GitHub Action located in `.github/workflows/ecr.yml` is responsible for building and pushing the image to ECR at which point App Runner will detect the changed image and deploy a new version automatically.

The same values used in the Terraform `variables.tf` must be passed to GitHub Secrets for the build to work.

## SSO/OAuth

OAuth functionality (including redirect URLs, brand icons/colors, etc) is provided by the [NestJS Template](https://github.com/mdlindsey/template-nestjs). You can use MockAuthAPI to return non-functional placeholders for these providers prior to integrating the API. If you do not need this functionality, remove the following:

- `api-service/*`
- `pages/me/*`
- `pages/login/*`
- `pages/signup/*`
- `pages/logout/*`
- `pages/oauth/[vendor].tsx`
- `components/Button/OAuth.tsx`
- `hooks/* -> requireLogin, bypassIfLoggedIn`

## Notes

- At the time of writing this, `next-redux-wrapper` released a breaking change in `v7.*.*` with no mention in the [changelog](https://github.com/kirill-konshin/next-redux-wrapper/releases). Upgrading beyond `v6.*.*` will cause breakage as `ctx.store` will always be `undefined`. There is vague mention of a new syntax to achieve this in the [README](https://github.com/kirill-konshin/next-redux-wrapper#app).

- Babel has been replaced with SWC now that [support for `styled-components` has arrived](https://github.com/vercel/next.js/discussions/30174). As a result, custom `.babelrc` configuration has been replaced with the `compiler.styledComponents` option in `next.config.js`. If you require Babel configurations not currently supported by SWC you can [include your own `.babelrc` which will disable SWC](https://nextjs.org/docs/messages/swc-disabled).

- NodeJS prior to version 12 has issues with `TextEncoder` which is included in `react-dom` and can cause client-side breakage; `Dockerfile` configuration currently uses NodeJS version 14.
