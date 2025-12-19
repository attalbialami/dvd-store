# 🎬 "ATTALBI ALAMI" DVD store

[![CI/CD Pipeline](https://github.com/attalbialami/dvd-store/actions/workflows/pipeline.yml/badge.svg)](https://github.com/attalbialami/dvd-store/actions/workflows/pipeline.yml)

##  Project Overview
TypeScript CLI app for calculating DVD pricing with promotions.
The project models a small retail scenario for **Back to the Future** DVDs, using clean, modular, and testable architecture.

**Business rules implemented:**
- DVDs of the **Back to the Future** saga:
  - Each DVD costs **15€**
  - Buying **2 different episodes** applies a **10% discount** on all BTTF DVDs
  - Buying **3 different episodes** applies a **20% discount** on all BTTF DVDs
- Other DVDs are priced at **20€**
- Promotion rules can be toggled via the environment variable `ENABLE_PROMOTIONS`.

**Example**
```
New cart...
> Back to the Future 1
> Back to the Future 2
> Back to the Future 3
Total: 36 €
```

## Tech Stack
| Layer | Technology / Package                                           |
|-------|----------------------------------------------------------------|
| Language | TypeScript (ES2020)                                            |
| Runtime | Node.js 23.11.0 (managed with `.nvmrc`)                       |
| CLI | `readline`                                                     |
| Testing | Jest + ts-jest                                                 |
| Lint & Formatting | ESLint + Prettier                                              |
| Dev Tools | ts-node-dev (watch & reload), dotenv for environment variables |


## Architecture principles
- **Layered / DDD-inspired architecture:** `domain` (business logic & entities), `app` (services), `hmi` (CLI)
- **SOLID principles:** Single Responsibility, Open/Closed, Dependency Injection for calculators & rules
- **Strategy Pattern:** Promotion rules are pluggable per saga (`PromotionStrategy`) for future extensibility
- **Feature flags:** Environment variable (`ENABLE_PROMOTIONS`) to toggle discounts
- **Separation of concerns:** Clear boundaries between pricing, promotions, cart management, and CLI
- **Testability:** Modular design, extensive unit tests with high coverage
- **Colored CLI output** using `chalk` for better readability and user experience
- **Type safety & modern JS:** TypeScript (interfaces, types, enums)
- **Code quality:** ESLint + Prettier for consistent style
- **Developer experience:** Scripts for build, test, lint, format, running dev server with auto-reload. Webstorm IDE configured to lint & format on file save
- **Documentation:** Inline comments and this README for clarity
- **Scalable design**: Supports multiple sagas and future promotions easily

## Environment configuration
This project uses environment variables to control certain features, mainly **promotions** in the DVD pricing.

- ### Default `.env` file
A file named `.env` at the root of the project defines default values:
```
ENABLE_PROMOTIONS=
```
- Leaving `ENABLE_PROMOTIONS` empty or `false` disables all promotions.
- Setting `ENABLE_PROMOTIONS=true` activates promotional pricing rules.


- ### Local overrides with `.env.local`
You can create a `.env.local` file to override default variables for your local development environment without committing them to version control:
> **Note:** `.gitignore` already prevents `.env*` files from being committed, so local secrets remain safe.

## Getting Started
- ### Install dependencies & start development CLI (with auto-reload)
```bash
npm run nvm     # use node version from .nvmrc
npm install     # install dependencies
npm run dev     # start dev server with auto-reload
```

- ### Build TypeScript & run compiled JS
```bash
npm run build     # transpile TS to JS in dist/ folder
npm run start     # run compiled JS from dist/ folder
```

- ### Lint & format
```bash
npm run lint            # check lint
npm run lint:fix        # fix lint errors
npm run format:check    # prettier check
npm run format          # prettier fix
```

## Testing
- **Unit tests** cover all domain logic (`movie`, `pricing`, `promotions`) and services (`CartService`)
- **Jest configuration** ensures coverage thresholds: statements 90%, branches 80%, functions 90%, lines 90%
- CLI tests use mock-stdin to simulate user input
- Coverage reports generated in `coverage/index.html`

Run tests with:
```bash
npm run test              # run unit tests
npm run test:coverage     # run unit tests & generate coverage report
```
