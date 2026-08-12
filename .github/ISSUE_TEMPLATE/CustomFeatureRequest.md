---
name: Feature Request
title: '[FEATURE]: '
about: 'Request a new feature or enhancement here!'
labels: ''
assignees: 
  - Krittameth
  - Nattikorn
  - Apitawan
type: feature
body:
  - type: input
    id: problem-statement
    attributes:
      label: Problem Statement
      description: What problem or friction point does this feature solve?
    validations:
      required: true
  - type: input
    id: proposed-solution
    attributes:
      label: Proposed Solution
    validations:
      required: true
  - type: textarea
    id: criteria
    attributes:
      label: Acceptance Criteria
      description: What proves this feature is already fully functional
      placeholder: |
        - Must have sorting
        - Must be reusable
    validations:
      required: true
  - type: textarea
    id: note
    attributes:
      label: Additional Notes
      placeholder: ex. not db required, styling first then code, etc
---
