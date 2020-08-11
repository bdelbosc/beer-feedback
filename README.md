# beer-feedback

## About

`beer-feedback` is intended to provide a quick and detailed assessment of the beer that homebrewers deserve.

It can be used wherever there is a beer and a smartphone
(Internet is required for the first time to download the app as well as to share your review).

The evaluation is based on the [BJCP Scoresheet](https://dev.bjcp.org/news/structured-scoresheets-for-aha-nhc/) and should be familiar to [BJCP](https://dev.bjcp.org/) Judges.

The result is a PDF scoresheet.

**This is a work in progress**

## Try it

http://beer-feedback.surge.sh/

Fill out all the forms until there are no more red tab titles, then click the PDF button.
 
## TODO

- Persist the Scoresheet data locally
 
## Design choices

- 0 installation
- 0 cloud
- Work on any smartphone or computer with a recent browser

Technical choices:
- [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application)
- [Svelte](https://svelte.dev/) UI
- Use [Plotly Sunburst](https://plot.ly/javascript/sunburst-charts/) to pickup aromas and flavors
