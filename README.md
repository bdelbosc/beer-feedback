# ![Link Beer Feedback](./public/favicon-32x32.png) Beer Feedback

## About

`beer-feedback` is intended to provide a quick and detailed assessment of the beer that homebrewers deserve.

It can be used wherever there is a beer and a smartphone.

The evaluation is based on the [BJCP Scoresheet](https://dev.bjcp.org/news/structured-scoresheets-for-aha-nhc/) and should be familiar to [BJCP](https://dev.bjcp.org/) Judges.

The result is a PDF document that can be shared like any document.

## Try it

There is nothing to install and no account to create, 
just use your smartphone (or any browser) to reach this URL:

http://beer-feedback.surge.sh/

![Link Beer Feedback](./qrcode.png)

Fill out all the forms until there is no more red tab titles, then click the PDF button, read the next section for more details.

Don't forget to [star the project on GitHub](https://github.com/bdelbosc/beer-feedback) if you like it. 

## Usage

1. The first time, you have to give your name and judging rank, this information is persisted in your smartphone and will be part of the final PDF report.

    ![First page](./page-identity.png) 

2. Describe the beer that you want to evaluate, this information is also persisted on your smartphone. 

    ![Beer page](./page-beer.png)

3. Start to fill your scoresheet, there is a tab for each section (Aroma, Appearance, Flavor, Mouthfeel and Overall impression).

    ![aroma tab](./page-aroma.png)

    Use the (+) button to add aromatic
   
    ![aroma wheel](./page-aroma-wheel.png)

    Navigate in the aroma wheel and validate the entry using the check button.
    Then describe the intensity and other aroma properties:

    ![aroma intensity](./page-aroma-intensity.png)

    Validate again, the aroma is added to the list.
  
    You need to add at least one aroma for malt, hops and fermentation,
    then you set the aroma score using the slider, and the section is now completed:
  
    ![aroma completed](./page-aroma-completed.png)
    
    Note that you can click on any aroma to edit the intensity or properties, they can also be deleted using the (x) button on the right.
    
    Now continue with other tabs: Appearance, Flavor, Mouthfeel and Overall.
    
4. Click on PDF, the report is generated on your smartphone there is no data transferred anywhere.
   Here is a PDF example:
    
   [![Pdf](./pdf-export.png)](./scoresheet-20200816-2-10A-Raoul.pdf)

   It is also possible to generate the report when the scoresheet is not yet completed.
  
5. Share the PDF the way you want, if you have a PDF editor you can add a photo of the beer.        


A beer-feedback PDF scoresheet can be loaded (from the beer entry section), this enables to edit the content and produce a new PDF.
   
## Design choices

- 0 installation
- 0 cloud
- Work on any smartphone or computer with a recent browser

Technical choices:
- Single Page Application or [SPA](https://en.wikipedia.org/wiki/Single-page_application)
- [Svelte](https://svelte.dev/) UI
- Use [Plotly Sunburst](https://plot.ly/javascript/sunburst-charts/) to pickup aromas and flavors

## Disclaimer 

This application is a personal project and should not be used in official competition.  

This application uses [Beer Judge Certification Program](https://bjcp.org/) terms and derivative output of the 2015 BJCP Style Guide.
This is only for personal educational purpose.

The BJCP data or any derivative output are protected by the BJCP Copyright and should not be marketed for profit
or integrated or embedded in websites without the BJCP agreement.

The most current version of the BCJP Style Guide can be found on the [BJCP web site](https://www.bjcp.org/).


 

