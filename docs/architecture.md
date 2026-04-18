# Architecture

## Folder Structure

/src
  /components
  /pages
  /hooks
  /services
  /store
  /utils
  /styles

## Data Flow

UI → Hook → Service → API

- Components NEVER call APIs directly
- All fetch logic goes through hooks
- Services handle API endpoints

## State Strategy

- Local state for UI
- Shared logic via hooks
- No global state library (keep lightweight)

## Design System

- Spacing: 8px grid
- Typography: Inter / System font stack
- Colors: Neutral + subtle accent
- Dark mode supported
