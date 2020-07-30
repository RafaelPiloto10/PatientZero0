# Patient Zer0

Patient Zer0 is an interactive simulation that gives you the power in controlling the COVID-19 response for the United States.

[Play now!](https://cssi-patient-zer0.glitch.me/)

## Mission:

The goal of Patient Zer0 is to help users understand the importance of protective measures against COVID-19 by visualizing their impact through a simulation where the user has the power.

## Disclaimer:

This simulation is in no way reflective of real world predictions. The simulation is elementary in nature meaning that, although the data and constants used in this simulation are accurate to data gathered in the real world, nature is unpredictable and this model only considers very small factors of the pandemic.

Please refer to the [CDC Guidelines on COVID-19](https://www.cdc.gov/coronavirus/2019-ncov/index.html) for more accurate information.

## Assumptions:

Assumptions the simulation makes include -

- Everyone in the United States is earning the median household income of approx. \$60K.
- Everyone is given and uses PPE at user given times and the impact it makes is permanent.
- The virus spread is modeled using an exponential function with varying spread rates.
- Those who recover cannot be infected again.
- Air travel is the only form of travel across States.
- 5% of Citizen income is taken as tax to the COVID-19 response budget.
- The recovery time for the virus is strictly 14 days. Anyone who does not die to the virus after 14 days has recovered.
- There is no travel between countries.

## Presentation

[Diego] What did you originally set out to build? Who is it for?

- We set out to build a game to help users understand the importance of protective measures against COVID-19 by visualizing their impact through a simulation where the user has the power to control how the country responds to COVID-19. Our simulation is targeted towards the general population.

[Rafael] What was the hardest part? How did you get past the hardest part?

- The hardest part about the project was trying to simulate nature itself, which is very unpredictable. We wanted to create a simulation that was as accurate as possible while maintaining as much simplicity as possible. So we ended up only including the factors that we observed to have the most impact.

[Diego] How did the project evolve over time as you worked on it?

- Our project started out with a simple virus spread model. We continued to expand our project by adding more visual and comprehendable feedback so that the user could have a better understanding of how the virus is affecting the country. Finally, we added user functionality, so that the user can respond to the virus.

[Rafael] What bugs do you have left that are still "bugging" you?

- Fortunately, after playing debugger so often in our meets, we were able to get rid of any game breaking bugs. Although not a bug, the simplicity of our simulation overlooks a lot of factors of the COVID-19 pandemic, which in some cases can give it odd behavior.

[Diego] If you had more time, what other features / ideas would you add?

- We would like to add more user responses to the pandemic as well as include more real-world factors in the model. The idea of training a machine learning model to this simulation and seeing how the model would respond to the virus is also intriguing.

## TODO:

- None ATM

## Known Bugs:

- No known bugs

## Change log:

- (7/28) Implemented graph & added styling
- (7/28) Fixed exponential recovery bug by changing spread rate over time - Rafael
- (7/28) Implemented buttons outside the map that can be programmed to affect the simulation - Diego
- (7/27) Implemented circles that follow the map position for each state to react to how infected they are with COVID - Diego
- (7/27) Implemented Mappa.js to load a map of the United States w/ the ability to use the location information - Diego
- (7/26) Completed elementary virus spread simulation using an exponential function as the model w/ features of keeping track of how many people are infected/recovered/dead- Rafael
- (7/26) Implemented time simulation & started simulating virus spread model - Rafael
- (7/25) Created state data and gathered resources for further review - Rafael
- (7/25) Populated the state & country class with extensive comments and documentation. Updated TODO list & added Resources section in README.md - Rafael
- (7/24) Split classes into separate files to follow OOP practices. Created Game & State class (check index.html for short description). - Rafael
- (7/24) Created basic template - Diego & Rafael

## Resources:

- [Wired - How Fast Does a Virus Spread?](https://www.wired.com/story/how-fast-does-a-virus-spread/)
- [Population estimate gathered from 2020 Census estimates](https://worldpopulationreview.com/state-rankings/state-densities)
- [State latitude and longitude data](https://gist.github.com/meiqimichelle/7727723)
- [United States spending in Coronavirus](https://www.washingtonpost.com/business/2020/04/15/coronavirus-economy-6-trillion/)
- [CDC PPE Burn Rate Research Paper](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7225214/)
- [Tracking Patient Zero in the USA](https://www.theguardian.com/world/2020/may/26/us-coronavirus-patient-zero-100000-deaths)
- [Air Travel Data](https://www.nationalgeographic.com/science/2020/01/how-coronavirus-spreads-on-a-plane/#close)
- [How population density affects virus spread](https://www.sciencedirect.com/science/article/pii/S0025556413001235)
- [Modeling virus spread with population density](https://www.sciencedirect.com/science/article/pii/S0025556413001235)
- [Median Household income in US](https://www.investopedia.com/personal-finance/what-average-income-us/)
- [5% of taxes are for healthcare related services](https://www.crfb.org/papers/american-health-care-health-spending-and-federal-budget)
- [Quarentine costs US \$25 Billion per day](https://www.bizjournals.com/stlouis/news/2020/04/14/quarantine-costs-u-s-25-billion-a-day-st-louis.html)
