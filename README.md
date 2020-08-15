# beer-feedback

## About

`beer-feedback` is intended to provide a quick and detailed assessment of the beer that homebrewers deserve.

It can be used wherever there is a beer and a smartphone
(Internet is required for the first time to download the app as well as to share your review).

The evaluation is based on the [BJCP Scoresheet](https://dev.bjcp.org/news/structured-scoresheets-for-aha-nhc/) and should be familiar to [BJCP](https://dev.bjcp.org/) Judges.

The result is a PDF document that can be saved and shared like any PDF document.

## Try it

There is nothing to setup, use your smartphone or any browser:

http://beer-feedback.surge.sh/

Fill out all the forms until there is no more red tab titles, then click the PDF button.

## Design choices

- 0 installation
- 0 cloud
- Work on any smartphone or computer with a recent browser

Technical choices:
- Single Page Application or [SPA](https://en.wikipedia.org/wiki/Single-page_application)
- [Svelte](https://svelte.dev/) UI
- Use [Plotly Sunburst](https://plot.ly/javascript/sunburst-charts/) to pickup aromas and flavors

## Disclaimer 

This application is just a prototype and is not done for competition of any sort.

This application uses [Beer Judge Certification Program](https://bjcp.org/) terms and derivative output of the 2015 BJCP Style Guide.
This is only for personal educational purpose.

The BJCP data or any derivative output are protected by the BJCP Copyright and should not be marketed for profit
or integrated or embedded in websites without the BJCP agreement.

The most current version of the BCJP Style Guide can be found on the [BJCP web site](https://www.bjcp.org/).

