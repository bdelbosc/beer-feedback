# beer-feedback

## About

Beer feedback aims to provide the quick and detailed beer evaluation that home brewers deserve.

The evaluation is based on the BJCP Scoresheet and should be familiar to any BJCP Judge.

Evaluations can be done on any beer you drink, but they can also be used for a contest.

By comparing your evaluation with others, you can improve your judging skills.

**This is a work in progress**

## UI

### User

- Create
    - name
    - rank
    - secret
    created:
    - uuid

### Beer
- Create
    - beer name
    - category subcategory
    - special ingredients
    - brewer/brewery
    - ABV
    - IBU
    - OG
    - FG
    - URL
    - creation date
    - comment
    constraint: uniq(brewer, beer name)
    created:
    - buuid beer uniq id
    - created date
    - author    
    
- Search fulltext:
    - on all text fields

- Result list:
    - line: CAT, beer name

- View Beer:
    - all fields
      actions: 
        - View Evaluations
        - Evaluate
        - Update (if author or admin)
        - Delete (if author or admin)


### Evaluation

state: 
1. draft: some required fields are missing
2. filled: all required fields are filled, can be edited to add more feedback
3. validated: user acknowledge the evaluation, can be edited to find a consensus
4. completed: read only

5. uncompleted: missing fields, no user acknowledge


- Create
    - buid if done from a beer
    - flight and entry id if done from a contest
    - state = draft

- update AAFMO objects

    
    
    
### Admin home page

### Evaluation edition

For an entry fill all the sections:
- Aroma
- Appearance
- Flavor
- Mouthfeel
- Overall Impression

Provide feedback on what is missing (malt, core ...).

### Evaluation rendering




### Contest
 
## Technical Overview

Constraint:
- 0 installation on client side
- Work on any smartphone or computer with a recent browser
- Contest may happen in a place without internet connection
- 0 cloud

Design choices:
- Single Page Application
- Server should be able to run on RPI providing a Wifi AP
- Websocket
- OpenAPI
 
Technical solution:
- Use Svelte for UI
- Use Plotly sunburst to pickup aromas and flavors
- Use MongoDB for storage
- Use VertX 


